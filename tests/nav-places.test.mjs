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
const mid = { depois: true, jogador2: false };
const all = { depois: true, jogador2: true };
test("fresh browser: only domingo and esconderijo open directly", () => {
  assert.equal(resolvePlace("#esconderijo", none), "esconderijo");
  assert.equal(resolvePlace("#domingo", none), "domingo");
  assert.equal(resolvePlace("#depois", none), "museu");
  assert.equal(resolvePlace("#jogador2", none), "museu");
  assert.equal(resolvePlace("#museu", none), "museu");
  assert.equal(resolvePlace("", none), "museu");
});
test("partly unlocked: depois opens, jogador2 does not", () => {
  assert.equal(resolvePlace("#depois", mid), "depois");
  assert.equal(resolvePlace("#jogador2", mid), "museu");
});
test("fully unlocked: every place opens", () => {
  for (const p of ["museu", "depois", "jogador2", "domingo", "esconderijo"])
    assert.equal(resolvePlace(`#${p}`, all), p);
});
test("unknown, malformed and differently-cased hashes", () => {
  for (const h of ["#nope", "#", "#/", "#depois/x", "#__proto__", "museu"])
    assert.equal(resolvePlace(h, none), h === "museu" ? "museu" : "museu");
  assert.equal(resolvePlace("#ESCONDERIJO", none), "esconderijo");
  assert.equal(resolvePlace("#/domingo", none), "domingo");
});
test("access rules mirror the old shortcuts; a direct visit unlocks the hub only", () => {
  const nav = freshNav();
  assert.deepEqual(
    accessFor({ legacy: false, unlocked: false, letter: false }, nav),
    none,
  );
  assert.deepEqual(
    accessFor({ legacy: true, unlocked: false, letter: false }, nav),
    mid,
  );
  assert.deepEqual(
    accessFor({ legacy: false, unlocked: true, letter: false }, nav),
    mid,
  );
  assert.deepEqual(
    accessFor({ legacy: false, unlocked: false, letter: true }, nav),
    {
      depois: false,
      jogador2: true,
    },
  );
  const visited = markPlace(nav, "esconderijo");
  assert.deepEqual(
    accessFor({ legacy: false, unlocked: false, letter: false }, visited),
    {
      depois: false,
      jogador2: true,
    },
  );
});
test("map lists only unlocked places, in order", () => {
  assert.deepEqual(visiblePlaces(none), ["museu"]);
  assert.deepEqual(visiblePlaces(mid), ["museu", "depois"]);
  assert.deepEqual(visiblePlaces(all), [
    "museu",
    "depois",
    "jogador2",
    "domingo",
    "esconderijo",
  ]);
});
test("nav state: validator, markPlace dedupes and never mutates", () => {
  const s = freshNav();
  assert.ok(validNav(s));
  assert.equal(markPlace(s, "museu"), s);
  assert.equal(markPlace(s, "jogador2"), s);
  const a = markPlace(s, "domingo");
  assert.deepEqual(a, { version: 1, hub: true, opened: ["domingo"] });
  assert.equal(markPlace(a, "domingo"), a);
  assert.deepEqual(markPlace(a, "esconderijo").opened, [
    "domingo",
    "esconderijo",
  ]);
  assert.deepEqual(s, freshNav());
  for (const bad of [
    null,
    [],
    { ...s, version: 2 },
    { ...s, hub: 1 },
    { ...s, opened: ["museu"] },
    { ...s, opened: ["domingo", "domingo"] },
  ])
    assert.equal(validNav(bad), false);
});
