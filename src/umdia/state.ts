/** One page per 19th. The last page waits for the first hug. Add new ids before "abraco". */
export const pageIds = [
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
  "abraco",
] as const;
export type PageId = (typeof pageIds)[number];
export type UmDiaState = {
  version: 1;
  /** Index of the page she was last on, so a refresh reopens it. */
  page: number;
  /** Distinct pages she has seen. */
  seen: PageId[];
};
export type UmDiaEvent = { type: "go"; page: number };
export const KEY = "coisinhas.umdia.v1";
export const lastPage = pageIds.length - 1;
export const freshUmDia = (): UmDiaState => ({
  version: 1,
  page: 0,
  seen: [],
});
const isPageId = (v: unknown): v is PageId =>
  (pageIds as readonly unknown[]).includes(v);
export function validUmDia(v: unknown): v is UmDiaState {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const s = v as UmDiaState;
  return (
    s.version === 1 &&
    Number.isInteger(s.page) &&
    s.page >= 0 &&
    s.page <= lastPage &&
    Array.isArray(s.seen) &&
    s.seen.every(isPageId) &&
    new Set(s.seen).size === s.seen.length
  );
}
/** Moves to a page (clamped) and records it as seen; returns the same object when nothing changes. */
export function advanceUmDia(s: UmDiaState, e: UmDiaEvent): UmDiaState {
  if (!Number.isFinite(e.page)) return s;
  const page = Math.min(lastPage, Math.max(0, Math.trunc(e.page)));
  const id = pageIds[page];
  const seen = s.seen.includes(id) ? s.seen : [...s.seen, id];
  if (page === s.page && seen === s.seen) return s;
  return { ...s, page, seen };
}
