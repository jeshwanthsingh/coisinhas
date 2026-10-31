import type { Place } from "../nav/places";
import type { Scene } from "./Player2";
import type { Player2State } from "./state";
/** Scene a place opens on: Jogador 2 resumes at the hub once a save slot is chosen. */
export const sceneFor = (place: Place, slot: Player2State["slot"]): Scene =>
  place === "domingo"
    ? "sunday"
    : place === "esconderijo"
      ? "esconderijo"
      : slot === "karol"
        ? "hub"
        : "title";
