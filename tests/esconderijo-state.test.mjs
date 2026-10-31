import test from "node:test";
import assert from "node:assert/strict";
import {
  freshEsconderijo,
  validEsconderijo,
  prune,
  advanceEsconderijo,
  hasNew,
} from "../.test-dist/esconderijo/esconderijo/state.js";
import {
  cards,
  visibleCards,
  iconNames,
} from "../.test-dist/esconderijo/esconderijo/cards.js";
test("fresh state is valid and has nothing seen", () => {
  assert.ok(validEsconderijo(freshEsconderijo()));
  assert.deepEqual(freshEsconderijo().seen, []);
});
test("opening, ending and open events; opening a card twice dedupes", () => {
  let s = freshEsconderijo();
  s = advanceEsconderijo(s, { type: "opening" });
  s = advanceEsconderijo(s, { type: "open", id: "a" });
  s = advanceEsconderijo(s, { type: "open", id: "a" });
  s = advanceEsconderijo(s, { type: "ending" });
  assert.deepEqual(s, {
    version: 1,
    seen: ["a"],
    openingDone: true,
    endingSeen: true,
  });
  assert.ok(validEsconderijo(s));
});
test("reducer does not mutate its input", () => {
  const s = freshEsconderijo();
  advanceEsconderijo(s, { type: "open", id: "a" });
  assert.deepEqual(s, freshEsconderijo());
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
  ])
    assert.equal(validEsconderijo(bad), false);
});
test("unknown ids are dropped by prune", () => {
  const s = { ...freshEsconderijo(), seen: ["a", "gone", "b"] };
  assert.deepEqual(prune(s, ["a", "b"]).seen, ["a", "b"]);
  assert.equal(prune(s, ["a", "gone", "b"]), s);
});
test("hasNew is true only while a published card is unopened", () => {
  const s = { ...freshEsconderijo(), seen: ["a"] };
  assert.equal(hasNew(s, []), false);
  assert.equal(hasNew(s, ["a"]), false);
  assert.equal(hasNew(s, ["a", "b"]), true);
  assert.equal(hasNew(freshEsconderijo(), ["a"]), true);
});
test("production excludes drafts, dev keeps them, newest first", () => {
  assert.ok(cards.filter((c) => c.draft).length === 3);
  assert.equal(visibleCards(cards, false).filter((c) => c.draft).length, 0);
  assert.equal(visibleCards(cards, true).length, cards.length);
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
