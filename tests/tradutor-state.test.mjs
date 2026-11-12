import test from "node:test";
import assert from "node:assert/strict";
import {
  advanceTradutor,
  endingUnlocked,
  freshTradutor,
  phraseIds,
  validTradutor,
} from "../.test-dist/tradutor/state.js";
test("fresh state is valid and has no ending", () => {
  const s = freshTradutor();
  assert.ok(validTradutor(s));
  assert.deepEqual(s, { version: 1, translated: [], endingSeen: false });
  assert.equal(endingUnlocked(s), false);
  assert.equal(advanceTradutor(s, { type: "ending" }), s);
});
test("nine unique translations unlock the ending; repeats never inflate", () => {
  let s = freshTradutor();
  for (const id of phraseIds.slice(0, 8)) {
    s = advanceTradutor(s, { type: "translate", id });
    s = advanceTradutor(s, { type: "translate", id });
  }
  assert.equal(s.translated.length, 8);
  assert.equal(endingUnlocked(s), false);
  assert.equal(advanceTradutor(s, { type: "ending" }).endingSeen, false);
  s = advanceTradutor(s, { type: "translate", id: phraseIds[8] });
  s = advanceTradutor(s, { type: "translate", id: phraseIds[0] });
  assert.equal(s.translated.length, 9);
  assert.equal(endingUnlocked(s), true);
  const done = advanceTradutor(s, { type: "ending" });
  assert.equal(done.endingSeen, true);
  assert.equal(advanceTradutor(done, { type: "ending" }), done);
  assert.ok(validTradutor(done));
});
test("reducer does not mutate its input", () => {
  const s = freshTradutor();
  advanceTradutor(s, { type: "translate", id: "bom-dia" });
  assert.deepEqual(s, freshTradutor());
});
test("malformed and inconsistent saves are rejected", () => {
  const ok = freshTradutor();
  const all = [...phraseIds];
  for (const bad of [
    null,
    [],
    "x",
    { ...ok, version: 2 },
    { ...ok, translated: "bom-dia" },
    { ...ok, translated: ["nope"] },
    { ...ok, translated: ["bom-dia", "bom-dia"] },
    { ...ok, translated: [1] },
    { ...ok, endingSeen: "yes" },
    { ...ok, endingSeen: true },
    { ...ok, translated: all.slice(0, 8), endingSeen: true },
    { version: 1, translated: [] },
  ])
    assert.equal(validTradutor(bad), false);
  assert.ok(validTradutor({ ...ok, translated: all, endingSeen: true }));
  assert.ok(validTradutor({ ...ok, translated: all.slice(0, 3) }));
});
test("there are exactly nine fixed phrase ids, all unique", () => {
  assert.equal(phraseIds.length, 9);
  assert.equal(new Set(phraseIds).size, 9);
});
