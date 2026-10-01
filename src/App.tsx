import { useCallback, useRef, useState } from "react";
import { words } from "./content/museumContent";
import type { ObjectId } from "./content/museumContent";
import { useMuseumState } from "./hooks/useMuseumState";
import { MuseumRoom } from "./components/MuseumRoom";
import { ObjectCard } from "./components/ObjectCard";
import { ProgressCounter } from "./components/ProgressCounter";
import { UnfinishedRoom } from "./components/UnfinishedRoom";

export default function App() {
  const { language, setLanguage, found, discover, secretTaps, setSecretTaps } =
    useMuseumState();
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
      {quiet ? (
        <UnfinishedRoom
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
      {!quiet && (
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
