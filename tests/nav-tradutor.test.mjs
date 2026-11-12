import test from "node:test";
import assert from "node:assert/strict";
import {
  accessFor,
  freshNav,
  markPlace,
  resolvePlace,
  validNav,
  visiblePlaces,
} from "../.test-dist/nav/places.js";
const none = { depois: false, jogador2: false };
const all = { depois: true, jogador2: true };
test("#tradutor always opens, even in a fresh browser, in any case", () => {
  for (const h of ["#tradutor", "#TRADUTOR", "#/tradutor"]) {
    assert.equal(resolvePlace(h, none), "tradutor");
    assert.equal(resolvePlace(h, all), "tradutor");
  }
  assert.equal(resolvePlace("#tradutor/x", none), "museu");
});
test("the map lists tradutor last, only once the hub is reachable", () => {
  assert.deepEqual(visiblePlaces(none), ["museu"]);
  assert.deepEqual(visiblePlaces(all), [
    "museu",
    "depois",
    "jogador2",
    "domingo",
    "esconderijo",
    "tradutor",
  ]);
});
test("a visit makes the hub reachable and dedupes", () => {
  const a = markPlace(freshNav(), "tradutor");
  assert.deepEqual(a, { version: 1, hub: true, opened: ["tradutor"] });
  assert.equal(markPlace(a, "tradutor"), a);
  assert.deepEqual(markPlace(a, "domingo").opened, ["tradutor", "domingo"]);
  assert.deepEqual(
    accessFor({ legacy: false, unlocked: false, letter: false }, a),
    { depois: false, jogador2: true },
  );
});
test("nav saves written before tradutor existed still validate", () => {
  for (const old of [
    { version: 1, hub: false, opened: [] },
    { version: 1, hub: true, opened: ["domingo"] },
    { version: 1, hub: true, opened: ["domingo", "esconderijo"] },
  ])
    assert.ok(validNav(old));
  assert.ok(validNav({ version: 1, hub: true, opened: ["tradutor"] }));
  assert.equal(
    validNav({ version: 1, hub: true, opened: ["tradutor", "tradutor"] }),
    false,
  );
  assert.equal(validNav({ version: 1, hub: true, opened: ["nope"] }), false);
});
