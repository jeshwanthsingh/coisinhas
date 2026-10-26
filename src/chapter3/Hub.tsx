import { useEffect, useState, type RefObject } from "react";
import type { Language } from "../content/museumContent";
import type { Scene } from "./Player2";
import { c } from "./content";
import {
  needsFull,
  farmComplete,
  endingReady,
  progressCount,
  type Player2State,
} from "./state";
import { clockTime, greeting, SF_ZONE, KAROL_ZONE } from "./time";
import { SundayEntry } from "../sunday/Entry";
import { HubArt } from "./Artwork";
export function Hub({
  language,
  state,
  onEnter,
  buttons,
}: {
  language: Language;
  state: Player2State;
  onEnter: (scene: Scene) => void;
  buttons: RefObject<Partial<Record<Scene, HTMLButtonElement | null>>>;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const update = () => setNow(new Date());
    const timer = setInterval(update, 30000);
    window.addEventListener("focus", update);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", update);
    };
  }, []);
  return (
    <>
      <p className="p2-greeting">{c[greeting(now)][language]}</p>
      <div className="p2-clocks">
        <span>
          {c.sf[language]} <time>{clockTime(now, SF_ZONE)}</time>
        </span>
        <span>
          {c.curitiba[language]} <time>{clockTime(now, KAROL_ZONE)}</time>
        </span>
      </div>
      <div className="p2-hub-art">
        <HubArt />
        {(["mode", "extraction", "farm"] as const).map((id, i) => (
          <button
            className={`p2-hub-object p2-object-${id}`}
            key={id}
            aria-label={c[id][language]}
            ref={(node) => {
              buttons.current[id] = node;
            }}
            onClick={() => onEnter(id)}
          >
            <span>{c[id][language]}</span>
            <i aria-hidden="true">
              {[needsFull(state), state.extracted, farmComplete(state)][i]
                ? "✦"
                : "✧"}
            </i>
          </button>
        ))}
      </div>
      <nav className="p2-hub-nav" aria-label={c.title[language]}>
        {(["mode", "extraction", "farm"] as const).map((id) => (
          <button key={id} onClick={() => onEnter(id)}>
            {c[id][language]}
          </button>
        ))}
      </nav>
      <p className="p2-progress" role="status">
        {c.progress[language]} <b>{progressCount(state)}/3</b>
      </p>
      <SundayEntry
        language={language}
        onEnter={() => onEnter("sunday")}
        buttonRef={(node) => {
          buttons.current.sunday = node;
        }}
      />
      <button
        className="p2-ending-link"
        disabled={!endingReady(state)}
        onClick={() => onEnter("ending")}
        ref={(node) => {
          buttons.current.ending = node;
        }}
      >
        {endingReady(state) ? c.ending[language] : c.locked[language]}
      </button>
    </>
  );
}
