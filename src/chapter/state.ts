export const radioIds = ["dengo", "research", "worm"] as const;
export const starIds = ["estrelinha", "saudade", "dengo", "eyeroll"] as const;
export type RadioId = (typeof radioIds)[number];
export type StarId = (typeof starIds)[number];
export type ChapterState = {
  version: 1;
  unlocked: boolean;
  visited: boolean;
  stations: RadioId[];
  windows: boolean;
  constellations: StarId[];
  unnamed: boolean;
  letter: boolean;
  secret: boolean;
};
export type ChapterEvent =
  | { type: "unlock" | "visit" | "windows" | "unnamed" | "letter" | "secret" }
  | { type: "station"; id: RadioId }
  | { type: "constellation"; id: StarId };
export const freshChapter = (): ChapterState => ({
  version: 1,
  unlocked: false,
  visited: false,
  stations: [],
  windows: false,
  constellations: [],
  unnamed: false,
  letter: false,
  secret: false,
});
export const letterReady = (s: ChapterState) =>
  s.stations.length === 3 &&
  s.windows &&
  s.constellations.length === 4 &&
  s.unnamed;
export function validChapter(v: unknown): v is ChapterState {
  if (!v || typeof v !== "object") return false;
  const s = v as ChapterState;
  const unique = (items: unknown, allowed: readonly string[]) =>
    Array.isArray(items) &&
    items.every((x) => allowed.includes(x)) &&
    new Set(items).size === items.length;
  return (
    s.version === 1 &&
    ["unlocked", "visited", "windows", "unnamed", "letter", "secret"].every(
      (k) => typeof s[k as keyof ChapterState] === "boolean",
    ) &&
    unique(s.stations, radioIds) &&
    unique(s.constellations, starIds) &&
    (!s.unnamed || s.constellations.length === 4) &&
    (!s.letter || letterReady(s))
  );
}
export function advanceChapter(s: ChapterState, e: ChapterEvent): ChapterState {
  switch (e.type) {
    case "unlock":
      return { ...s, unlocked: true };
    case "visit":
      return { ...s, unlocked: true, visited: true };
    case "station":
      return s.stations.includes(e.id)
        ? s
        : { ...s, stations: [...s.stations, e.id] };
    case "constellation":
      return s.constellations.includes(e.id)
        ? s
        : { ...s, constellations: [...s.constellations, e.id] };
    case "windows":
      return { ...s, windows: true };
    case "unnamed":
      return s.constellations.length === 4 ? { ...s, unnamed: true } : s;
    case "letter":
      return letterReady(s) ? { ...s, letter: true } : s;
    case "secret":
      return { ...s, secret: true };
  }
}
