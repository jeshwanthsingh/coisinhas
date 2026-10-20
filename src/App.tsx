import { useCallback, useRef, useState } from "react";
import { words } from "./content/museumContent";
import type { ObjectId } from "./content/museumContent";
import { AfterHours } from "./chapter/AfterHours";
import { chapterCopy } from "./chapter/content";
import { freshChapter, validChapter, advanceChapter } from "./chapter/state";
import type { ChapterEvent } from "./chapter/state";
import { useMuseumState, useSaved } from "./hooks/useMuseumState";
import { MuseumRoom } from "./components/MuseumRoom";
import { ObjectCard } from "./components/ObjectCard";
import { ProgressCounter } from "./components/ProgressCounter";
import { UnfinishedRoom } from "./components/UnfinishedRoom";

import { Player2 } from "./chapter3/Player2";
import {
  freshPlayer2,
  validPlayer2,
  advance,
  type Player2Event,
} from "./chapter3/state";
import { c as playerCopy } from "./chapter3/content";

export default function App() {
  const { language, setLanguage, found, discover, secretTaps, setSecretTaps } =
    useMuseumState();
  const [chapter, setChapter] = useSaved(
    "coisinhas.after-hours.v1",
    freshChapter(),
    validChapter,
  );
  const dispatchChapter = useCallback(
    (event: ChapterEvent) => setChapter((old) => advanceChapter(old, event)),
    [setChapter],
  );
  const unlockChapter = useCallback(
    () => dispatchChapter({ type: "unlock" }),
    [dispatchChapter],
  );
  const [player, setPlayer] = useSaved(
    "coisinhas.player2.v1",
    freshPlayer2(),
    validPlayer2,
  );
  const dispatchPlayer = useCallback(
    (event: Player2Event) => setPlayer((old) => advance(old, event)),
    [setPlayer],
  );
  const [playerView, setPlayerView] = useState(false);
  function enterPlayer() {
    if (!chapter.letter) return;
    setEntered(true);
    setAfterHours(false);
    setQuiet(false);
    setPlayerView(true);
  }
  const [afterHours, setAfterHours] = useState(false);
  const [returningVisitor] = useState(() => found.length === 6);
  function enterChapter() {
    dispatchChapter({ type: "visit" });
    setEntered(true);
    setAfterHours(true);
    setQuiet(false);
  }
  const [entered, setEntered] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [card, setCard] = useState<ObjectId | "secret" | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const closeCard = useCallback(() => setCard(null), []);
  function secret() {
    const next = Math.min(secretTaps + 1, 5);
    setSecretTaps(next);
    if (next === 5) setCard("secret");
  }
  return (
    <div
      className={`app ${entered ? "has-entered" : "opening"} ${quiet ? "quiet" : ""}`}
    >
      <header className="site-header">
        <div className="wordmark">
          {words.brand[language]}
          <span>{words.tagline[language]}</span>
        </div>
        <div
          className="language-toggle"
          role="group"
          aria-label={words.language[language]}
        >
          <button
            aria-pressed={language === "pt"}
            lang="pt-BR"
            onClick={() => setLanguage("pt")}
          >
            PT
          </button>
          <span>/</span>
          <button
            aria-pressed={language === "en"}
            lang="en"
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </header>
      {playerView ? (
        <Player2
          language={language}
          onLanguage={setLanguage}
          state={player}
          dispatch={dispatchPlayer}
          onExit={() => setPlayerView(false)}
        />
      ) : afterHours ? (
        <AfterHours
          onPlayer2={enterPlayer}
          language={language}
          onLanguage={setLanguage}
          state={chapter}
          dispatch={dispatchChapter}
          onExit={() => {
            setAfterHours(false);
            setQuiet(false);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      ) : quiet ? (
        <UnfinishedRoom
          onUnlock={unlockChapter}
          onAfterHours={enterChapter}
          language={language}
          onBack={() => {
            setQuiet(false);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      ) : (
        <main className={entered ? "museum-layout" : "opening-layout"}>
          <div className="room-heading">
            <span className="eyebrow">
              {entered ? words.roomLabel[language] : "EST. · 2026"}
            </span>
            <h1 ref={title} tabIndex={-1}>
              {entered ? words.roomName[language] : words.brand[language]}
            </h1>
            <p>
              {entered ? words.welcome[language] : words.subtitle[language]}
            </p>
          </div>
          <MuseumRoom
            language={language}
            entered={entered}
            found={found}
            blocked={card !== null}
            onDiscover={(id) => {
              discover(id);
              setCard(id);
            }}
            onDoor={() => setQuiet(true)}
            onSecret={secret}
          />
          {!entered ? (
            <div className="opening-copy">
              <span className="tiny-star" aria-hidden="true">
                ✧
              </span>
              <p>{words.intro[language]}</p>
              <button
                className="primary-button"
                onClick={() => {
                  setEntered(true);
                  title.current?.focus();
                }}
              >
                {words.enter[language]}
                <span aria-hidden="true">↗</span>
              </button>
              <span className="opening-footnote">
                {words.instruction[language]}
              </span>
            </div>
          ) : (
            <footer className="museum-footer">
              <div className="explore-hint">
                <span aria-hidden="true">✧</span>
                {words.instruction[language]}
              </div>
              <ProgressCounter count={found.length} language={language} />
              {found.length === 6 && (
                <button
                  className="text-button unlocked-link"
                  onClick={() => setQuiet(true)}
                >
                  {words.door[language]} <span aria-hidden="true">↗</span>
                </button>
              )}
            </footer>
          )}
        </main>
      )}
      {!quiet &&
        !afterHours &&
        !playerView &&
        (returningVisitor || chapter.unlocked) && (
          <button
            className="text-button chapter-shortcut"
            onClick={enterChapter}
          >
            ✧ {chapterCopy.shortcut[language]}
          </button>
        )}
      {!quiet && !afterHours && !playerView && chapter.letter && (
        <button className="text-button chapter-shortcut" onClick={enterPlayer}>
          ✧ {playerCopy.shortcut[language]}
        </button>
      )}
      {!quiet && !afterHours && !playerView && (
        <div className="room-caption" aria-hidden="true">
          <span>01 — 02</span>
          <span>{words.endingLabel[language]}</span>
          <span>☾</span>
        </div>
      )}
      {card && (
        <ObjectCard
          key={card}
          id={card}
          language={language}
          onClose={closeCard}
          onLanguage={setLanguage}
        />
      )}
    </div>
  );
}
