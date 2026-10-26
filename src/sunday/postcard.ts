import type { Postcard } from "./state";
import { cardMorning, cardActivities, cardClose, c } from "./content.js";
export function postcardParagraphs(
  p: Postcard,
  language: "pt" | "en",
): string[] {
  const activities = p.activities.map((id) =>
    id === "food"
      ? cardActivities[`${p.food!}_${p.plate!}`][language]
      : id === "tv"
        ? cardActivities[p.channel!][language]
        : cardActivities[p.game!][language],
  );
  return [
    cardMorning[`${p.weather}_${p.morning}`][language],
    ...activities,
    cardClose[`${p.seat}_${p.closeness}`][language],
    c.postcardNote[language],
  ];
}
export function postcardText(p: Postcard, language: "pt" | "en") {
  return [
    c.postcard[language],
    ...postcardParagraphs(p, language),
    c.signature[language],
  ].join("\n\n");
}
