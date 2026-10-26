import { useEffect, useRef, useState, useCallback } from "react";
import type { Language } from "../content/museumContent";
import { useSaved } from "../hooks/useMuseumState";
import {
  freshSunday,
  validSunday,
  advanceSunday,
  snapshot,
  type SundayEvent,
  type Activity,
  type Game,
} from "./state";
import { c, openingLines, endingLines } from "./content";
import { SundayApartment } from "./SundayApartment";
import { StoryLines } from "./SundayOpening";
import { SundayMorning } from "./SundayMorning";
import { SundayAfternoon } from "./SundayAfternoon";
import { SundaySunset } from "./SundaySunset";
import { SundayVoice } from "./SundayVoice";
import { SundayPostcard, SavedSunday } from "./SundayPostcard";
import "./sunday.css";
const STORAGE_KEY = "coisinhas.sunday.v1";
export default function SundayExperience({
  language,
  onLanguage,
  onExit,
  onMuseum,
}: {
  language: Language;
  onLanguage: (l: Language) => void;
  onExit: () => void;
  onMuseum: () => void;
}) {
  const [state, setState] = useSaved(STORAGE_KEY, freshSunday(), validSunday);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [gameMode, setGameMode] = useState<Game | null>(null);
  const [resolved, setResolved] = useState(false);
  const [catBetween, setCatBetween] = useState(false);
  const [cassette, setCassette] = useState(false);
  const [review, setReview] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const dispatch = useCallback(
    (e: SundayEvent) => {
      setState((s) => advanceSunday(s, e));
      if (["back", "restart", "to-afternoon", "to-sunset"].includes(e.type)) {
        setActivity(null);
        setGameMode(null);
        setResolved(false);
      }
      if (e.type === "restart") {
        setCatBetween(false);
        setCassette(false);
      }
    },
    [setState],
  );
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [state.scene]);
  const period = ["voice", "postcard", "ending"].includes(state.scene)
    ? "evening"
    : ["sunset", "closeness"].includes(state.scene)
      ? "sunset"
      : state.scene === "afternoon"
        ? "afternoon"
        : "morning";
  const card = snapshot(state);
  function choose(a: Activity | null) {
    setActivity(a);
    setResolved(false);
    setGameMode(null);
  }
  function save() {
    if (!card) return false;
    const next = advanceSunday(state, { type: "save", postcard: card });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setState(next);
      return true;
    } catch {
      return false;
    }
  }
  // Saved choices remain intact while a replayed activity waits for its next action.
  const visualState = {
    ...state,
    plate: activity === "food" && !resolved ? null : state.plate,
    channel: activity === "tv" && !resolved ? null : state.channel,
    game: activity === "game" && !resolved ? null : state.game,
  };
  return (
    <main className={`sunday sun-${period} sun-${state.weather || "sun"}`}>
      <header className="sun-header">
        <button className="sun-text" onClick={onExit}>
          ← {c.hub[language]}
        </button>
        <h1 ref={heading} tabIndex={-1}>
          {state.scene === "opening"
            ? c.title[language]
            : c[state.scene][language]}
        </h1>
        {state.scene === "opening" && <p>{c.subtitle[language]}</p>}
      </header>
      <div className="sun-world">
        <SundayApartment
          state={visualState}
          language={language}
          dispatch={dispatch}
          activity={activity}
          gameMode={gameMode}
          catBetween={catBetween && state.scene !== "ending"}
          onCat={() => setCatBetween(true)}
          onActivity={choose}
          onCassette={() => setCassette(true)}
        />
        <section className="sun-controls" key={state.scene}>
          {state.scene === "opening" && (
            <StoryLines
              lines={openingLines}
              language={language}
              action={c.imagine[language]}
              onDone={() => dispatch({ type: "start" })}
            />
          )}
          {state.scene === "morning" && (
            <SundayMorning
              state={state}
              language={language}
              dispatch={dispatch}
            />
          )}
          {state.scene === "afternoon" && (
            <SundayAfternoon
              state={state}
              language={language}
              dispatch={dispatch}
              activity={activity}
              onActivity={choose}
              gameMode={gameMode}
              onGameMode={(g) => {
                setGameMode(g);
                setResolved(false);
              }}
              resolved={resolved}
              onResolved={() => setResolved(true)}
            />
          )}
          {(state.scene === "sunset" || state.scene === "closeness") && (
            <SundaySunset
              state={state}
              language={language}
              dispatch={dispatch}
              catBetween={catBetween}
            />
          )}
          {state.scene === "voice" && (
            <SundayVoice
              language={language}
              opened={cassette}
              onOpen={() => setCassette(true)}
              onDone={() => dispatch({ type: "postcard" })}
            />
          )}
          {state.scene === "postcard" && card && (
            <>
              <SundayPostcard
                postcard={card}
                language={language}
                onSave={save}
              />
              <button
                className="sun-next"
                onClick={() => dispatch({ type: "finish" })}
              >
                {c.finish[language]}
              </button>
            </>
          )}
          {state.scene === "ending" && (
            <StoryLines
              lines={endingLines}
              language={language}
              final
              action={c.restart[language]}
              onDone={() => dispatch({ type: "restart" })}
              footer={
                <>
                  <p className="sun-signature">{c.signature[language]}</p>
                  <button className="sun-text" onClick={onMuseum}>
                    {c.museum[language]} ↗
                  </button>
                </>
              }
            />
          )}
        </section>
      </div>
      {state.savedPostcard && (
        <button className="sun-text sun-review" onClick={() => setReview(true)}>
          {c.review[language]}
        </button>
      )}
      {state.scene !== "opening" && (
        <button
          className="sun-text sun-back"
          onClick={() => dispatch({ type: "back" })}
        >
          ← {c.back[language]}
        </button>
      )}
      {review && state.savedPostcard && (
        <SavedSunday
          postcard={state.savedPostcard}
          language={language}
          onLanguage={onLanguage}
          onClose={() => setReview(false)}
        />
      )}
    </main>
  );
}
