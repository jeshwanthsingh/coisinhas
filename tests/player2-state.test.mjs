import test from "node:test";
import assert from "node:assert/strict";
import {
  freshPlayer2,
  advance,
  validPlayer2,
  endingReady,
  farmComplete,
  needsFull,
} from "../.test-dist/player2/state.js";
import { freshChapter, advanceChapter } from "../.test-dist/state.js";
const start = () => advance(freshPlayer2(), { type: "choose" });
test("fresh player cannot reach ending or mark credits seen", () => {
  const s = freshPlayer2();
  assert.equal(endingReady(s), false);
  assert.equal(advance(s, { type: "credits" }).creditsSeen, false);
  assert.equal(validPlayer2(s), true);
});
test("loot and letters are sets, including after replay", () => {
  let s = start();
  for (let i = 0; i < 3; i++) {
    s = advance(s, { type: "loot", id: "fleabag" });
    s = advance(s, { type: "letter", id: "fight" });
  }
  assert.deepEqual(s.loot, ["fleabag"]);
  assert.deepEqual(s.lettersOpened, ["fight"]);
});
test("watering is once per real Curitiba calendar date, with gaps and backward dates safe", () => {
  let s = advance(start(), { type: "water", date: "2026-10-20" });
  assert.equal(s.treeStage, 1);
  assert.strictEqual(advance(s, { type: "water", date: "2026-10-20" }), s);
  assert.strictEqual(advance(s, { type: "water", date: "2026-10-19" }), s);
  assert.strictEqual(advance(s, { type: "water", date: "2026-02-30" }), s);
  s = advance(s, { type: "water", date: "2026-10-25" });
  assert.equal(s.treeStage, 2);
  assert.equal(s.lastWatered, "2026-10-25");
});
test("season caps at 28, hearts at ten, needs at 100", () => {
  let s = start();
  for (let i = 0; i < 40; i++) {
    s = advance(s, {
      type: "water",
      date: new Date(Date.UTC(2026, 9, 1 + i)).toISOString().slice(0, 10),
    });
    for (const need of ["sleep", "monster", "patience", "dengo"])
      s = advance(s, { type: "care", need });
  }
  s = advance(s, { type: "extract" });
  assert.equal(s.treeStage, 28);
  assert.equal(s.hearts, 10);
  assert.equal(needsFull(s), true);
  assert.ok(Object.values(s.needs).every((n) => n === 100));
  assert.equal(validPlayer2(s), true);
});
test("ending opens via first watering and gift, without waiting for ten hearts", () => {
  let s = start();
  s = advance(s, { type: "cheat" });
  s = advance(s, { type: "extract" });
  assert.equal(endingReady(s), false);
  s = advance(s, { type: "water", date: "2026-10-20" });
  assert.equal(farmComplete(s), false);
  s = advance(s, { type: "gift" });
  assert.ok(s.hearts < 10);
  assert.equal(endingReady(s), true);
  assert.equal(advance(s, { type: "credits" }).creditsSeen, true);
});
test("malformed saves reject versions, ranges, duplicate ids, dates, inconsistent hearts and long notes", () => {
  const s = start();
  for (const bad of [
    null,
    [],
    {},
    { ...s, version: 2 },
    { ...s, needs: { ...s.needs, sleep: 101 } },
    { ...s, needs: { ...s.needs, sleep: NaN } },
    { ...s, needs: { ...s.needs, sleep: -1 } },
    { ...s, loot: ["cat", "cat"] },
    { ...s, lettersOpened: ["unknown"] },
    { ...s, note: "x".repeat(281) },
    { ...s, treeStage: 29 },
    { ...s, lastWatered: "2026-02-30" },
    { ...s, hearts: 11 },
    { ...s, hearts: 8 },
    { ...s, creditsSeen: true },
    { ...s, cutscenesSeen: [10] },
    { ...s, unexpected: true },
  ])
    assert.equal(validPlayer2(bad), false);
  assert.equal(validPlayer2(JSON.parse(JSON.stringify(s))), true);
});
test("chapter two progress is untouched by all player-two updates", () => {
  const old = advanceChapter(freshChapter(), { type: "visit" });
  const snapshot = structuredClone(old);
  let s = start();
  s = advance(s, { type: "cheat" });
  s = advance(s, { type: "note", text: "uma coisinha" });
  s = advance(s, { type: "water", date: "2026-10-20" });
  assert.deepEqual(old, snapshot);
  assert.notEqual(s, old);
});
test("notes are bounded and cutscenes cannot be marked before their hearts unlock", () => {
  let s = start();
  s = advance(s, { type: "note", text: "x".repeat(500) });
  assert.equal(s.note.length, 280);
  assert.strictEqual(advance(s, { type: "cutscene", id: 10 }), s);
  s = advance(s, { type: "cheat" });
  s = advance(s, { type: "cutscene", id: 2 });
  assert.deepEqual(s.cutscenesSeen, [2]);
});

test("backup attempts are rate limited, including across saved visits", () => {
  let s = advance(freshPlayer2(), { type: "choose" });
  s = advance(s, { type: "backup", at: 1000000 });
  assert.equal(advance(s, { type: "backup", at: 1599999 }), s);
  assert.equal(advance(s, { type: "backup", at: 1600000 }).backupAt, 1600000);
  assert.equal(advance(s, { type: "backup", at: NaN }), s);
});

test("unselected and extracted saves cannot carry impossible progression", () => {
  assert.equal(validPlayer2({ ...freshPlayer2(), giftSeen: true }), false);
  let s = advance(advance(freshPlayer2(), { type: "choose" }), {
    type: "extract",
  });
  assert.equal(validPlayer2({ ...s, loot: [] }), false);
});
