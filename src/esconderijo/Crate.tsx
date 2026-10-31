import type { Language } from "../content/museumContent";
import type { Card } from "./cards";
import { CardIcon } from "./Artwork";
import { c } from "./content";
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
        {cards.length > 0 && `${c.crateCount[language]} ${cards.length}`}
      </p>
      {cards.length === 0 ? (
        <p className="esc-empty">{c.empty[language]}</p>
      ) : (
        <ul>
          {cards.map((card) => {
            const fresh = !seen.includes(card.id);
            return (
              <li key={card.id}>
                <button
                  className={`esc-card esc-${card.rarity} ${fresh ? "esc-card-new" : ""}`}
                  onClick={() => onCard(card)}
                >
                  <CardIcon name={card.icon} />
                  <span>
                    <small>
                      {c.rarity[card.rarity][language]}
                      {fresh && ` · ${c.newTag[language]}`}
                    </small>
                    <strong>{card.title[language]}</strong>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
