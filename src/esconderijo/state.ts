export type EsconderijoState = {
  version: 1;
  seen: string[];
  openingDone: boolean;
  endingSeen: boolean;
  arrivalDone: boolean;
  flippedCardIds: string[];
  ending15Seen: boolean;
};
/** What may be in storage: saves from before Drop 1.5 lack the last three fields. */
export type SavedEsconderijo = Pick<
  EsconderijoState,
  "version" | "seen" | "openingDone" | "endingSeen"
> &
  Partial<
    Pick<EsconderijoState, "arrivalDone" | "flippedCardIds" | "ending15Seen">
  >;
export type EsconderijoEvent =
  | { type: "arrival" }
  | { type: "ending" }
  | { type: "open"; id: string }
  | { type: "flip"; id: string };
export const KEY = "coisinhas.esconderijo.v1";
export const freshEsconderijo = (): EsconderijoState => ({
  version: 1,
  seen: [],
  openingDone: false,
  endingSeen: false,
  arrivalDone: false,
  flippedCardIds: [],
  ending15Seen: false,
});
const ids = (v: unknown) =>
  Array.isArray(v) &&
  v.every((id) => typeof id === "string") &&
  new Set(v).size === v.length;
export function validEsconderijo(v: unknown): v is SavedEsconderijo {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const s = v as Record<string, unknown>;
  return (
    s.version === 1 &&
    ids(s.seen) &&
    typeof s.openingDone === "boolean" &&
    typeof s.endingSeen === "boolean" &&
    (s.arrivalDone === undefined || typeof s.arrivalDone === "boolean") &&
    (s.flippedCardIds === undefined || ids(s.flippedCardIds)) &&
    (s.ending15Seen === undefined || typeof s.ending15Seen === "boolean")
  );
}
/** Old saves keep everything; whoever already saw the old opening skips the new arrival. */
export const upgrade = (s: SavedEsconderijo): EsconderijoState => ({
  ...s,
  arrivalDone: s.arrivalDone ?? s.openingDone,
  flippedCardIds: s.flippedCardIds ?? [],
  ending15Seen: s.ending15Seen ?? false,
});
/** Drops ids whose cards no longer exist. */
export const prune = (
  s: EsconderijoState,
  known: string[],
): EsconderijoState =>
  [...s.seen, ...s.flippedCardIds].every((id) => known.includes(id))
    ? s
    : {
        ...s,
        seen: s.seen.filter((id) => known.includes(id)),
        flippedCardIds: s.flippedCardIds.filter((id) => known.includes(id)),
      };
const add = (list: string[], id: string) =>
  list.includes(id) ? list : [...list, id];
export function advanceEsconderijo(
  s: EsconderijoState,
  e: EsconderijoEvent,
): EsconderijoState {
  if (e.type === "arrival")
    return { ...s, arrivalDone: true, openingDone: true };
  if (e.type === "ending")
    return { ...s, ending15Seen: true, endingSeen: true };
  if (e.type === "flip")
    return s.flippedCardIds.includes(e.id)
      ? s
      : { ...s, flippedCardIds: add(s.flippedCardIds, e.id) };
  return s.seen.includes(e.id) ? s : { ...s, seen: add(s.seen, e.id) };
}
export const hasNew = (s: { seen: string[] }, known: string[]) =>
  known.some((id) => !s.seen.includes(id));
/** The ending plays the next time a tag is closed after 3 different tags were flipped (fewer if fewer exist). */
export const endingDue = (s: EsconderijoState, known: string[]) =>
  known.length > 0 &&
  !s.ending15Seen &&
  s.flippedCardIds.filter((id) => known.includes(id)).length >=
    Math.min(3, known.length);
/** Read-only load for the hub entry; never writes storage. */
export function readEsconderijo(): EsconderijoState {
  try {
    const v: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return validEsconderijo(v) ? upgrade(v) : freshEsconderijo();
  } catch {
    return freshEsconderijo();
  }
}
