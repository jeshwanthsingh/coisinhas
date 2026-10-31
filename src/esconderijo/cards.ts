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
      pt: "Item encontrado no fim de quase toda noite de Modern Family ou de live: uma Karol dormindo na chamada. Toda. Vez.",
      en: "Item found at the end of almost every Modern Family night or stream: one Karol, asleep on the call. Every. Time.",
    },
    noticed: {
      pt: "Eu nunca fiquei chateado. Eu gosto de pensar que é porque você se sente em casa.",
      en: "I've never minded. I like to think it's because you feel at home.",
    },
  },
  {
    id: "primeira-extracao",
    addedOn: "2026-10-31",
    rarity: "lendario",
    icon: "flare",
    title: { pt: "Sua primeira subida", en: "Your first time topside" },
    story: {
      pt: "Duas raiders saqueando qualquer coisa, fugindo de ARC gigante e quase morrendo de cinco jeitos diferentes. Eu já tinha jogado antes, então era pra eu saber o que tava fazendo. (Não sabia.)",
      en: "Two raiders looting anything, running from giant ARCs and almost dying in five different ways. I'd played before, so I was supposed to know what I was doing. (I didn't.)",
    },
    noticed: {
      pt: "O jogo dá medo de noite, escuro e cheio de máquina — e mesmo assim você continuava abrindo cada gaveta.",
      en: "The game gets scary at night, dark and full of machines — and you still kept opening every drawer.",
    },
  },
  {
    id: "resgates",
    addedOn: "2026-10-31",
    rarity: "raro",
    icon: "zipline",
    title: { pt: "Contador de resgates", en: "Rescue counter" },
    story: {
      pt: "Número de vezes que você me levantou do chão: perdi a conta. O contador quebrou. Acho que fui eu que quebrei também.",
      en: "Number of times you've picked me up off the ground: I lost count. The counter broke. I think I broke it too.",
    },
    noticed: {
      pt: "Eu sei o quanto você ama loot. Então toda vez que você parou de saquear pra vir me buscar, eu levei como um elogio.",
      en: "I know how much you love loot. So every time you stopped looting to come get me, I took it as a compliment.",
    },
  },
  {
    id: "mochila-dela",
    addedOn: "2026-10-31",
    rarity: "raro",
    icon: "backpack",
    title: { pt: "Prioridades da raider", en: "Raider priorities" },
    story: {
      pt: "Ordem oficial: 1. saquear tudo. 2. saquear o resto. 3. talvez se curar.",
      en: "Official order: 1. loot everything. 2. loot the rest. 3. maybe heal.",
    },
    noticed: {
      pt: "Você não deixa nada pra trás — nem parafuso, nem detalhe. Acho que é por isso que a gente se entende: eu também guardo tudo de você.",
      en: "You never leave anything behind — not a bolt, not a detail. Maybe that's why we get each other: I keep everything of you too.",
    },
  },
  {
    id: "monster-rosa",
    addedOn: "2026-10-31",
    rarity: "comum",
    icon: "can",
    title: { pt: "Suprimento: Monster rosa", en: "Supply: pink Monster" },
    story: {
      pt: "Combustível oficial da dupla. Efeitos colaterais: energia infinita, paciência zero e um pouquinho de caos.",
      en: "Official fuel of the duo. Side effects: infinite energy, zero patience and a little bit of chaos.",
    },
    noticed: {
      pt: "Tem gente que tem perfume favorito. Você tem a Monster rosa.",
      en: "Some people have a favorite perfume. You have the pink Monster.",
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
