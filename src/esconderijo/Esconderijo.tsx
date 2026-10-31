import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion, useSaved } from "../hooks/useMuseumState";
import {
  KEY,
  advanceEsconderijo,
  endingDue,
  freshEsconderijo,
  hasNew,
  prune,
  upgrade,
  validEsconderijo,
  type EsconderijoEvent,
  type SavedEsconderijo,
} from "./state";
import type { Card } from "./cards";
import { published } from "./published";
import { c, endingLines } from "./content";
import { RoomArt } from "./Artwork";
import { crateSpot } from "./iso";
import { Crate } from "./Crate";
import { CardDialog } from "./CardDialog";
import { Arrival } from "./Arrival";
import "./esconderijo.css";
const ids = published.map((card) => card.id);
type Scene = "arrival" | "room" | "ending";
function Lines({
  language,
  action,
  onDone,
}: {
  language: Language;
  action: string;
  onDone: () => void;
}) {
  const [count, setCount] = useState(1);
  const reduced = useReducedMotion();
  const visible = reduced ? endingLines.length : count;
  return (
    <div className="esc-story">
      <div aria-live="polite">
        {endingLines.slice(0, visible).map((line, i) => (
          <p key={i}>{line[language]}</p>
        ))}
      </div>
      {visible < endingLines.length ? (
        <button className="esc-next" onClick={() => setCount((n) => n + 1)}>
          {c.next[language]} <span aria-hidden="true">→</span>
        </button>
      ) : (
        <>
          <p className="esc-signature">{c.signature[language]}</p>
          <button className="esc-next" onClick={onDone}>
            {action} <span aria-hidden="true">→</span>
          </button>
        </>
      )}
    </div>
  );
}
export default function Esconderijo({
  language,
  onLanguage,
  onExit,
}: {
  language: Language;
  onLanguage: (l: Language) => void;
  onExit: () => void;
}) {
  const [saved, setSaved] = useSaved<SavedEsconderijo>(
    KEY,
    freshEsconderijo(),
    validEsconderijo,
  );
  const state = prune(upgrade(saved), ids);
  const dispatch = useCallback(
    (e: EsconderijoEvent) =>
      setSaved((old) => advanceEsconderijo(prune(upgrade(old), ids), e)),
    [setSaved],
  );
  const [scene, setScene] = useState<Scene>(
    state.arrivalDone ? "room" : "arrival",
  );
  const [open, setOpen] = useState(false);
  const [warmIn, setWarmIn] = useState(false);
  const [card, setCard] = useState<Card | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [scene]);
  const fresh = hasNew(state, ids);
  const arrived = useCallback(() => {
    dispatch({ type: "arrival" });
    setWarmIn(true);
    setOpen(true);
    setScene("room");
  }, [dispatch]);
  function closeCard() {
    setCard(null);
    if (endingDue(state, ids)) {
      dispatch({ type: "ending" });
      setScene("ending");
    }
  }
  return (
    <main className="esc">
      <header className="esc-header">
        <button className="esc-text" onClick={onExit}>
          ← {c.hub[language]}
        </button>
        <h1 ref={heading} tabIndex={-1}>
          {c.title[language]}
        </h1>
      </header>
      {scene === "arrival" ? (
        <div className="esc-world">
          <Arrival language={language} onDone={arrived} />
        </div>
      ) : (
        <div className="esc-world">
          <div
            className={`esc-stage ${warmIn ? "esc-warm-in" : ""}`}
            role="group"
            aria-label={c.roomAlt[language]}
          >
            <RoomArt
              glow={fresh}
              awake={scene === "ending"}
              dim={scene === "ending"}
              warm={state.ending15Seen}
              close={scene === "ending"}
            />
            {scene === "room" && (
              <button
                className={`esc-crate-btn ${fresh ? "esc-glow" : ""}`}
                style={{ left: `${crateSpot.x}%`, top: `${crateSpot.y}%` }}
                aria-expanded={open}
                aria-label={open ? c.crateClose[language] : c.crate[language]}
                onClick={() => setOpen((o) => !o)}
              />
            )}
          </div>
          <section className="esc-controls" key={scene}>
            {scene === "room" && (
              <>
                <p className="esc-roomline">{c.roomLine[language]}</p>
                {fresh && (
                  <p className="esc-new" role="status">
                    {c.newInStash[language]}
                  </p>
                )}
                {open && (
                  <Crate
                    cards={published}
                    seen={state.seen}
                    language={language}
                    onCard={(next) => {
                      dispatch({ type: "open", id: next.id });
                      setCard(next);
                    }}
                  />
                )}
                <div className="esc-quiet">
                  {state.ending15Seen && (
                    <button
                      className="esc-text esc-note"
                      onClick={() => setScene("ending")}
                    >
                      ✎ {c.note[language]}
                    </button>
                  )}
                  <button
                    className="esc-text"
                    onClick={() => {
                      setWarmIn(false);
                      setScene("arrival");
                    }}
                  >
                    ↑ {c.replay[language]}
                  </button>
                </div>
              </>
            )}
            {scene === "ending" && (
              <Lines
                language={language}
                action={c.backToRoom[language]}
                onDone={() => setScene("room")}
              />
            )}
          </section>
        </div>
      )}
      {card && (
        <CardDialog
          card={card}
          language={language}
          onLanguage={onLanguage}
          onFlip={(id) => dispatch({ type: "flip", id })}
          onClose={closeCard}
        />
      )}
    </main>
  );
}
