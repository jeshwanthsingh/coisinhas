import test from "node:test";
import assert from "node:assert/strict";
import {
  freshEsconderijo,
  validEsconderijo,
  prune,
  advanceEsconderijo,
  hasNew,
  upgrade,
  endingDue,
} from "../.test-dist/esconderijo/esconderijo/state.js";
import {
  cards,
  visibleCards,
  iconNames,
} from "../.test-dist/esconderijo/esconderijo/cards.js";
const full = (over = {}) => ({ ...freshEsconderijo(), ...over });
test("fresh state is valid and has nothing seen", () => {
  assert.ok(validEsconderijo(freshEsconderijo()));
  assert.deepEqual(freshEsconderijo(), {
    version: 1,
    seen: [],
    openingDone: false,
    endingSeen: false,
    arrivalDone: false,
    flippedCardIds: [],
    ending15Seen: false,
  });
});
test("arrival, ending and open events; opening a card twice dedupes", () => {
  let s = freshEsconderijo();
  s = advanceEsconderijo(s, { type: "arrival" });
  s = advanceEsconderijo(s, { type: "open", id: "a" });
  s = advanceEsconderijo(s, { type: "open", id: "a" });
  s = advanceEsconderijo(s, { type: "ending" });
  assert.deepEqual(
    s,
    full({
      seen: ["a"],
      openingDone: true,
      arrivalDone: true,
      endingSeen: true,
      ending15Seen: true,
    }),
  );
  assert.ok(validEsconderijo(s));
});
test("reducer does not mutate its input", () => {
  const s = freshEsconderijo();
  advanceEsconderijo(s, { type: "open", id: "a" });
  advanceEsconderijo(s, { type: "flip", id: "a" });
  assert.deepEqual(s, freshEsconderijo());
});
test("saves from before Drop 1.5 stay valid and keep their cards", () => {
  const old = {
    version: 1,
    seen: ["a", "b"],
    openingDone: true,
    endingSeen: true,
  };
  assert.ok(validEsconderijo(old));
  const up = upgrade(old);
  assert.deepEqual(up, {
    ...old,
    arrivalDone: true,
    flippedCardIds: [],
    ending15Seen: false,
  });
  // the old ending does not count as the new one
  assert.equal(
    endingDue({ ...up, flippedCardIds: ["a", "b", "c"] }, ["a", "b", "c"]),
    true,
  );
  const never = upgrade({
    version: 1,
    seen: [],
    openingDone: false,
    endingSeen: false,
  });
  assert.equal(never.arrivalDone, false);
});
test("flips dedupe and ending is due only after 3 different flips", () => {
  const known = ["a", "b", "c", "d"];
  let s = freshEsconderijo();
  for (const id of ["a", "a", "b", "b"])
    s = advanceEsconderijo(s, { type: "flip", id });
  assert.deepEqual(s.flippedCardIds, ["a", "b"]);
  assert.equal(endingDue(s, known), false);
  s = advanceEsconderijo(s, { type: "flip", id: "d" });
  assert.equal(endingDue(s, known), true);
  s = advanceEsconderijo(s, { type: "ending" });
  assert.equal(endingDue(s, known), false);
  assert.equal(endingDue(freshEsconderijo(), []), false);
  // fewer cards than 3: all of them is enough
  assert.equal(endingDue(full({ flippedCardIds: ["a"] }), ["a"]), true);
  // unknown flipped ids do not count
  assert.equal(
    endingDue(full({ flippedCardIds: ["x", "y", "z"] }), known),
    false,
  );
});
test("malformed saves are rejected", () => {
  const ok = freshEsconderijo();
  for (const bad of [
    null,
    [],
    "x",
    { ...ok, version: 2 },
    { ...ok, seen: "a" },
    { ...ok, seen: [1] },
    { ...ok, seen: ["a", "a"] },
    { ...ok, openingDone: "yes" },
    { ...ok, endingSeen: null },
    { ...ok, arrivalDone: 1 },
    { ...ok, flippedCardIds: ["a", "a"] },
    { ...ok, ending15Seen: "no" },
  ])
    assert.equal(validEsconderijo(bad), false);
});
test("unknown ids are dropped by prune (seen and flipped)", () => {
  const s = full({ seen: ["a", "gone", "b"], flippedCardIds: ["gone", "b"] });
  const p = prune(s, ["a", "b"]);
  assert.deepEqual(p.seen, ["a", "b"]);
  assert.deepEqual(p.flippedCardIds, ["b"]);
  const ok = full({ seen: ["a"] });
  assert.equal(prune(ok, ["a"]), ok);
});
test("hasNew is true only while a published card is unopened", () => {
  const s = full({ seen: ["a"] });
  assert.equal(hasNew(s, []), false);
  assert.equal(hasNew(s, ["a"]), false);
  assert.equal(hasNew(s, ["a", "b"]), true);
  assert.equal(hasNew(freshEsconderijo(), ["a"]), true);
});
test("production excludes drafts, dev keeps them, newest first", () => {
  const withDraft = [{ ...cards[0], id: "d", draft: true }, ...cards];
  assert.equal(
    visibleCards(withDraft, false).some((c) => c.draft),
    false,
  );
  assert.equal(visibleCards(withDraft, true).length, cards.length + 1);
  assert.equal(visibleCards(cards, false).length, cards.length);
  const list = [
    { ...cards[0], id: "old", addedOn: "2026-01-01", draft: undefined },
    { ...cards[0], id: "new", addedOn: "2026-05-01", draft: undefined },
    { ...cards[0], id: "new2", addedOn: "2026-05-01", draft: undefined },
  ];
  assert.deepEqual(
    visibleCards(list, false).map((c) => c.id),
    ["new", "new2", "old"],
  );
});
test("every card has unique id, valid date/icon/rarity and non-empty pt+en text", () => {
  const ids = new Set();
  for (const card of cards) {
    assert.ok(!ids.has(card.id));
    ids.add(card.id);
    assert.match(card.addedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(iconNames.includes(card.icon));
    assert.ok(["comum", "raro", "lendario"].includes(card.rarity));
    for (const field of ["title", "story", "noticed"])
      for (const lang of ["pt", "en"])
        assert.ok(
          card[field][lang].trim().length > 0,
          `${card.id}.${field}.${lang}`,
        );
  }
});
