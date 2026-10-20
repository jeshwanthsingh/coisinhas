import { useEffect, useState } from "react";
import type { SceneProps } from "./Player2";
import { useReducedMotion } from "../hooks/useMuseumState";
import { c, dailyNotes, cutscenes } from "./content";
import { milestones, type Milestone } from "./state";
import { karolDate } from "./time";
import { TreeArt } from "./Artwork";
import { Dialog } from "./Dialog";
export function Farm({ language, state, dispatch, onLanguage }: SceneProps) {
  const [today, setToday] = useState(() => karolDate(new Date()));
  const [card, setCard] = useState<"gift" | Milestone | null>(null);
  const [line, setLine] = useState(1);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setToday(karolDate(new Date()));
    const timer = setInterval(update, 30000);
    window.addEventListener("focus", update);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", update);
    };
  }, []);
  useEffect(() => {
    if (typeof card !== "number" || line >= cutscenes[card].length || reduced)
      return;
    const timer = setTimeout(() => setLine((n) => n + 1), 2200);
    return () => clearTimeout(timer);
  }, [card, line, reduced]);
  const canWater =
    state.treeStage < 28 && (!state.lastWatered || today > state.lastWatered);
  return (
    <section className="p2-scene">
      <p className="p2-intro">{c.gardenIntro[language]}</p>
      <div className="p2-tree">
        <TreeArt stage={state.treeStage} />
      </div>
      <p className="p2-progress">
        {c.growth[language]} <b>{state.treeStage}/28</b>
      </p>
      <div className="p2-center">
        <button
          className="p2-primary"
          disabled={!canWater}
          onClick={() => {
            const date = karolDate(new Date());
            setToday(date);
            dispatch({ type: "water", date });
          }}
        >
          {
            (state.treeStage === 28
              ? c.seasonDone
              : canWater
                ? c.water
                : c.watered)[language]
          }
        </button>
        <p className="p2-daily" role="status">
          {state.treeStage
            ? dailyNotes[state.treeStage - 1][language]
            : c.gardenWaiting[language]}
        </p>
      </div>
      <section className="p2-friendship">
        <h2>{c.friendship[language]}</h2>
        <div
          className="p2-hearts"
          role="img"
          aria-label={`${c.friendship[language]}: ${state.hearts}/10`}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={i < state.hearts ? "filled" : ""}
            >
              ♥
            </span>
          ))}
        </div>
        <p>{c.heartsHint[language]}</p>
        <h3>{c.memories[language]}</h3>
        <div className="p2-chips">
          {milestones.map((n) => (
            <button
              key={n}
              disabled={state.hearts < n}
              aria-label={`${c.memory[language]} · ${n} ${c.heartLock[language]}`}
              onClick={() => {
                setLine(1);
                setCard(n);
              }}
            >
              {n} ♡ {state.cutscenesSeen.includes(n) ? "✦" : ""}
            </button>
          ))}
        </div>
      </section>
      <button
        className="p2-gift"
        onClick={() => {
          dispatch({ type: "gift" });
          setCard("gift");
        }}
      >
        <span aria-hidden="true">▧</span>
        {c.gift[language]} ↗
      </button>
      {card !== null && (
        <Dialog
          language={language}
          onLanguage={onLanguage}
          title={(card === "gift" ? c.gift : c.memory)[language]}
          onClose={() => setCard(null)}
        >
          {card === "gift" ? (
            <p className="p2-letter-body">{c.giftBody[language]}</p>
          ) : (
            <div className="p2-cutscene">
              {cutscenes[card]
                .slice(0, reduced ? undefined : line)
                .map((text, i) => (
                  <p key={i}>{text[language]}</p>
                ))}
              {!reduced && line < cutscenes[card].length ? (
                <button
                  className="p2-link"
                  onClick={() => setLine((n) => n + 1)}
                >
                  {c.next[language]} →
                </button>
              ) : (
                <button
                  className="p2-link"
                  onClick={() => {
                    dispatch({ type: "cutscene", id: card });
                    setCard(null);
                  }}
                >
                  {c.remembered[language]} ✧
                </button>
              )}
            </div>
          )}
        </Dialog>
      )}
    </section>
  );
}
