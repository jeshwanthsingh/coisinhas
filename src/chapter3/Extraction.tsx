import { useState } from "react";
import type { SceneProps } from "./Player2";
import { lootIds, letterIds, type LootId, type LetterId } from "./state";
import { c, lootCopy, letters } from "./content";
import { Dialog } from "./Dialog";
import { Backup } from "./Backup";
export function Extraction({
  language,
  state,
  dispatch,
  onLanguage,
}: SceneProps) {
  const [light, setLight] = useState(
    state.extracted
      ? 100
      : Math.max(0, ...state.loot.map((id) => (lootIds.indexOf(id) + 1) * 20)),
  );
  const [card, setCard] = useState<
    { kind: "loot"; id: LootId } | { kind: "letter"; id: LetterId } | null
  >(null);
  function move(value: number) {
    setLight(value);
    lootIds.forEach((id, i) => {
      if (value >= (i + 1) * 20) dispatch({ type: "loot", id });
    });
    if (value === 100) dispatch({ type: "extract" });
  }
  const selected = card
    ? card.kind === "loot"
      ? lootCopy[card.id]
      : letters[card.id]
    : null;
  const x = 60 + light * 4.8;
  const y = 155 + Math.sin((light / 100) * Math.PI * 2) * 35;
  return (
    <section className="p2-scene">
      <p className="p2-intro">{c.routeHint[language]}</p>
      <div className="p2-map">
        <svg viewBox="0 0 600 300" aria-hidden="true">
          <path
            d="M25 70L120 38 190 90 270 45 350 70 460 36 575 85M30 250L120 210 195 255 300 210 390 250 570 215"
            stroke="#435165"
            fill="none"
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, n) =>
                `${n === 0 ? "M" : "L"}${60 + n * 4.8} ${155 + Math.sin((n / 100) * Math.PI * 2) * 35}`,
            ).join(" ")}
            fill="none"
            stroke="#a79a80"
            strokeDasharray="3 9"
          />
          {lootIds.map((id, i) => {
            const n = (i + 1) * 20;
            return (
              <circle
                key={id}
                cx={60 + n * 4.8}
                cy={155 + Math.sin((n / 100) * Math.PI * 2) * 35}
                r="5"
                fill={state.loot.includes(id) ? "#d8b87c" : "#586275"}
              />
            );
          })}
          <path
            d="M42 128h36v54H42zM42 149h36M60 128v54"
            stroke="#b0a2b8"
            fill="#334255"
          />
          <path
            d="M520 128h40v54h-40zM520 149h40M540 128v54"
            stroke="#b0a2b8"
            fill={state.extracted ? "#d8b87c" : "#334255"}
          />
          <circle cx={x} cy={y} r="15" fill="#e2d3b7" opacity=".12" />
          <circle cx={x} cy={y} r="5" fill="#fff0c9" />
        </svg>
        <div className="p2-map-labels">
          <span>{c.sf[language]}</span>
          <span>{c.curitiba[language]}</span>
        </div>
      </div>
      <label className="p2-range-label">
        {c.routeControl[language]}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={light}
          onChange={(e) => move(Number(e.target.value))}
        />
      </label>
      <div className="p2-center">
        <button
          className="p2-primary"
          disabled={light === 100}
          onClick={() => move(Math.min(100, (Math.floor(light / 20) + 1) * 20))}
        >
          {c.step[language]} →
        </button>
        <p role="status">
          {state.extracted ? c.home[language] : `${state.loot.length}/5`}
        </p>
      </div>
      <h2>{c.loot[language]}</h2>
      <div className="p2-chips">
        {lootIds.map((id) => (
          <button
            key={id}
            disabled={!state.loot.includes(id)}
            onClick={() => setCard({ kind: "loot", id })}
          >
            ✧ {lootCopy[id].title[language]}
          </button>
        ))}
      </div>
      <h2>{c.inventory[language]}</h2>
      <div className="p2-envelopes">
        {letterIds.map((id) => (
          <button
            key={id}
            onClick={() => {
              dispatch({ type: "letter", id });
              setCard({ kind: "letter", id });
            }}
          >
            <span aria-hidden="true">
              {state.lettersOpened.includes(id) ? "◇" : "▱"}
            </span>
            {letters[id].title[language]}
          </button>
        ))}
      </div>
      {import.meta.env.VITE_NTFY_TOPIC && (
        <Backup language={language} state={state} dispatch={dispatch} />
      )}{" "}
      {selected && (
        <Dialog
          language={language}
          onLanguage={onLanguage}
          title={selected.title[language]}
          onClose={() => setCard(null)}
        >
          <p className="p2-letter-body">{selected.body[language]}</p>
        </Dialog>
      )}
    </section>
  );
}
