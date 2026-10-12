import test from "node:test";
import assert from "node:assert/strict";
import {
  freshChapter,
  advanceChapter,
  validChapter,
  letterReady,
} from "../.test-dist/state.js";

test("a fresh visit cannot open the letter or unnamed star", () => {
  const s = freshChapter();
  assert.equal(letterReady(s), false);
  assert.equal(advanceChapter(s, { type: "letter" }).letter, false);
  assert.equal(advanceChapter(s, { type: "unnamed" }).unnamed, false);
});
test("replaying stations and constellations never inflates progress", () => {
  let s = freshChapter();
  for (let i = 0; i < 5; i++)
    s = advanceChapter(s, { type: "station", id: "dengo" });
  assert.deepEqual(s.stations, ["dengo"]);
  assert.equal(letterReady(s), false);
  for (let i = 0; i < 3; i++)
    s = advanceChapter(s, { type: "constellation", id: "estrelinha" });
  assert.deepEqual(s.constellations, ["estrelinha"]);
});
test("the full shared journey unlocks the letter without any secret", () => {
  let s = freshChapter();
  for (const id of ["dengo", "research", "worm"])
    s = advanceChapter(s, { type: "station", id });
  s = advanceChapter(s, { type: "windows" });
  for (const id of ["estrelinha", "saudade", "dengo", "eyeroll"])
    s = advanceChapter(s, { type: "constellation", id });
  assert.equal(letterReady(s), false);
  s = advanceChapter(s, { type: "unnamed" });
  assert.equal(letterReady(s), true);
  s = advanceChapter(s, { type: "letter" });
  assert.equal(s.letter, true);
  assert.equal(s.secret, false);
  assert.equal(validChapter(s), true);
});
test("invalid persisted states are rejected rather than crashing or unlocking content", () => {
  for (const value of [
    null,
    [],
    {},
    { ...freshChapter(), stations: ["unknown"] },
    { ...freshChapter(), stations: ["dengo", "dengo"] },
    { ...freshChapter(), letter: true },
    { ...freshChapter(), version: 99 },
  ])
    assert.equal(validChapter(value), false);
  assert.equal(validChapter(JSON.parse(JSON.stringify(freshChapter()))), true);
});
test("entering and revisiting records availability without clearing earlier discoveries", () => {
  let s = advanceChapter(freshChapter(), { type: "station", id: "research" });
  s = advanceChapter(s, { type: "visit" });
  assert.equal(s.unlocked, true);
  assert.equal(s.visited, true);
  s = advanceChapter(s, { type: "visit" });
  assert.deepEqual(s.stations, ["research"]);
});
