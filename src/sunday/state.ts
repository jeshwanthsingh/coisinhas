export const scenes = [
  "opening",
  "morning",
  "afternoon",
  "sunset",
  "closeness",
  "voice",
  "postcard",
  "ending",
] as const;
export type Scene = (typeof scenes)[number];
export type Weather = "rain" | "sun";
export type Morning = "snooze" | "rise";
export type Activity = "food" | "tv" | "game";
export type Food = "sushi" | "pasta";
export type Plate = "share" | "defend";
export type Channel = "comedy" | "drama";
export type Game = "coop" | "competitive";
export type Seat = "sofa" | "window";
export type Closeness = "hands" | "lean" | "quiet";
export type Choices = {
  weather: Weather | null;
  morning: Morning | null;
  activities: Activity[];
  lastActivity: Activity | null;
  food: Food | null;
  plate: Plate | null;
  channel: Channel | null;
  game: Game | null;
  seat: Seat | null;
  closeness: Closeness | null;
};
export type Postcard = Choices & {
  weather: Weather;
  morning: Morning;
  lastActivity: Activity;
  seat: Seat;
  closeness: Closeness;
};
export type SundayState = Choices & {
  version: 1;
  scene: Scene;
  postcardCreated: boolean;
  finished: boolean;
  savedPostcard: Postcard | null;
};
export const freshSunday = (): SundayState => ({
  version: 1,
  scene: "opening",
  weather: null,
  morning: null,
  activities: [],
  lastActivity: null,
  food: null,
  plate: null,
  channel: null,
  game: null,
  seat: null,
  closeness: null,
  postcardCreated: false,
  finished: false,
  savedPostcard: null,
});
const oneOf = (v: unknown, list: readonly unknown[]) => list.includes(v);
const object = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
function validChoices(v: unknown): v is Choices {
  if (!object(v)) return false;
  if (
    !oneOf(v.weather, [null, "rain", "sun"]) ||
    !oneOf(v.morning, [null, "snooze", "rise"]) ||
    !oneOf(v.lastActivity, [null, "food", "tv", "game"]) ||
    !oneOf(v.food, [null, "sushi", "pasta"]) ||
    !oneOf(v.plate, [null, "share", "defend"]) ||
    !oneOf(v.channel, [null, "comedy", "drama"]) ||
    !oneOf(v.game, [null, "coop", "competitive"]) ||
    !oneOf(v.seat, [null, "sofa", "window"]) ||
    !oneOf(v.closeness, [null, "hands", "lean", "quiet"])
  )
    return false;
  if (
    !Array.isArray(v.activities) ||
    !v.activities.every((a) => oneOf(a, ["food", "tv", "game"])) ||
    new Set(v.activities).size !== v.activities.length
  )
    return false;
  if (v.morning && !v.weather) return false;
  if (
    (v.food || v.plate || v.channel || v.game || v.lastActivity) &&
    !v.morning
  )
    return false;
  if (v.plate && !v.food) return false;
  if (
    v.activities.includes("food") !== !!(v.food && v.plate) ||
    v.activities.includes("tv") !== !!v.channel ||
    v.activities.includes("game") !== !!v.game
  )
    return false;
  if (
    v.activities.length > 0 &&
    (!v.lastActivity || !v.activities.includes(v.lastActivity))
  )
    return false;
  if (v.activities.length === 0 && v.lastActivity !== null) return false;
  if (v.seat && !v.activities.length) return false;
  if (v.closeness && !v.seat) return false;
  return true;
}
export function ready(s: Choices): s is Postcard {
  return !!(
    s.weather &&
    s.morning &&
    s.activities.length &&
    s.lastActivity &&
    s.seat &&
    s.closeness
  );
}
export function snapshot(s: Choices): Postcard | null {
  if (!ready(s)) return null;
  const {
    weather,
    morning,
    activities,
    lastActivity,
    food,
    plate,
    channel,
    game,
    seat,
    closeness,
  } = s;
  return {
    weather,
    morning,
    activities: [...activities],
    lastActivity,
    food,
    plate,
    channel,
    game,
    seat,
    closeness,
  };
}
export function validSunday(v: unknown): v is SundayState {
  if (!object(v) || !validChoices(v)) return false;
  const s = v as SundayState;
  const keys = Object.keys(freshSunday());
  if (
    Object.keys(s).length !== keys.length ||
    Object.keys(s).some((k) => !keys.includes(k))
  )
    return false;
  if (
    s.version !== 1 ||
    !oneOf(s.scene, scenes) ||
    typeof s.postcardCreated !== "boolean" ||
    typeof s.finished !== "boolean"
  )
    return false;
  if (s.savedPostcard !== null) {
    if (!validChoices(s.savedPostcard) || !ready(s.savedPostcard)) return false;
    const keys = Object.keys(snapshot(s.savedPostcard)!);
    if (
      Object.keys(s.savedPostcard).length !== keys.length ||
      Object.keys(s.savedPostcard).some((k) => !keys.includes(k))
    )
      return false;
  }
  if ((s.postcardCreated && !ready(s)) || (s.finished && !s.postcardCreated))
    return false;
  const index = scenes.indexOf(s.scene);
  return !(
    (index >= 2 && (!s.weather || !s.morning)) ||
    (index >= 3 && !s.activities.length) ||
    (index >= 4 && !s.seat) ||
    (index >= 5 && !s.closeness) ||
    (index >= 6 && !s.postcardCreated) ||
    (index === 7 && !s.finished)
  );
}
export type SundayEvent =
  | {
      type:
        | "start"
        | "to-afternoon"
        | "to-sunset"
        | "to-closeness"
        | "to-voice"
        | "postcard"
        | "finish"
        | "restart";
    }
  | { type: "back" }
  | { type: "weather"; value: Weather }
  | { type: "morning"; value: Morning }
  | { type: "food"; value: Food }
  | { type: "plate"; value: Plate }
  | { type: "tv"; value: Channel }
  | { type: "game"; value: Game }
  | { type: "seat"; value: Seat }
  | { type: "closeness"; value: Closeness }
  | { type: "save"; postcard: Postcard };
