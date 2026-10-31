import { cards, visibleCards } from "./cards";
export const published = visibleCards(cards, import.meta.env.DEV);
