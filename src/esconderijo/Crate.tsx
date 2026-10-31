import type { Language } from "../content/museumContent";
import type { Card } from "./cards";
import { CardIcon } from "./Artwork";
import { c } from "./content";
const tilt = [-2.5, 2, -1.5, 3, -2];
/** Paper luggage tags hanging on a string. */
export function Crate({
  cards,
  seen,
  language,
  onCard,
}: {
  cards: Card[];
  seen: string[];
  language: Language;
  onCard: (card: Card) => void;
}) {
  return (
    <div className="esc-crate">
      <p role="status" className="esc-count">
        {c.crateOpened[language]}{" "}
        {cards.length > 0 && `${c.tagsCount[language]} ${cards.length}`}
      </p>
      {cards.length === 0 ? (
        <p className="esc-empty">{c.empty[language]}</p>
      ) : (
        <ul className="esc-tags">
          {cards.map((card, i) => {
            const fresh = !seen.includes(card.id);
            return (
              <li
                key={card.id}
                style={{ ["--tilt" as string]: `${tilt[i % 5]}deg` }}
              >
                <button
                  className={`esc-tag esc-${card.rarity} ${fresh ? "esc-tag-new" : ""}`}
                  onClick={() => onCard(card)}
                >
                  <i className="esc-hole" aria-hidden="true" />
                  <CardIcon name={card.icon} />
                  <strong>{card.title[language]}</strong>
                  <span className="esc-stamp">
                    {c.rarity[card.rarity][language]}
                  </span>
                  {fresh && <em>{c.newTag[language]}</em>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
