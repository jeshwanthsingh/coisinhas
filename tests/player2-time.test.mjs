import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  karolDate,
  greeting,
  moonPhase,
  phaseIndex,
  clockTime,
  SF_ZONE,
} from "../.test-dist/player2/time.js";
import { matchesPostcard } from "../.test-dist/player2/postcard.js";
import { achievements, freshPlayer2 } from "../.test-dist/player2/state.js";
test("Curitiba calendar and greetings use its timezone, not the visitor timezone", () => {
  assert.equal(karolDate(new Date("2026-10-20T02:59:59Z")), "2026-10-19");
  assert.equal(karolDate(new Date("2026-10-20T03:00:00Z")), "2026-10-20");
  assert.equal(greeting(new Date("2026-10-20T05:00:00Z")), "late");
  assert.equal(greeting(new Date("2026-10-20T12:00:00Z")), "morning");
  assert.equal(greeting(new Date("2026-10-20T17:00:00Z")), "workday");
  assert.equal(greeting(new Date("2026-10-20T23:00:00Z")), "evening");
});
test("SF clock follows daylight saving through Intl", () => {
  assert.equal(clockTime(new Date("2026-01-20T20:00:00Z"), SF_ZONE), "12:00");
  assert.equal(clockTime(new Date("2026-07-20T20:00:00Z"), SF_ZONE), "13:00");
});
test("synodic approximation wraps and distinguishes new, quarter and full moon", () => {
  const epoch = Date.UTC(2000, 0, 6, 18, 14),
    month = 29.530588853 * 86400000;
  assert.equal(moonPhase(new Date(epoch)), 0);
  assert.equal(phaseIndex(moonPhase(new Date(epoch + month * 0.25))), 2);
  assert.equal(phaseIndex(moonPhase(new Date(epoch + month * 0.5))), 4);
  assert.equal(phaseIndex(0.99), 0);
  assert.ok(moonPhase(new Date(epoch - 86400000)) > 0);
});
test("postcard is disabled until configured, normalizes case and spaces, rejects unknown words", async () => {
  assert.equal(await matchesPostcard("anything"), false);
  const hash = createHash("sha256").update("test fixture").digest("hex");
  assert.equal(await matchesPostcard("  TEST Fixture  ", hash), true);
  assert.equal(await matchesPostcard("wrong", hash), false);
});
test("achievements are derived and first hug remains locked", () => {
  assert.deepEqual(Object.values(achievements(freshPlayer2())), [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
});