const complete = (s: SundayState, id: Activity): SundayState => ({
  ...s,
  activities: s.activities.includes(id) ? s.activities : [...s.activities, id],
  lastActivity: id,
  postcardCreated: false,
  finished: false,
});
export function advanceSunday(s: SundayState, e: SundayEvent): SundayState {
  switch (e.type) {
    case "restart":
      return { ...freshSunday(), savedPostcard: s.savedPostcard };
    case "start":
      return { ...s, scene: "morning" };
    case "weather":
      return s.scene === "morning" ? { ...s, weather: e.value } : s;
    case "morning":
      return s.scene === "morning" && s.weather
        ? { ...s, morning: e.value }
        : s;
    case "to-afternoon":
      return s.weather && s.morning ? { ...s, scene: "afternoon" } : s;
    case "food":
      return s.scene === "afternoon"
        ? { ...s, food: e.value, postcardCreated: false, finished: false }
        : s;
    case "plate":
      return s.scene === "afternoon" && s.food
        ? complete({ ...s, plate: e.value }, "food")
        : s;
    case "tv":
      return s.scene === "afternoon"
        ? complete({ ...s, channel: e.value }, "tv")
        : s;
    case "game":
      return s.scene === "afternoon"
        ? complete({ ...s, game: e.value }, "game")
        : s;
    case "to-sunset":
      return s.activities.length ? { ...s, scene: "sunset" } : s;
    case "seat":
      return s.scene === "sunset"
        ? { ...s, seat: e.value, postcardCreated: false, finished: false }
        : s;
    case "to-closeness":
      return s.seat ? { ...s, scene: "closeness" } : s;
    case "closeness":
      return s.scene === "closeness"
        ? { ...s, closeness: e.value, postcardCreated: false, finished: false }
        : s;
    case "to-voice":
      return s.closeness ? { ...s, scene: "voice" } : s;
    case "postcard":
      return ready(s) ? { ...s, scene: "postcard", postcardCreated: true } : s;
    case "finish":
      return s.postcardCreated ? { ...s, scene: "ending", finished: true } : s;
    case "save":
      return validChoices(e.postcard) && ready(e.postcard)
        ? { ...s, savedPostcard: snapshot(e.postcard) }
        : s;
    case "back": {
      const i = scenes.indexOf(s.scene);
      return i > 0 ? { ...s, scene: scenes[i - 1] } : s;
    }
  }
}
