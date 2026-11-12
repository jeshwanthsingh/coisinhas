import type { Copy } from "../content/museumContent";
import type { PhraseId } from "./state";
export const c = {
  title: { pt: "O Tradutor.", en: "The Translator." },
  entry: { pt: "o tradutor.", en: "the translator." },
  entryHint: {
    pt: "uma máquina que só traduz uma língua.",
    en: "a machine that only translates one language.",
  },
  hub: { pt: "voltar ao quarto", en: "back to the room" },
  arrivalAlt: {
    pt: "Uma oficina escura com uma lâmpada acesa e uma máquina coberta por um pano.",
    en: "A dim workshop with a warm lamp and a machine under a cloth.",
  },
  machineAlt: {
    pt: "Uma máquina de latão com engrenagens e uma fita de papel.",
    en: "A brass machine with gears and a paper slip.",
  },
  turnOn: { pt: "Ligar", en: "Turn on" },
  plate: { pt: "a língua da Karol", en: "Karol’s language" },
  slip: { pt: "o que eu ouço", en: "what I hear" },
  hint: { pt: "toca numa frase.", en: "tap a phrase." },
  stamp: { pt: "= eu te amo", en: "= I love you" },
  done: { pt: "já traduzido", en: "already translated" },
  lever: { pt: "traduzir na minha língua", en: "translate into my language" },
  next: { pt: "continua", en: "continue" },
  again: { pt: "Reler", en: "Read again" },
  signature: { pt: "— seu amorzinho", en: "— seu amorzinho" },
} satisfies Record<string, Copy>;
export const arrivalLine: Copy = {
  pt: "Encontrei uma máquina estranha. Ela traduz uma língua só: a sua.",
  en: "I found a strange machine. It only translates one language: yours.",
};
export type Phrase = {
  id: PhraseId;
  said?: Copy;
  /** `said` is a description of something she does, not a quote. */
  action?: boolean;
  detail?: Copy;
  eye?: boolean;
  translation: Copy;
};
export const phrases: Phrase[] = [
  {
    id: "bom-dia",
    said: { pt: "“Bom dia meu amor”", en: "“Bom dia meu amor”" },
    detail: {
      pt: "primeira mensagem do dia, 88 de 102 manhãs",
      en: "first message of the day, 88 of 102 mornings",
    },
    translation: {
      pt: "Eu pensei em você primeiro.",
      en: "I thought of you first.",
    },
  },
  {
    id: "dorme-na-chamada",
    said: {
      pt: "dorme no meio da chamada",
      en: "falls asleep in the middle of the call",
    },
    action: true,
    translation: {
      pt: "Eu me sinto segura com você.",
      en: "I feel safe with you.",
    },
  },
  {
    id: "loot-primeiro",
    said: {
      pt: "“Loot primeiro, cura depois”",
      en: "“Loot first, heal later”",
    },
    detail: {
      pt: "… e depois volta pra me salvar",
      en: "… then comes back to save me",
    },
    translation: {
      pt: "Eu sempre volto pra te buscar.",
      en: "I always come back for you.",
    },
  },
  {
    id: "meu-amorzinho",
    said: {
      pt: "“I told you to not talk like that about meu amorzinho”",
      en: "“I told you to not talk like that about meu amorzinho”",
    },
    translation: {
      pt: "Ninguém fala mal de você. Nem você.",
      en: "Nobody talks bad about you. Not even you.",
    },
  },
  {
    id: "vai-dormir",
    said: { pt: "“Vai dormir. Já comeu?”", en: "“Go to sleep. Did you eat?”" },
    translation: { pt: "Eu cuido de você.", en: "I take care of you." },
  },
  {
    id: "jabuticabeira",
    said: {
      pt: "rega a jabuticabeira todo dia",
      en: "waters the jabuticaba tree every day",
    },
    action: true,
    translation: { pt: "Eu continuo voltando.", en: "I keep coming back." },
  },
  {
    id: "revirada",
    eye: true,
    detail: { pt: "a de “continua”", en: "the “keep going” one" },
    translation: {
      pt: "Continua. Eu gosto de você.",
      en: "Keep going. I like you.",
    },
  },
  {
    id: "you-hate-me",
    said: { pt: "“You hate me”", en: "“You hate me”" },
    translation: {
      pt: "Presta atenção em mim.",
      en: "Pay attention to me.",
    },
  },
  {
    id: "portugues",
    said: {
      pt: "me ensina português e corrige minha gramática",
      en: "teaches me Portuguese and fixes my grammar",
    },
    action: true,
    translation: {
      pt: "Eu quero você no meu mundo.",
      en: "I want you in my world.",
    },
  },
];
export const endingLines: Copy[] = [
  {
    pt: "Você nunca precisou dizer as palavras. Eu aprendi a sua língua, e nela eu ouço isso todo dia.",
    en: "You never needed to say the words. I learned your language, and in it I hear this every day.",
  },
  {
    pt: "Mas eu sou insistente. Então vou dizer na minha:",
    en: "But I’m insistent. So I’ll say it in mine:",
  },
  { pt: "Eu te amo, Karol.", en: "I love you, Karol." },
  {
    pt: "Isso não é uma pergunta. Não precisa traduzir de volta.",
    en: "This isn’t a question. You don’t need to translate it back.",
  },
];
