import { useState } from "react";
import type { Language } from "../content/museumContent";
import { chapterCopy as c, constellations } from "./content";
import type { StarId } from "./state";
export function Atlas({
  language,
  found,
  unnamed,
  onStar,
  onUnnamed,
}: {
  language: Language;
  found: StarId[];
  unnamed: boolean;
  onStar: (id: StarId) => void;
  onUnnamed: () => void;
}) {
  const [active, setActive] = useState(0);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [replaying, setReplaying] = useState([false, false, false, false]);
  const [showUnknown, setShowUnknown] = useState(unnamed);
  const item = constellations[active];
  const complete = found.includes(item.id) && !replaying[active];
  const count = complete ? 4 : counts[active];
  function connect(index: number) {
    if (complete || index !== count) return;
    const next = count + 1;
    setCounts((old) => old.map((n, i) => (i === active ? next : n)));
    if (next === 4) {
      onStar(item.id);
      setReplaying((old) =>
        old.map((value, i) => (i === active ? false : value)),
      );
    }
  }
  return (
    <div className="atlas-experience">
      <p className="scene-whisper">{c.atlasHint[language]}</p>
      <div className="atlas-tabs" role="group" aria-label={c.atlas[language]}>
        {constellations.map((star, i) => (
          <button
            key={star.id}
            onClick={() => {
              setActive(i);
              setShowUnknown(false);
            }}
            aria-pressed={active === i && !showUnknown}
          >
            <span aria-hidden="true">
              {found.includes(star.id) ? "✦" : "✧"}
            </span>
            {star.name[language]}
          </button>
        ))}
      </div>
      <div className="atlas-paper">
        <span className="chart-number" aria-hidden="true">
          C. / 0{active + 1}
        </span>
        <div className="star-chart">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#a4b0bf"
              strokeOpacity=".13"
              strokeWidth=".3"
            />
            <path
              d="M0 50H100M50 0V100"
              stroke="#a4b0bf"
              strokeOpacity=".12"
              strokeWidth=".3"
            />
            {item.points.slice(0, Math.max(0, count - 1)).map(([x, y], i) => (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={item.points[i + 1][0]}
                y2={item.points[i + 1][1]}
                stroke="#d6c197"
                strokeWidth=".5"
              />
            ))}
            {[
              [13, 17],
              [80, 13],
              [91, 79],
              [44, 83],
              [8, 68],
              [67, 88],
              [69, 9],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r=".4" fill="#afbac7" />
            ))}
          </svg>
          {item.points.map(([x, y], i) => (
            <button
              key={`${active}-${i}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={`chart-star ${i < count ? "lit" : ""} ${i === count ? "next-star" : ""}`}
              onClick={() => connect(i)}
              disabled={!complete && i > count}
              aria-label={`${item.name[language]} · ${c.star[language]} ${i + 1}`}
            >
              <span aria-hidden="true">{i < count ? "✦" : "✧"}</span>
              {i === count && <small aria-hidden="true">{i + 1}</small>}
            </button>
          ))}
        </div>
        <div className="chart-legend" aria-live="polite">
          <h2>{complete ? item.name[language] : "· · ·"}</h2>
          <p>{complete ? item.copy[language] : `${count} / 4`}</p>
        </div>
        {complete && (
          <button
            className="text-button chart-replay"
            onClick={() => {
              setCounts((old) => old.map((n, i) => (i === active ? 0 : n)));
              setReplaying((old) =>
                old.map((value, i) => (i === active ? true : value)),
              );
            }}
          >
            {c.reconnect[language]} ↺
          </button>
        )}
        {!complete && (
          <button
            className="paper-button chart-next"
            onClick={() => connect(count)}
          >
            {c.connect[language]} <span aria-hidden="true">✧</span>
          </button>
        )}
      </div>
      {found.length === 4 && (
        <div className="unnamed-star">
          <button
            aria-label={c.unnamed[language]}
            onClick={() => {
              setShowUnknown(true);
              onUnnamed();
            }}
          >
            ✦
          </button>
          {showUnknown && <p className="revealed">{c.unnamedText[language]}</p>}
        </div>
      )}
    </div>
  );
}
