import { useEffect, useState } from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { c, holdLines } from "./content";
import { HoldButton } from "./HoldButton";
import { TopsideArt } from "./Artwork";
/** Topside night: hold (or tap) to extract, then a short descent into the hideout. */
export function Arrival({
  language,
  onDone,
}: {
  language: Language;
  onDone: () => void;
}) {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState(0);
  const [down, setDown] = useState(false);
  const [progress, setProgress] = useState(0);
  const shown = reduced || down ? holdLines.length : lines;
  useEffect(() => {
    if (progress > 0) setLines((n) => Math.max(n, progress > 0.5 ? 2 : 1));
  }, [progress]);
  useEffect(() => {
    if (!down) return;
    const t = window.setTimeout(onDone, reduced ? 0 : 2600);
    return () => window.clearTimeout(t);
  }, [down, reduced, onDone]);
  return (
    <div className={`esc-arrival ${down ? "esc-down" : ""}`}>
      <div className="esc-stage esc-topside">
        <TopsideArt />
        {down && (
          <div className="esc-descent" aria-hidden="true">
            <svg viewBox="0 0 120 400" preserveAspectRatio="xMidYMid slice">
              <path
                d="M30 0v400M90 0v400"
                stroke="#a58660"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                className="esc-rungs"
                d="M30 20h60M30 70h60M30 120h60M30 170h60M30 220h60M30 270h60M30 320h60M30 370h60"
                stroke="#8a6b4d"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="esc-controls">
        <div className="esc-story" aria-live="polite">
          {holdLines.map((line, i) => (
            <p
              key={i}
              className={i < shown ? "" : "esc-hidden"}
              aria-hidden={i < shown ? undefined : true}
            >
              {line[language]}
            </p>
          ))}
        </div>
        {down ? (
          <p className="esc-count">{c.descending[language]}</p>
        ) : (
          <HoldButton
            ms={2500}
            hold={c.holdExtract}
            tap={c.tapExtract}
            language={language}
            onDone={() => setDown(true)}
            onProgress={setProgress}
          />
        )}
      </div>
    </div>
  );
}
