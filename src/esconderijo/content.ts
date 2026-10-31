import type { Copy } from "../content/museumContent";
export const c = {
  title: { pt: "O Esconderijo.", en: "The Hideout." },
  entry: { pt: "o esconderijo.", en: "the hideout." },
  entryHint: {
    pt: "onde eu guardo o que a gente traz de volta.",
    en: "where I keep what we bring back.",
  },
  newInStash: { pt: "tem coisa nova no baú", en: "something new in the stash" },
  hub: { pt: "voltar ao quarto", en: "back to the room" },
  roomAlt: {
    pt: "Um esconderijo subterrâneo e aconchegante: uma escotilha com escada, duas mochilas encostadas, uma bancada, um baú grande e um periscópio mostrando o céu e uma araucária.",
    en: "A cozy underground hideout: a hatch with a ladder, two backpacks leaning together, a workbench, a big stash crate, and a periscope showing the sky and an araucária.",
  },
  next: { pt: "continua", en: "continue" },
  toStash: { pt: "ver o baú", en: "see the stash" },
  crate: { pt: "abrir o baú", en: "open the stash" },
  crateClose: { pt: "fechar o baú", en: "close the stash" },
  crateOpened: { pt: "baú aberto.", en: "stash open." },
  crateCount: {
    pt: "coisas guardadas:",
    en: "things kept:",
  },
  empty: {
    pt: "o baú tá esperando a primeira coisa",
    en: "the stash is waiting for its first thing",
  },
  newTag: { pt: "novo", en: "new" },
  happened: { pt: "o que aconteceu", en: "what happened" },
  noticed: { pt: "o que eu notei em você", en: "what I noticed about you" },
  close: { pt: "fechar", en: "close" },
  language: { pt: "Idioma", en: "Language" },
  pt: { pt: "PT", en: "PT" },
  en: { pt: "EN", en: "EN" },
  note: { pt: "um bilhete preso no baú", en: "a note pinned to the stash" },
  backToRoom: { pt: "voltar ao esconderijo", en: "back to the hideout" },
  signature: { pt: "— seu amorzinho", en: "— seu amorzinho" },
  rarity: {
    comum: { pt: "comum", en: "common" },
    raro: { pt: "raro", en: "rare" },
    lendario: { pt: "lendário", en: "legendary" },
  },
} satisfies Record<string, Copy | Record<string, Copy>>;
export const openingLines: Copy[] = [
  {
    pt: "A gente já sobe junto quase toda noite.",
    en: "We already go topside together almost every night.",
  },
  {
    pt: "Isso aqui é onde eu guardo o que a gente traz de volta.",
    en: "This is where I keep what we bring back.",
  },
];
export const endingLines: Copy[] = [
  {
    pt: "Eu não lembro de tudo porque sou organizado. Eu lembro porque era você.",
    en: "I don’t remember all of this because I’m organized. I remember because it was you.",
  },
];
