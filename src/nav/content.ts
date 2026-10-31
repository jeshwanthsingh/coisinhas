import type { Copy } from "../content/museumContent";
import type { Place } from "./places";
export const n = {
  map: { pt: "o mapa", en: "the map" },
  mapTitle: { pt: "pra onde você quer ir?", en: "where would you like to go?" },
  here: { pt: "você está aqui", en: "you are here" },
  close: { pt: "fechar", en: "close" },
  language: { pt: "Idioma", en: "Language" },
  toDepois: { pt: "depois do fechamento", en: "after hours" },
  newInStash: { pt: "tem coisa nova no baú", en: "something new in the stash" },
} satisfies Record<string, Copy>;
export const placeNames: Record<Place, Copy> = {
  museu: { pt: "um pequeno museu de nós", en: "a little museum of us" },
  depois: { pt: "depois do fechamento", en: "after hours" },
  jogador2: { pt: "Jogador 2", en: "Player 2" },
  domingo: {
    pt: "o domingo que ainda não aconteceu",
    en: "the Sunday that hasn’t happened yet",
  },
  esconderijo: { pt: "o esconderijo", en: "the hideout" },
};
/** Short labels for the quiet doors on the main page. */
export const doorNames: Record<Exclude<Place, "museu">, Copy> = {
  depois: { pt: "depois do fechamento", en: "after hours" },
  jogador2: { pt: "jogador 2", en: "player 2" },
  domingo: { pt: "o domingo", en: "the Sunday" },
  esconderijo: { pt: "o esconderijo", en: "the hideout" },
};
