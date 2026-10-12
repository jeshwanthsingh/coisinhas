import { useState } from "react";
import type { CSSProperties } from "react";
import type { Language } from "../content/museumContent";
import { chapterCopy as c } from "./content";
import { radioIds } from "./state";
import type { RadioId } from "./state";
export function Radio({
  language,
  found,
  onStation,
}: {
  language: Language;
  found: RadioId[];
  onStation: (id: RadioId) => void;
}) {
  const [station, setStation] = useState(0);
  const [treated, setTreated] = useState(false);
  const [stamped, setStamped] = useState(false);
  const [worm, setWorm] = useState<"adopted" | "explained" | null>(null);
  const names = [c.radio, c.researchTitle, c.wormTitle];
  function tune(index: number) {
    setStation(index);
    onStation(radioIds[index]);
  }
  return (
    <div className="radio-experience">
      <div className={`radio-machine station-${station}`}>
        <div className="radio-face">
          <div className="radio-speaker" aria-hidden="true" />
          <div className="radio-glass">
            <span className="on-air">
              <i />{" "}
              {[c.dengoBand, c.researchBand, c.wormBand][station][language]}
            </span>
            <div className="frequency-scale" aria-hidden="true">
              <span>88</span>
              <span>94</span>
              <span>102</span>
              <span>108</span>
              <i style={{ left: `${12 + station * 36}%` }} />
            </div>
            <span className="frequency-number">
              {["88.4", "98.6", "107.2"][station]} <small>MHz</small>
            </span>
          </div>
        </div>
        <div className="radio-controls">
          <button
            className="tuning-knob"
            aria-label={c.nextStation[language]}
            onClick={() => tune((station + 1) % 3)}
            style={{ "--dial": `${-120 + station * 120}deg` } as CSSProperties}
          >
            <i aria-hidden="true" />
          </button>
          <label className="tuning-slider">
            <span>{c.tune[language]}</span>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={station}
              onChange={(e) => tune(Number(e.target.value))}
              aria-valuetext={names[station][language]}
            />
          </label>
          <span className="radio-brand" aria-hidden="true">
            C. / II
          </span>
        </div>
      </div>
      <div
        className="station-presets"
        role="group"
        aria-label={c.preset[language]}
      >
        {names.map((name, i) => (
          <button key={i} onClick={() => tune(i)} aria-pressed={station === i}>
            <small>
              0{i + 1}
              {found.includes(radioIds[i]) ? " ·" : ""}
            </small>
            {name[language]}
          </button>
        ))}
      </div>
      <article className="station-content" key={station}>
        {station === 0 && (
          <>
            <div
              className={`signal-meter ${treated ? "strong" : ""}`}
              aria-hidden="true"
            >
              <i />
              <span>− · · · · · +</span>
              {treated && <b>♡</b>}
            </div>
            <h2>{c.dengoAlert[language]}</h2>
            <p className="patient">{c.dengoPatient[language]}</p>
            <p className="rx-label">{c.treatment[language]}</p>
            <p>{c.dengoRx[language]}</p>
            <button
              className="paper-button"
              onClick={() => {
                setTreated((t) => !t);
                onStation("dengo");
              }}
            >
              {c.applyRx[language]} <span aria-hidden="true">＋</span>
            </button>
            {treated && (
              <p className="station-result" role="status">
                {c.signal[language]}
              </p>
            )}
            <small className="station-note">{c.doctor[language]}</small>
          </>
        )}
        {station === 1 && (
          <>
            <div className="research-wave" aria-hidden="true">
              ⌁ ─ ⌁ ─ ⌁ ─ ⌁
            </div>
            <h2>{c.researchTitle[language]}</h2>
            <p>{c.research[language]}</p>
            <button
              className={`research-stamp ${stamped ? "stamped" : ""}`}
              onClick={() => {
                setStamped((s) => !s);
                onStation("research");
              }}
            >
              {stamped ? c.inconclusive[language] : c.stamp[language]}
            </button>
            <small className="station-note">{c.forResearch[language]}</small>
          </>
        )}
        {station === 2 && (
          <>
            <div
              className={`worm-scene ${worm ? "worm-happy" : ""}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 230 105">
                <path
                  d="M42 85Q13 62 31 55Q48 48 57 71Q70 99 78 63Q83 27 100 42Q116 57 110 77"
                  fill="none"
                  stroke="#ba8f91"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="94" cy="43" r="2" fill="#293140" />
                <circle cx="104" cy="44" r="2" fill="#293140" />
                <path
                  d="M96 50Q100 55 105 50"
                  fill="none"
                  stroke="#625061"
                  strokeWidth="2"
                />
                <path
                  d="M170 47V94M154 94H186"
                  stroke="#ab9275"
                  strokeWidth="4"
                />
                <rect
                  x="157"
                  y="11"
                  width="25"
                  height="43"
                  rx="12"
                  fill="#9e9e99"
                />
                <path
                  d="M158 25H180M158 32H180M160 39H178"
                  stroke="#4a555d"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2>{c.wormQuestion[language]}</h2>
            <div className="worm-choices">
              <button
                className="paper-button"
                onClick={() => {
                  setWorm("adopted");
                  onStation("worm");
                }}
              >
                {c.adopt[language]}
              </button>
              <button
                className="text-button"
                onClick={() => {
                  setWorm("explained");
                  onStation("worm");
                }}
              >
                {c.explain[language]}
              </button>
            </div>
            {worm && (
              <p className="station-result" role="status">
                {c[worm][language]}
              </p>
            )}
          </>
        )}
      </article>
      {found.length === 3 && (
        <footer className="scene-resolution" role="status">
          <span>✧</span>
          <p>{c.radioComplete[language]}</p>
          <p>{c.ourLanguage[language]}</p>
        </footer>
      )}
    </div>
  );
}
