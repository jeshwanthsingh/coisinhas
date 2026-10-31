import { useCallback, useEffect, useRef, useState } from "react";
import { words } from "./content/museumContent";
import type { ObjectId } from "./content/museumContent";
import { AfterHours } from "./chapter/AfterHours";
import { freshChapter, validChapter, advanceChapter } from "./chapter/state";
import type { ChapterEvent } from "./chapter/state";
import { useMuseumState, useSaved } from "./hooks/useMuseumState";
import { MuseumRoom } from "./components/MuseumRoom";
import { ObjectCard } from "./components/ObjectCard";
import { ProgressCounter } from "./components/ProgressCounter";
import { UnfinishedRoom } from "./components/UnfinishedRoom";

import { Player2 } from "./chapter3/Player2";
import { sceneFor } from "./chapter3/scene";
import { MapaButton } from "./nav/MapaButton";
import { doorNames } from "./nav/content";
import {
  NAV_KEY,
  accessFor,
  freshNav,
  hashFor,
  markPlace,
  resolvePlace,
  validNav,
  visiblePlaces,
  type Place,
} from "./nav/places";
import {
  freshPlayer2,
  validPlayer2,
  advance,
  type Player2Event,
} from "./chapter3/state";

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
  const [nav, setNav] = useSaved(NAV_KEY, freshNav(), validNav);
  const [returningVisitor] = useState(() => found.length === 6);
  const access = accessFor(
    {
      legacy: returningVisitor,
      unlocked: chapter.unlocked,
      letter: chapter.letter,
    },
    nav,
  );
  const [boot] = useState(() => resolvePlace(window.location.hash, access));
  const [place, setPlace] = useState<Place>(boot);
  const [p2, setP2] = useState(() => ({
    scene: sceneFor(boot, player.slot),
    key: 0,
  }));
  const [playerView, setPlayerView] = useState(
    boot === "jogador2" || boot === "domingo" || boot === "esconderijo",
  );
  const [afterHours, setAfterHours] = useState(boot === "depois");
  const [entered, setEntered] = useState(boot !== "museu");
  const [quiet, setQuiet] = useState(false);
  function show(next: Place) {
    setPlace(next);
    setQuiet(false);
    if (next === "museu") {
      setAfterHours(false);
      setPlayerView(false);
      return;
    }
    setEntered(true);
    if (next === "depois") {
      dispatchChapter({ type: "visit" });
      setAfterHours(true);
      setPlayerView(false);
      return;
    }
    setAfterHours(false);
    setPlayerView(true);
    setP2((old) => ({ scene: sceneFor(next, player.slot), key: old.key + 1 }));
  }
  function go(next: Place) {
    if (next === place) return;
    if (window.location.hash !== hashFor(next))
      window.history.pushState(null, "", hashFor(next));
    show(next);
  }
  // Player2 reports its place; a change of place (not an in-chapter step) adds a history entry.
  const reportPlace = useCallback(
    (next: Place) => {
      setPlace(next);
      if (window.location.hash !== hashFor(next))
        window.history.pushState(null, "", hashFor(next));
    },
    [setPlace],
  );
  const latest = useRef({ show, access, place });
  latest.current = { show, access, place };
  useEffect(() => {
    if (boot === "depois") dispatchChapter({ type: "visit" });
    if (window.location.hash && window.location.hash !== hashFor(boot))
      window.history.replaceState(null, "", hashFor(boot));
    const onHash = () => {
      const l = latest.current;
      const target = resolvePlace(window.location.hash, l.access);
      if (window.location.hash !== hashFor(target))
        window.history.replaceState(null, "", hashFor(target));
      if (target !== l.place) l.show(target);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [boot, dispatchChapter]);
  useEffect(() => setNav((old) => markPlace(old, place)), [place, setNav]);
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
        <div className="header-tools">
          <MapaButton
            language={language}
            onLanguage={setLanguage}
            current={place}
            list={visiblePlaces(access)}
            onGo={go}
          />
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
        </div>
      </header>
      {playerView ? (
        <Player2
          language={language}
          onLanguage={setLanguage}
          state={player}
          dispatch={dispatchPlayer}
          onExit={() => go("museu")}
          initialScene={p2.scene}
          key={p2.key}
          onPlace={reportPlace}
          onDepois={access.depois ? () => go("depois") : undefined}
        />
      ) : afterHours ? (
        <AfterHours
          onPlayer2={() => go("jogador2")}
          language={language}
          onLanguage={setLanguage}
          state={chapter}
          dispatch={dispatchChapter}
          onExit={() => {
            go("museu");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      ) : quiet ? (
        <UnfinishedRoom
          onUnlock={unlockChapter}
          onAfterHours={() => go("depois")}
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
            <nav className="doors">
              {(
                [
                  access.depois && "depois",
                  access.jogador2 && "jogador2",
                  nav.opened.includes("domingo") && "domingo",
                  nav.opened.includes("esconderijo") && "esconderijo",
                ] as const
              ).map(
                (door) =>
                  door && (
                    <button key={door} onClick={() => go(door)}>
                      ✧ {doorNames[door][language]}
                    </button>
                  ),
              )}
            </nav>
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
