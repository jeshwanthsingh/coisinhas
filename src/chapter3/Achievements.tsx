import { useEffect, useRef, useState } from "react";
import type { SceneProps } from "./Player2";
import { useReducedMotion } from "../hooks/useMuseumState";
import { achievements } from "./state";
import { c, achievementCopy } from "./content";
import { Controller } from "./Artwork";
export function Achievements({
  language,
  state,
  dispatch,
  onReplay,
}: SceneProps & { onReplay: () => void }) {
  const [credits, setCredits] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const earned = achievements(state);
  const creditsHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (credits) creditsHeading.current?.focus({ preventScroll: true });
  }, [credits]);
  return (
    <section className="p2-scene">
      {!credits ? (
        <>
          <p className="p2-intro">{c.achievementIntro[language]}</p>
          <ul className="p2-achievements">
            {(Object.keys(earned) as (keyof typeof earned)[]).map((id) => (
              <li key={id} className={earned[id] ? "earned" : "unearned"}>
                <span aria-hidden="true">
                  {id === "hug" ? "🔒" : earned[id] ? "✦" : "◇"}
                </span>
                <div>
                  <h2>{achievementCopy[id][language]}</h2>
                  {id !== "hug" && (
                    <small>
                      {(earned[id] ? c.earned : c.unearned)[language]}
                    </small>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="p2-center">
            <button
              className="p2-primary"
              onClick={() => {
                setCredits(true);
                dispatch({ type: "credits" });
              }}
            >
              {c.credits[language]} ↓
            </button>
          </div>
        </>
      ) : (
        <div className={`p2-credits ${paused ? "paused" : ""}`}>
          <h2 ref={creditsHeading} tabIndex={-1} className="sr-only">
            {c.credits[language]}
          </h2>
          <Controller />
          <div className="p2-credit-lines">
            {(
              [
                "creditsCampaign",
                "creditsOne",
                "creditsTwo",
                "creditsLast",
              ] as const
            ).map((id, i) => (
              <p key={id} style={{ animationDelay: `${i * 2}s` }}>
                {c[id][language]}
              </p>
            ))}
          </div>
          {!reduced && (
            <button className="p2-link" onClick={() => setPaused((p) => !p)}>
              {(paused ? c.resumeCredits : c.pauseCredits)[language]}
            </button>
          )}
          <button className="p2-link p2-replay" onClick={onReplay}>
            {c.replay[language]} ↗
          </button>
        </div>
      )}
    </section>
  );
}
