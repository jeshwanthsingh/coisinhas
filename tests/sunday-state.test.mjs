import test from "node:test";
import assert from "node:assert/strict";
import {
  freshSunday,
  advanceSunday as step,
  validSunday,
  snapshot,
} from "../.test-dist/sunday/state.js";
const morning = () =>
  step(
    step(step(freshSunday(), { type: "start" }), {
      type: "weather",
      value: "rain",
    }),
    { type: "morning", value: "snooze" },
  );
const afternoon = () => step(morning(), { type: "to-afternoon" });
const ready = () => {
  let s = step(afternoon(), { type: "game", value: "coop" });
  for (const e of [
    { type: "to-sunset" },
    { type: "seat", value: "sofa" },
    { type: "to-closeness" },
    { type: "closeness", value: "quiet" },
    { type: "to-voice" },
    { type: "postcard" },
  ])
    s = step(s, e);
  return s;
};
test("fresh Sunday is valid and cannot skip to an ending", () => {
  const s = freshSunday();
  assert.ok(validSunday(s));
  for (const type of [
    "to-afternoon",
    "to-sunset",
    "to-closeness",
    "to-voice",
    "postcard",
    "finish",
  ])
    assert.equal(step(s, { type }), s);
});
test("weather and morning choices can change without losing other chapters", () => {
  let s = morning();
  s = step(s, { type: "weather", value: "sun" });
  s = step(s, { type: "morning", value: "rise" });
  assert.equal(s.weather, "sun");
  assert.equal(s.morning, "rise");
  assert.ok(validSunday(s));
});
test("every activity independently unlocks sunset, repeated visits are unique", () => {
  for (const events of [
    [
      { type: "food", value: "pasta" },
      { type: "plate", value: "defend" },
    ],
    [{ type: "tv", value: "drama" }],
    [{ type: "game", value: "competitive" }],
  ]) {
    let s = afternoon();
    for (const e of [...events, ...events]) s = step(s, e);
    assert.equal(s.activities.length, 1);
    assert.equal(step(s, { type: "to-sunset" }).scene, "sunset");
    assert.ok(validSunday(s));
  }
});
test("multiple activities preserve actual outcomes and last activity", () => {
  let s = afternoon();
  for (const e of [
    { type: "game", value: "coop" },
    { type: "tv", value: "comedy" },
    { type: "food", value: "sushi" },
    { type: "plate", value: "share" },
  ])
    s = step(s, e);
  assert.deepEqual(s.activities, ["game", "tv", "food"]);
  assert.equal(s.lastActivity, "food");
  assert.ok(validSunday(s));
});
test("finish, save, serialization, replay and saved postcard remain independent", () => {
  let s = ready();
  assert.ok(validSunday(s));
  s = step(s, { type: "finish" });
  s = step(s, { type: "save", postcard: snapshot(s) });
  const postcard = s.savedPostcard;
  assert.ok(validSunday(JSON.parse(JSON.stringify(s))));
  s = step(s, { type: "restart" });
  assert.equal(s.scene, "opening");
  assert.equal(s.finished, false);
  assert.deepEqual(s.savedPostcard, postcard);
  assert.equal(s.weather, null);
  assert.ok(validSunday(s));
});
test("malformed and inconsistent saves fail safely", () => {
  for (const s of [
    null,
    [],
    {},
    { ...freshSunday(), version: 2 },
    { ...freshSunday(), weather: "snow" },
    { ...freshSunday(), scene: "postcard" },
    { ...freshSunday(), finished: true },
    { ...freshSunday(), morning: "rise" },
    { ...ready(), activities: ["game", "game"] },
    { ...ready(), lastActivity: "tv" },
    { ...ready(), savedPostcard: { foo: 1 } },
    { ...ready(), unknown: true },
  ])
    assert.equal(validSunday(s), false);
});
test("Sunday reducer does not mutate its input or a previous postcard", () => {
  let s = ready();
  const before = JSON.stringify(s);
  step(s, { type: "restart" });
  step(s, { type: "finish" });
  assert.equal(JSON.stringify(s), before);
});

test("every scene round trips, backtracking and revised choices keep saves valid", () => {
  let s = freshSunday();
  const events = [
    { type: "start" },
    { type: "weather", value: "sun" },
    { type: "morning", value: "rise" },
    { type: "to-afternoon" },
    { type: "tv", value: "comedy" },
    { type: "to-sunset" },
    { type: "seat", value: "window" },
    { type: "to-closeness" },
    { type: "closeness", value: "hands" },
    { type: "to-voice" },
    { type: "postcard" },
    { type: "finish" },
    ...Array.from({ length: 6 }, () => ({ type: "back" })),
    { type: "weather", value: "rain" },
    { type: "to-afternoon" },
    { type: "game", value: "competitive" },
  ];
  for (const e of events) {
    s = step(s, e);
    assert.ok(validSunday(JSON.parse(JSON.stringify(s))), e.type);
  }
});
