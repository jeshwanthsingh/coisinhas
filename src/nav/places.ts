export const places = [
  "museu",
  "depois",
  "jogador2",
  "domingo",
  "esconderijo",
  "tradutor",
] as const;
export type Place = (typeof places)[number];
/** Places inside the Jogador 2 hub that always open from a direct link. */
const hubPlaces = ["domingo", "esconderijo", "tradutor"] as const;
export type HubPlace = (typeof hubPlaces)[number];
const isHubPlace = (v: unknown): v is HubPlace =>
  (hubPlaces as readonly unknown[]).includes(v);
export type Access = { depois: boolean; jogador2: boolean };
/** hub: Jogador 2 was reached through a direct link; opened: which hub places she has visited. */
export type NavState = {
  version: 1;
  hub: boolean;
  opened: HubPlace[];
};
export const NAV_KEY = "coisinhas.nav.v1";
export const freshNav = (): NavState => ({
  version: 1,
  hub: false,
  opened: [],
});
export function validNav(v: unknown): v is NavState {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const s = v as NavState;
  return (
    s.version === 1 &&
    typeof s.hub === "boolean" &&
    Array.isArray(s.opened) &&
    s.opened.every(isHubPlace) &&
    new Set(s.opened).size === s.opened.length
  );
}
/** Visiting a hub place makes the hub reachable; returns the same object when nothing changes. */
export function markPlace(s: NavState, place: Place): NavState {
  if (!isHubPlace(place)) return s;
  if (s.hub && s.opened.includes(place)) return s;
  return {
    ...s,
    hub: true,
    opened: s.opened.includes(place) ? s.opened : [...s.opened, place],
  };
}
export const hashFor = (place: Place) => `#${place}`;
/** Same rules as the old bottom shortcuts: `legacy` = six discoveries at load, `letter` = chapter-two letter read. */
export const accessFor = (
  p: { legacy: boolean; unlocked: boolean; letter: boolean },
  nav: NavState,
): Access => ({
  depois: p.legacy || p.unlocked,
  jogador2: p.letter || nav.hub,
});
/** Hash -> place. Domingo, esconderijo and tradutor always open; the rest need access; anything else is the museum. */
export function resolvePlace(hash: string, access: Access): Place {
  const key = hash.replace(/^#\/?/, "").toLowerCase();
  if (isHubPlace(key)) return key;
  if (key === "depois" && access.depois) return "depois";
  if (key === "jogador2" && access.jogador2) return "jogador2";
  return "museu";
}
/** Places listed in the map: only what is already unlocked. */
export const visiblePlaces = (access: Access): Place[] => [
  "museu",
  ...(access.depois ? (["depois"] as const) : []),
  ...(access.jogador2
    ? (["jogador2", "domingo", "esconderijo", "tradutor"] as const)
    : []),
];
