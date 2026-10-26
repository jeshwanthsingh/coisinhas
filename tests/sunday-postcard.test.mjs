import test from "node:test";
import assert from "node:assert/strict";
import {
  postcardParagraphs,
  postcardText,
} from "../.test-dist/sunday-copy/sunday/postcard.js";
import { freshSunday, validSunday } from "../.test-dist/sunday/state.js";
const outcomes = [
  { activities: ["food"], lastActivity: "food", food: "sushi", plate: "share" },
  {
    activities: ["food"],
    lastActivity: "food",
    food: "sushi",
    plate: "defend",
  },
  { activities: ["food"], lastActivity: "food", food: "pasta", plate: "share" },
  {
    activities: ["food"],
    lastActivity: "food",
    food: "pasta",
    plate: "defend",
  },
  { activities: ["tv"], lastActivity: "tv", channel: "comedy" },
  { activities: ["tv"], lastActivity: "tv", channel: "drama" },
  { activities: ["game"], lastActivity: "game", game: "coop" },
  { activities: ["game"], lastActivity: "game", game: "competitive" },
];
test("192 Sunday combinations produce complete, distinct bilingual postcards", () => {
  const seen = { pt: new Set(), en: new Set() };
  let count = 0;
  for (const weather of ["rain", "sun"])
    for (const morning of ["snooze", "rise"])
      for (const outcome of outcomes)
        for (const seat of ["sofa", "window"])
          for (const closeness of ["hands", "lean", "quiet"]) {
            const s = {
              ...freshSunday(),
              weather,
              morning,
              ...outcome,
              seat,
              closeness,
              scene: "postcard",
              postcardCreated: true,
            };
            assert.ok(validSunday(s));
            for (const lang of ["pt", "en"]) {
              const text = postcardText(s, lang);
              assert.equal(postcardParagraphs(s, lang).length, 4);
              assert.ok(!/undefined|null|TODO/.test(text));
              assert.equal(text, postcardText(s, lang));
              if (s.food === "pasta") assert.ok(!text.includes("sushi"));
              seen[lang].add(text);
            }
            count++;
          }
  assert.equal(count, 192);
  assert.equal(seen.pt.size, 192);
  assert.equal(seen.en.size, 192);
});
test("all optional activities appear in completion order with their real outcomes", () => {
  const s = {
    ...freshSunday(),
    weather: "rain",
    morning: "rise",
    activities: ["game", "food", "tv"],
    lastActivity: "tv",
    game: "competitive",
    food: "pasta",
    plate: "defend",
    channel: "drama",
    seat: "sofa",
    closeness: "quiet",
  };
  const p = postcardParagraphs(s, "pt");
  assert.equal(p.length, 6);
  assert.match(p[1], /regras suspeitas/);
  assert.match(p[2], /macarrão/);
  assert.match(p[3], /drama/);
  assert.ok(!p.join().includes("sushi"));
});
