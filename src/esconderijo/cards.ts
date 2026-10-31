import type { Copy } from "../content/museumContent";
export const iconNames = [
  "backpack",
  "flare",
  "zipline",
  "key",
  "battery",
  "musicbox",
  "duck",
  "can",
  "collar",
  "star",
  "bolt",
  "map",
] as const;
export type IconName = (typeof iconNames)[number];
export type Rarity = "comum" | "raro" | "lendario";
export type Card = {
  id: string; // stable, never reused
  addedOn: string; // YYYY-MM-DD; newest first
  rarity: Rarity;
  icon: IconName;
  title: Copy;
  story: Copy;
  noticed: Copy;
  draft?: true; // placeholder: shown only in `npm run dev`
};
// Add new cards at the top. See ESCONDERIJO_GUIDE.md.
export const cards: Card[] = [
  {
    id: "draft-1",
    addedOn: "2026-10-31",
    rarity: "comum",
    icon: "backpack",
    draft: true,
    title: {
      pt: "TODO(jesh): momento real aqui",
      en: "TODO(jesh): real moment here",
    },
    story: {
      pt: "TODO(jesh): o que aconteceu de verdade.",
      en: "TODO(jesh): what really happened.",
    },
    noticed: {
      pt: "TODO(jesh): o que eu notei nela.",
      en: "TODO(jesh): what I noticed about her.",
    },
  },
  {
    id: "draft-2",
    addedOn: "2026-10-30",
    rarity: "raro",
    icon: "flare",
    draft: true,
    title: {
      pt: "TODO(jesh): outro momento real",
      en: "TODO(jesh): another real moment",
    },
    story: {
      pt: "TODO(jesh): o que aconteceu de verdade.",
      en: "TODO(jesh): what really happened.",
    },
    noticed: {
      pt: "TODO(jesh): o que eu notei nela.",
      en: "TODO(jesh): what I noticed about her.",
    },
  },
  {
    id: "draft-3",
    addedOn: "2026-10-29",
    rarity: "lendario",
    icon: "star",
    draft: true,
    title: {
      pt: "TODO(jesh): mais um momento real",
      en: "TODO(jesh): one more real moment",
    },
    story: {
      pt: "TODO(jesh): o que aconteceu de verdade.",
      en: "TODO(jesh): what really happened.",
    },
    noticed: {
      pt: "TODO(jesh): o que eu notei nela.",
      en: "TODO(jesh): what I noticed about her.",
    },
  },
];
/** Production hides drafts; newest first (stable for equal dates). */
export const visibleCards = (list: Card[], dev: boolean): Card[] =>
  list
    .filter((card) => dev || !card.draft)
    .map((card, i) => ({ card, i }))
    .sort((a, b) => b.card.addedOn.localeCompare(a.card.addedOn) || a.i - b.i)
    .map(({ card }) => card);
