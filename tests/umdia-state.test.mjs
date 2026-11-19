import test from "node:test";
import assert from "node:assert/strict";
import {
  advanceUmDia,
  freshUmDia,
  lastPage,
  pageIds,
  validUmDia,
} from "../.test-dist/umdia/state.js";
import {
  freshNav,
  markPlace,
  resolvePlace,
} from "../.test-dist/nav/places.js";

test("fresh diary is valid and starts on the first page", () => {
  const s = freshUmDia();
  assert.ok(validUmDia(s));
  assert.deepEqual(s, { version: 1, page: 0, seen: [] });
});

test("turning pages records each page once and clamps at both ends", () => {
  let s = freshUmDia();
  s = advanceUmDia(s, { type: "go", page: 0 });
  assert.deepEqual(s.seen, ["jul"]);
  for (let i = 1; i <= lastPage + 3; i++)
    s = advanceUmDia(s, { type: "go", page: i });
  assert.equal(s.page, lastPage);
  assert.deepEqual(s.seen, [...pageIds]);
  const back = advanceUmDia(s, { type: "go", page: -5 });
  assert.equal(back.page, 0);
  assert.equal(back.seen.length, pageIds.length);
  assert.equal(advanceUmDia(back, { type: "go", page: 0 }), back);
  assert.equal(advanceUmDia(back, { type: "go", page: Number.NaN }), back);
});

test("the last page is the first hug", () => {
  assert.equal(pageIds[lastPage], "abraco");
});

test("malformed saves are rejected", () => {
  for (const bad of [
    null,
    [],
    { version: 2, page: 0, seen: [] },
    { version: 1, page: 99, seen: [] },
    { version: 1, page: 1.5, seen: [] },
    { version: 1, page: 0, seen: ["nope"] },
    { version: 1, page: 0, seen: ["jul", "jul"] },
  ])
    assert.equal(validUmDia(bad), false);
});

test("#umdia always opens and makes the hub reachable", () => {
  const none = { depois: false, jogador2: false };
  for (const h of ["#umdia", "#UMDIA", "#/umdia"])
    assert.equal(resolvePlace(h, none), "umdia");
  const a = markPlace(freshNav(), "umdia");
  assert.deepEqual(a, { version: 1, hub: true, opened: ["umdia"] });
});
