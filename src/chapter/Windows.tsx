import { useEffect, useState } from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { chapterCopy as c } from "./content";
const memories = ["laughter", "silence", "longing"] as const;
export function Windows({
  language,
  completed,
  onComplete,
}: {
  language: Language;
  completed: boolean;
  onComplete: () => void;
}) {
  const [light, setLight] = useState(completed ? 100 : 0);
  const [revealed, setRevealed] = useState(completed);
  const [seen, setSeen] = useState<string[]>(completed ? [...memories] : []);
  const [selected, setSelected] = useState<(typeof memories)[number] | null>(
    null,
  );
  const reduced = useReducedMotion();
  const joined = light >= 98;
  const all = seen.length === 3;
  useEffect(() => {
    if (!joined) return;
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, [joined]);
  function select(id: (typeof memories)[number]) {
    setSelected(id);
    const next = seen.includes(id) ? seen : [...seen, id];
    setSeen(next);
    if (next.length === 3) onComplete();
  }
  return (
    <div
      className={`windows-experience ${joined ? "joined" : ""} ${all ? "connected" : ""}`}
    >
      <div className="shared-sky">
        <svg
          className="sky-path"
          viewBox="0 0 600 300"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="sky-connection"
            d="M85 196L172 155L233 178L305 126L370 158L440 136L510 196"
            stroke="#d1c39c"
            strokeWidth="1"
          />
          {[
            [85, 196],
            [172, 155],
            [233, 178],
            [305, 126],
            [370, 158],
            [440, 136],
            [510, 196],
          ].map(([x, y], i) => (
            <g key={x} opacity={light >= i * 16 ? 1 : 0.13}>
              <circle cx={x} cy={y} r="2.2" fill="#e5d5ab" />
              <path
                d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`}
                stroke="#e5d5ab"
                strokeWidth=".7"
              />
            </g>
          ))}
          <path
            d="M295 42Q275 57 298 66Q267 70 273 48Q281 36 295 42Z"
            fill="#b9bcc8"
          />
        </svg>
        <div className="little-window here-window">
          <div className="window-glass">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span>{c.here[language]}</span>
        </div>
        <button
          className="little-window there-window"
          onClick={() => setLight(100)}
          aria-label={c.sendLight[language]}
        >
          <span className="window-glass">
            <i />
            <i />
            <i />
            <i />
            {joined && (
              <b className="window-cat" aria-hidden="true">
                ⌁
              </b>
            )}
          </span>
          <span>{c.there[language]}</span>
        </button>
        <input
          className="travel-light"
          type="range"
          min="0"
          max="100"
          value={light}
          onChange={(e) => setLight(Number(e.target.value))}
          aria-label={c.lightControl[language]}
        />
        <span className="sky-caption">
          {joined ? "✧" : c.lightHint[language]}
        </span>
      </div>
      {!joined && (
        <button
          className="text-button send-light"
          onClick={() => setLight(100)}
        >
          {c.sendLight[language]} <span aria-hidden="true">→</span>
        </button>
      )}
      {joined && (
        <div className="window-story">
          <p>{c.distance[language]}</p>
          {revealed || reduced ? (
            <p className="revealed">{c.notStopped[language]}</p>
          ) : (
            <button className="text-button" onClick={() => setRevealed(true)}>
              {c.continue[language]} →
            </button>
          )}
          <div className="sky-memories">
            {memories.map((id) => (
              <button
                key={id}
                onClick={() => select(id)}
                aria-pressed={selected === id}
              >
                <span aria-hidden="true">{seen.includes(id) ? "✦" : "✧"}</span>
                {c[id][language]}
              </button>
            ))}
          </div>
          <p className="memory-line" role="status">
            {selected ? c[`${selected}Text`][language] : " "}
          </p>
          {all && (
            <div className="scene-resolution">
              <p>{c.screen[language]}</p>
              <p className="handwritten">{c.goodnight[language]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
