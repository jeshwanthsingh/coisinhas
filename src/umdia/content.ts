import type { Copy } from "../content/museumContent";
import type { PageId } from "./state";

export const c = {
  title: { pt: "Um dia.", en: "One day." },
  entry: { pt: "um dia.", en: "one day." },
  entryHint: {
    pt: "o dia 19 de cada mês.",
    en: "the 19th of every month.",
  },
  hub: { pt: "voltar ao quarto", en: "back to the room" },
  open: { pt: "Abrir o diário", en: "Open the diary" },
  closedAlt: {
    pt: "Um diário fechado em cima de uma mesa, com uma fita marcando uma página.",
    en: "A closed diary on a table, with a ribbon marking a page.",
  },
  prev: { pt: "página anterior", en: "previous page" },
  next: { pt: "virar a página", en: "turn the page" },
  months: { pt: "os dias 19", en: "the 19ths" },
  of: { pt: "de", en: "of" },
  page: { pt: "Página", en: "Page" },
  youSaid: { pt: "você disse", en: "you said" },
  unwritten: {
    pt: "Essa página ainda não foi escrita.",
    en: "This page hasn’t been written yet.",
  },
  hugDateEmpty: { pt: "__ / __ / ____", en: "__ / __ / ____" },
  continues: {
    pt: "continua todo dia 19.",
    en: "to be continued every 19th.",
  },
  signature: { pt: "— Jes", en: "— Jes" },
} satisfies Record<string, Copy>;

export const intro: Copy[] = [
  {
    pt: "Tem um filme que você ama sobre duas pessoas vistas no mesmo dia, ano depois de ano.",
    en: "There’s a film you love about two people, seen on the same day, year after year.",
  },
  {
    pt: "A gente ainda não tem anos. Mas tem o dia 19.",
    en: "We don’t have years yet. But we have the 19th.",
  },
];

/**
 * Set this to the agreed day (e.g. "19/12/2026") once you have picked it together.
 * While it is null, the last page stays blank on purpose.
 */
export const HUG_DATE: string | null = null;

export type Art =
  | "phone"
  | "cloud"
  | "cat"
  | "stars"
  | "plates"
  | "blank"
  | "hug";

export type DiaryPage = {
  id: PageId;
  month: Copy;
  date: Copy;
  art: Art;
  /** Her own words that day, exactly as she wrote them. */
  quote?: string;
  /** What I noticed. Rewrite these in your own words before sending. */
  note?: Copy;
  /** A page that hasn't happened yet. */
  unwritten?: boolean;
};

export const diary: DiaryPage[] = [
  {
    id: "jul",
    month: { pt: "jul", en: "jul" },
    date: { pt: "19 de julho", en: "July 19" },
    art: "phone",
    quote: "Im saving your number as Jes",
    note: {
      pt: "Minhas primeiras palavras aqui foram “finally got it” e “that was difficult”. Eu não fazia ideia do quanto eu tinha acabado de ganhar.",
      en: "My first words here were “finally got it” and “that was difficult”. I had no idea how much I’d just won.",
    },
  },
  {
    id: "ago",
    month: { pt: "ago", en: "aug" },
    date: { pt: "19 de agosto", en: "August 19" },
    art: "cloud",
    quote: "in brazil we say that daydreaming costs nothing",
    note: {
      pt: "Nesse dia você estava com o cabelo natural e disse que se sentia bonita. Eu levei muito a sério a parte de sonhar acordado.",
      en: "That day you wore your natural hair and said you felt cute. I took the daydreaming part very seriously.",
    },
  },
  {
    id: "set",
    month: { pt: "set", en: "sep" },
    date: { pt: "19 de setembro", en: "September 19" },
    art: "cat",
    quote: "Sorry, I'm very dengosa",
    note: {
      pt: "Você pediu desculpa por estar dengosa. Nunca precisa. É a minha palavra favorita em você.",
      en: "You apologised for being dengosa. You never have to. It’s my favourite word on you.",
    },
  },
  {
    id: "out",
    month: { pt: "out", en: "oct" },
    date: { pt: "19 de outubro", en: "October 19" },
    art: "stars",
    quote: "Why do you think I am always missing you",
    note: {
      pt: "Na mesma manhã eu tinha dito: “I'm down to anything, as long as it's with you.” Acho que a gente estava dizendo a mesma coisa.",
      en: "That same morning I’d said: “I'm down to anything, as long as it's with you.” I think we were saying the same thing.",
    },
  },
  {
    id: "nov",
    month: { pt: "nov", en: "nov" },
    date: { pt: "19 de novembro", en: "November 19" },
    art: "plates",
    quote: "we both had our favorite food for lunch",
    note: {
      pt: "Eu ainda nem tinha almoçado. Mas você escreveu “nós dois”, e eu fiquei com isso o dia inteiro.",
      en: "I hadn’t even had lunch yet. But you wrote “we both”, and I kept that all day.",
    },
  },
  {
    id: "dez",
    month: { pt: "dez", en: "dec" },
    date: { pt: "19 de dezembro", en: "December 19" },
    art: "blank",
    unwritten: true,
  },
  {
    id: "abraco",
    month: { pt: "♡", en: "♡" },
    date: { pt: "o primeiro abraço", en: "the first hug" },
    art: "hug",
    note: {
      pt: "Essa página fica em branco até a gente escolher a data. Juntos.",
      en: "This page stays blank until we pick the date. Together.",
    },
  },
];
