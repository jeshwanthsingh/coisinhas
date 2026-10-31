import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion, useSaved } from "../hooks/useMuseumState";
import {
  KEY,
  advanceEsconderijo,
  freshEsconderijo,
  hasNew,
  prune,
  validEsconderijo,
  type EsconderijoEvent,
} from "./state";
import type { Card } from "./cards";
import { published } from "./published";
import { c, endingLines, openingLines } from "./content";
import { RoomArt } from "./Artwork";
import { Crate } from "./Crate";
import { CardDialog } from "./CardDialog";
import "./esconderijo.css";
const ids = published.map((card) => card.id);
type Scene = "opening" | "room" | "ending";
function Lines({
  lines,
  language,
  action,
  onDone,
  footer,
}: {
  lines: typeof openingLines;
  language: Language;
  action: string;
  onDone: () => void;
  footer?: React.ReactNode;
}) {
  const [count, setCount] = useState(1);
  const reduced = useReducedMotion();
  const visible = reduced ? lines.length : count;
  return (
    <div className="esc-story">
      <div aria-live="polite">
        {lines.slice(0, visible).map((line, i) => (
          <p key={i}>{line[language]}</p>
        ))}
      </div>
      {visible < lines.length ? (
        <button className="esc-next" onClick={() => setCount((n) => n + 1)}>
          {c.next[language]} <span aria-hidden="true">→</span>
        </button>
      ) : (
        <>
          {footer}
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
  const [saved, setSaved] = useSaved(KEY, freshEsconderijo(), validEsconderijo);
  const state = prune(saved, ids);
  const dispatch = useCallback(
    (e: EsconderijoEvent) =>
      setSaved((old) => advanceEsconderijo(prune(old, ids), e)),
    [setSaved],
  );
  const [scene, setScene] = useState<Scene>(
    state.openingDone ? "room" : "opening",
  );
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState<Card | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [scene]);
  const fresh = hasNew(state, ids);
  function closeCard() {
    setCard(null);
    if (!state.endingSeen && state.seen.length > 0) {
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
      <div className="esc-world">
        <div
          className="esc-stage"
          role="group"
          aria-label={c.roomAlt[language]}
        >
          <RoomArt glow={fresh} />
          {scene === "room" && (
            <button
              className={`esc-crate-btn ${fresh ? "esc-glow" : ""}`}
              aria-expanded={open}
              aria-label={open ? c.crateClose[language] : c.crate[language]}
              onClick={() => setOpen((o) => !o)}
            >
              <span aria-hidden="true">✧</span>
            </button>
          )}
        </div>
        <section className="esc-controls" key={scene}>
          {scene === "opening" && (
            <Lines
              lines={openingLines}
              language={language}
              action={c.toStash[language]}
              onDone={() => {
                dispatch({ type: "opening" });
                setScene("room");
                setOpen(true);
              }}
            />
          )}
          {scene === "room" && (
            <>
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
              {state.endingSeen && (
                <button
                  className="esc-text esc-note"
                  onClick={() => setScene("ending")}
                >
                  ✎ {c.note[language]}
                </button>
              )}
            </>
          )}
          {scene === "ending" && (
            <Lines
              lines={endingLines}
              language={language}
              action={c.backToRoom[language]}
              onDone={() => setScene("room")}
              footer={<p className="esc-signature">{c.signature[language]}</p>}
            />
          )}
        </section>
      </div>
      {card && (
        <CardDialog
          card={card}
          language={language}
          onLanguage={onLanguage}
          onClose={closeCard}
        />
      )}
    </main>
  );
}
