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
    id: "bateria-fraca",
    addedOn: "2026-10-31",
    rarity: "lendario",
    icon: "battery",
    title: { pt: "Bateria fraca", en: "Low battery" },
    story: {
      pt: "No fim de muitas noites de Modern Family ou das minhas lives, você acaba dormindo na call.",
      en: "At the end of so many Modern Family nights or my streams, you end up falling asleep on the call.",
    },
    noticed: {
      pt: "Você apaga no meio da call e eu acho a coisa mais fofa. Nunca me incomodou.",
      en: "You fall asleep in the middle of the call and I think it's the cutest thing. It's never bothered me.",
    },
  },
  {
    id: "primeira-extracao",
    addedOn: "2026-10-31",
    rarity: "lendario",
    icon: "flare",
    title: { pt: "Sua primeira subida", en: "Your first time topside" },
    story: {
      pt: "Duas raiders saqueando tudo, fugindo de ARC gigante e quase morrendo.",
      en: "Two raiders looting everything, running from giant ARCs and almost dying.",
    },
    noticed: {
      pt: "Eu já tinha jogado antes. Não adiantou muito. A gente quase morreu e você ainda queria abrir mais uma gaveta.",
      en: "I'd played before. Didn't help much. We almost died and you still wanted to open one more drawer.",
    },
  },
  {
    id: "resgates",
    addedOn: "2026-10-31",
    rarity: "raro",
    icon: "zipline",
    title: { pt: "Contador de resgates", en: "Rescue counter" },
    story: {
      pt: "Número de vezes que você me levantou do chão: perdi a conta.",
      en: "Number of times you've picked me up off the ground: I've lost count.",
    },
    noticed: {
      pt: "Você gosta tanto de loot que, quando larga tudo pra me levantar, eu me sinto importante por uns cinco segundos.",
      en: "You love loot so much that when you drop everything to revive me, I feel important for about five seconds.",
    },
  },
  {
    id: "mochila-dela",
    addedOn: "2026-10-31",
    rarity: "raro",
    icon: "backpack",
    title: { pt: "Prioridades da raider", en: "Raider priorities" },
    story: {
      pt: "Primeiro saquear tudo. Depois saquear o resto. Se sobrar tempo, talvez se curar.",
      en: "First loot everything. Then loot the rest. If there's time left, maybe heal.",
    },
    noticed: {
      pt: "Você pode estar quase morrendo, mas se tiver mais um parafuso pra pegar, vai pegar. Muito a sua cara.",
      en: "You can be almost dead, but if there's one more bolt to loot, you're taking it. So you.",
    },
  },
  {
    id: "monster-rosa",
    addedOn: "2026-10-31",
    rarity: "comum",
    icon: "can",
    title: { pt: "Suprimento: Monster rosa", en: "Supply: pink Monster" },
    story: {
      pt: "Seu suprimento favorito. Nenhuma surpresa.",
      en: "Your favorite supply. No surprises.",
    },
    noticed: {
      pt: "Olha o que você fez. Agora eu vejo uma Monster rosa e lembro de você.",
      en: "Look what you've done. Now I see a pink Monster and think of you.",
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
