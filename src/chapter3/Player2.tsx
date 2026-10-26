import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { c } from "./content";
import type { Player2State, Player2Event } from "./state";
import { Hub } from "./Hub";
import { TitleScreen } from "./TitleScreen";
import { MoonLoading } from "./MoonLoading";
import { Achievements } from "./Achievements";
import { Farm } from "./Farm";
import { KarolMode } from "./KarolMode";
import { Extraction } from "./Extraction";
import "./chapter3.css";
const SundayExperience = lazy(() => import("../sunday/SundayExperience"));
import { c as sundayCopy } from "../sunday/content";
export type Scene =
  | "title"
  | "hub"
  | "mode"
  | "extraction"
  | "farm"
  | "ending"
  | "sunday";
export type SceneProps = {
  language: Language;
  state: Player2State;
  dispatch: (e: Player2Event) => void;
  onLanguage: (l: Language) => void;
};
export function Player2({
  language,
  state,
  dispatch,
  onExit,
  onLanguage,
}: {
  language: Language;
  state: Player2State;
  dispatch: (e: Player2Event) => void;
  onLanguage: (l: Language) => void;
  onExit: () => void;
}) {
  const [scene, setScene] = useState<Scene>("title");
  const [pending, setPending] = useState<Scene | null>(null);
  const reduced = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  const last = useRef<"mode" | "extraction" | "farm" | "ending" | "sunday">(
    "mode",
  );
  const buttons = useRef<Partial<Record<Scene, HTMLButtonElement | null>>>({});
  useEffect(() => {
    if (pending) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (scene === "hub" && buttons.current[last.current])
      buttons.current[last.current]?.focus({ preventScroll: true });
    else heading.current?.focus({ preventScroll: true });
  }, [scene, pending]);
  useEffect(() => {
    if (reduced && pending) {
      setScene(pending);
      setPending(null);
    }
  }, [reduced, pending]);
  const finishLoading = useCallback(() => {
    if (pending) {
      setScene(pending);
      setPending(null);
    }
  }, [pending]);
  function enter(next: Scene) {
    if (next !== "title" && next !== "hub") last.current = next;
    if (scene === "title" && next === "hub" && !reduced) setPending(next);
    else setScene(next);
  }
  const titles = {
    title: c.continueTitle,
    hub: c.hub,
    mode: c.mode,
    extraction: c.extraction,
    farm: c.farm,
    ending: c.ending,
    sunday: sundayCopy.title,
  };
  if (scene === "sunday")
    return (
      <Suspense
        fallback={
          <main>
            <p>{sundayCopy.loading[language]}</p>
            <button onClick={() => enter("hub")}>
              {sundayCopy.hub[language]}
            </button>
          </main>
        }
      >
        <SundayExperience
          language={language}
          onLanguage={onLanguage}
          onExit={() => enter("hub")}
          onMuseum={onExit}
        />
      </Suspense>
    );
  return (
    <main className={`player2 p2-${scene}`}>
      <header className="p2-header">
        <span>
          {c.chapter[language]} / {c.title[language]}
        </span>
        <h1 ref={heading} tabIndex={-1}>
          {titles[pending || scene][language]}
        </h1>
        {scene !== "title" && scene !== "hub" && !pending && (
          <button className="p2-link" onClick={() => enter("hub")}>
            ← {c.back[language]}
          </button>
        )}
      </header>
      {pending ? (
        <MoonLoading language={language} onDone={finishLoading} />
      ) : scene === "title" ? (
        <TitleScreen
          language={language}
          onChoose={() => {
            dispatch({ type: "choose" });
            enter("hub");
          }}
        />
      ) : scene === "hub" ? (
        <Hub
          language={language}
          state={state}
          onEnter={enter}
          buttons={buttons}
        />
      ) : scene === "farm" ? (
        <Farm
          language={language}
          state={state}
          dispatch={dispatch}
          onLanguage={onLanguage}
        />
      ) : scene === "mode" ? (
        <KarolMode
          language={language}
          state={state}
          dispatch={dispatch}
          onLanguage={onLanguage}
        />
      ) : scene === "extraction" ? (
        <Extraction
          language={language}
          state={state}
          dispatch={dispatch}
          onLanguage={onLanguage}
        />
      ) : (
        <Achievements
          language={language}
          state={state}
          dispatch={dispatch}
          onLanguage={onLanguage}
          onReplay={() => enter("hub")}
        />
      )}
      {!pending && (scene === "title" || scene === "hub") && (
        <button className="p2-link p2-exit" onClick={onExit}>
          ← {c.exit[language]}
        </button>
      )}
    </main>
  );
}
