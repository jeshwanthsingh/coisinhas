export type EsconderijoState = {
  version: 1;
  seen: string[];
  openingDone: boolean;
  endingSeen: boolean;
};
export type EsconderijoEvent =
  { type: "opening" | "ending" } | { type: "open"; id: string };
export const KEY = "coisinhas.esconderijo.v1";
export const freshEsconderijo = (): EsconderijoState => ({
  version: 1,
  seen: [],
  openingDone: false,
  endingSeen: false,
});
export function validEsconderijo(v: unknown): v is EsconderijoState {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const s = v as EsconderijoState;
  return (
    s.version === 1 &&
    Array.isArray(s.seen) &&
    s.seen.every((id) => typeof id === "string") &&
    new Set(s.seen).size === s.seen.length &&
    typeof s.openingDone === "boolean" &&
    typeof s.endingSeen === "boolean"
  );
}
/** Drops seen ids whose cards no longer exist. */
export const prune = (s: EsconderijoState, ids: string[]): EsconderijoState =>
  s.seen.every((id) => ids.includes(id))
    ? s
    : { ...s, seen: s.seen.filter((id) => ids.includes(id)) };
export function advanceEsconderijo(
  s: EsconderijoState,
  e: EsconderijoEvent,
): EsconderijoState {
  if (e.type === "opening") return { ...s, openingDone: true };
  if (e.type !== "open") return { ...s, endingSeen: true };
  return s.seen.includes(e.id) ? s : { ...s, seen: [...s.seen, e.id] };
}
export const hasNew = (s: EsconderijoState, ids: string[]) =>
  ids.some((id) => !s.seen.includes(id));
/** Read-only load for the hub entry; never writes storage. */
export function readEsconderijo(): EsconderijoState {
  try {
    const v: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return validEsconderijo(v) ? v : freshEsconderijo();
  } catch {
    return freshEsconderijo();
  }
}
