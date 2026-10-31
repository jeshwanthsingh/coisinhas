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
  topsideAlt: {
    pt: "Uma noite lá em cima: prédios em ruínas, holofotes, uma máquina enorme ao longe e duas raiders perto de um ponto de extração.",
    en: "A night topside: ruined buildings, searchlights, a huge machine far away, and two raiders near an extraction point.",
  },
  roomAlt: {
    pt: "O esconderijo: uma escotilha com escada, duas mochilas lado a lado, uma bancada, um baú brilhando com um gato preto em cima, luzinhas e um periscópio mostrando uma araucária.",
    en: "The hideout: a hatch with a ladder, two backpacks side by side, a workbench, a glowing stash crate with a black cat on top, string lights, and a periscope showing an araucária.",
  },
  holdExtract: { pt: "segura pra extrair", en: "hold to extract" },
  tapExtract: { pt: "toca pra extrair", en: "tap to extract" },
  orTap: { pt: "ou toca aqui", en: "or just tap" },
  descending: { pt: "descendo…", en: "going down…" },
  roomLine: {
    pt: "Isso aqui é onde eu guardo o que a gente traz de volta.",
    en: "This is where I keep what we bring back.",
  },
  replay: { pt: "subir de novo", en: "go topside again" },
  next: { pt: "continua", en: "continue" },
  crate: { pt: "abrir o baú", en: "open the stash" },
  crateClose: { pt: "fechar o baú", en: "close the stash" },
  crateOpened: { pt: "baú aberto.", en: "stash open." },
  tagsCount: { pt: "etiquetas:", en: "tags:" },
  empty: {
    pt: "o baú tá esperando a primeira coisa",
    en: "the stash is waiting for its first thing",
  },
  newTag: { pt: "novo", en: "new" },
  flip: { pt: "vira a etiqueta", en: "flip the tag" },
  flipBack: { pt: "ver a frente", en: "see the front" },
  holdRevive: { pt: "segura pra me levantar", en: "hold to revive me" },
  tapRevive: { pt: "toca pra me levantar", en: "tap to revive me" },
  close: { pt: "fechar", en: "close" },
  language: { pt: "Idioma", en: "Language" },
  note: { pt: "um bilhete preso no baú", en: "a note pinned to the stash" },
  backToRoom: { pt: "voltar ao esconderijo", en: "back to the hideout" },
  signature: { pt: "— seu amorzinho", en: "— seu amorzinho" },
  rarity: {
    comum: { pt: "comum", en: "common" },
    raro: { pt: "raro", en: "rare" },
    lendario: { pt: "lendário", en: "legendary" },
  },
} satisfies Record<string, Copy | Record<string, Copy>>;
export const holdLines: Copy[] = [
  {
    pt: "lá em cima é escuro e tem ARC pra todo lado.",
    en: "up there it's dark and there are ARCs everywhere.",
  },
  { pt: "a gente sobe pra buscar loot.", en: "we go topside for loot." },
];
export const endingLines: Copy[] = [
  {
    pt: "Lá em cima, a gente corre de ARC, pega loot e quase morre por besteira.",
    en: "Topside, we run from ARCs, grab loot, and almost die doing stupid things.",
  },
  {
    pt: "Você já me levantou mais vezes do que eu consigo contar.",
    en: "You've revived me more times than I can count.",
  },
  {
    pt: "No esconderijo, a gente guarda o que trouxe.",
    en: "In the hideout, we put away what we brought back.",
  },
  {
    pt: "Mas o que eu guardo mesmo são essas noites com você.",
    en: "But what I really keep are these nights with you.",
  },
];
