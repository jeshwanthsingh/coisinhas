import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import { ObjectArt } from "../components/ObjectArt";
import { chapterCopy as c } from "./content";
import { letterReady } from "./state";
import type { ChapterState, ChapterEvent } from "./state";
import { AfterHoursArtwork, RadioArt, AtlasArt, EnvelopeArt } from "./Artwork";
import { Radio } from "./Radio";
import { Windows } from "./Windows";
import { Atlas } from "./Atlas";
import { Letter } from "./Letter";
import { Certificate } from "./Certificate";
import "./chapter.css";
type Scene = "room" | "radio" | "windows" | "atlas" | "letter";
export function AfterHours({
  language,
  state,
  dispatch,
  onExit,
  onLanguage,
}: {
  language: Language;
  onLanguage: (language: Language) => void;
  state: ChapterState;
  dispatch: (event: ChapterEvent) => void;
  onExit: () => void;
}) {
  const [scene, setScene] = useState<Scene>("room");
  const [drawer, setDrawer] = useState(state.secret);
  const [certificate, setCertificate] = useState(false);
  const last = useRef<Exclude<Scene, "room">>("radio");
  const heading = useRef<HTMLHeadingElement>(null);
  const sceneButtons = useRef<Partial<Record<Scene, HTMLButtonElement | null>>>(
    {},
  );
  const ready = letterReady(state);
  const count =
    Number(state.stations.length === 3) +
    Number(state.windows) +
    Number(state.unnamed);
  const closeCertificate = useCallback(() => setCertificate(false), []);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [scene]);
  function enter(next: Exclude<Scene, "room">) {
    last.current = next;
    setScene(next);
    if (next === "radio") dispatch({ type: "station", id: "dengo" });
  }
  function back() {
    setScene("room");
    requestAnimationFrame(() =>
      sceneButtons.current[last.current]?.focus({ preventScroll: true }),
    );
  }
  const titles = {
    room: c.name,
    radio: c.radio,
    windows: c.windows,
    atlas: c.atlas,
    letter: c.letter,
  };
  return (
    <main
      className={`after-hours ${state.letter ? "after-warm" : ""} scene-${scene}`}
    >
      <header className="chapter-header">
        <span className="eyebrow">{c.eyebrow[language]}</span>
        <h1 ref={heading} tabIndex={-1}>
          {titles[scene][language]}
        </h1>
        {scene === "room" ? (
          <p>{c.intro[language]}</p>
        ) : (
          <button className="text-button scene-back" onClick={back}>
            ← {c.back[language]}
          </button>
        )}
      </header>
      {scene === "room" ? (
        <>
          <div className="after-room">
            <AfterHoursArtwork warm={state.letter} />
            <button
              ref={(node) => {
                sceneButtons.current.radio = node;
              }}
              className={`after-object room-radio ${state.stations.length === 3 ? "scene-done" : ""}`}
              onClick={() => enter("radio")}
              aria-label={c.radio[language]}
            >
              <RadioArt />
              <span>{c.radio[language]}</span>
            </button>
            <button
              ref={(node) => {
                sceneButtons.current.windows = node;
              }}
              className={`after-object room-window ${state.windows ? "scene-done" : ""}`}
              onClick={() => enter("windows")}
              aria-label={c.windows[language]}
            >
              <span className="window-invitation" aria-hidden="true">
                ✧
              </span>
              <span>{c.windows[language]}</span>
            </button>
            <button
              ref={(node) => {
                sceneButtons.current.atlas = node;
              }}
              className={`after-object room-atlas ${state.unnamed ? "scene-done" : ""}`}
              onClick={() => enter("atlas")}
              aria-label={c.atlas[language]}
            >
              <AtlasArt />
              <span>{c.atlas[language]}</span>
            </button>
            <button
              ref={(node) => {
                sceneButtons.current.letter = node;
              }}
              className={`after-object room-letter ${ready ? "letter-lit" : ""}`}
              disabled={!ready}
              onClick={() => enter("letter")}
              aria-label={ready ? c.letter[language] : c.letterLocked[language]}
            >
              <EnvelopeArt />
              <span>{c.letter[language]}</span>
            </button>
            <button
              className="after-object after-cat"
              onClick={() => setDrawer(true)}
              aria-label={c.cat[language]}
            >
              <ObjectArt id="cat" />
              <i className="collar-star" aria-hidden="true">
                ✧
              </i>
            </button>
          </div>
          <div className="after-room-footer">
            <p className="room-whisper">{c.roomHint[language]}</p>
            <p className="chapter-progress" role="status">
              {c.progress[language]} <b>{count}/3</b>
            </p>
            <nav className="room-object-links" aria-label={c.name[language]}>
              <button onClick={() => enter("radio")}>
                {c.radio[language]} {state.stations.length === 3 ? "·" : ""}
              </button>
              <button onClick={() => enter("windows")}>
                {c.windows[language]} {state.windows ? "·" : ""}
              </button>
              <button onClick={() => enter("atlas")}>
                {c.atlas[language]} {state.unnamed ? "·" : ""}
              </button>
            </nav>
            {ready && (
              <button
                className="text-button letter-invitation"
                onClick={() => enter("letter")}
              >
                {c.letterReady[language]} ↗
              </button>
            )}
            {drawer && (
              <button
                className="little-drawer"
                onClick={() => {
                  setCertificate(true);
                  dispatch({ type: "secret" });
                }}
              >
                <span aria-hidden="true">✧</span>
                {c.drawer[language]}
              </button>
            )}
            {state.letter && (
              <div className="chapter-final">
                <p>{c.final[language]}</p>
                <small>{c.roomStatus[language]}</small>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="chapter-scene" key={scene}>
          {scene === "radio" && (
            <Radio
              language={language}
              found={state.stations}
              onStation={(id) => dispatch({ type: "station", id })}
            />
          )}
          {scene === "windows" && (
            <Windows
              language={language}
              completed={state.windows}
              onComplete={() => dispatch({ type: "windows" })}
            />
          )}
          {scene === "atlas" && (
            <Atlas
              language={language}
              found={state.constellations}
              unnamed={state.unnamed}
              onStar={(id) => dispatch({ type: "constellation", id })}
              onUnnamed={() => dispatch({ type: "unnamed" })}
            />
          )}
          {scene === "letter" && (
            <Letter
              language={language}
              onComplete={() => dispatch({ type: "letter" })}
            />
          )}
          <button className="text-button bottom-back" onClick={back}>
            ← {c.back[language]}
          </button>
        </div>
      )}
      {scene === "room" && (
        <button className="text-button exit-after" onClick={onExit}>
          ← {c.museum[language]}
        </button>
      )}
      {certificate && (
        <Certificate
          language={language}
          onLanguage={onLanguage}
          onClose={closeCertificate}
        />
      )}
    </main>
  );
}
