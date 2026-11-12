import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion, useSaved } from "../hooks/useMuseumState";
import {
  KEY,
  advanceTradutor,
  endingUnlocked,
  freshTradutor,
  phraseIds,
  validTradutor,
  type PhraseId,
  type TradutorEvent,
} from "./state";
import { arrivalLine, c, endingLines, phrases } from "./content";
import { EyeIcon, LeverArt, MachineArt, WorkshopArt } from "./Artwork";
import "./tradutor.css";
type Scene = "arrival" | "machine" | "ending";
type Phase = "idle" | "gears" | "typing" | "done";
const GEARS_MS = 1200;
const TYPE_MS = 32;
function Ending({
  language,
  onAgain,
}: {
  language: Language;
  onAgain: () => void;
}) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(true);
  const last = endingLines.length - 1;
  const shown = reduced ? last : step;
  useEffect(() => {
    if (reduced || step !== 2) return;
    setReady(false);
    const t = window.setTimeout(() => setReady(true), 2200);
    return () => window.clearTimeout(t);
  }, [step, reduced]);
  return (
    <div className="trad-ending">
      <div aria-live="polite">
        {endingLines.slice(0, shown + 1).map((line, i) => (
          <p
            key={i}
            className={`trad-line ${i === 2 ? "trad-big" : ""} ${!reduced && step === 2 && i !== 2 ? "trad-dim" : ""}`}
          >
            {line[language]}
          </p>
        ))}
      </div>
      {shown < last ? (
        ready && (
          <button className="trad-next" onClick={() => setStep((n) => n + 1)}>
            {c.next[language]} <span aria-hidden="true">→</span>
          </button>
        )
      ) : (
        <>
          <p className="trad-signature">{c.signature[language]}</p>
          <button className="trad-next" onClick={onAgain}>
            ↺ {c.again[language]}
          </button>
        </>
      )}
    </div>
  );
}
export default function Tradutor({
  language,
  onExit,
}: {
  language: Language;
  onLanguage?: (l: Language) => void; // unused: the shared PT/EN toggle in the header drives the language
  onExit: () => void;
}) {
  const reduced = useReducedMotion();
  const [state, setState] = useSaved(KEY, freshTradutor(), validTradutor);
  const dispatch = useCallback(
    (e: TradutorEvent) => setState((old) => advanceTradutor(old, e)),
    [setState],
  );
  const [scene, setScene] = useState<Scene>(
    state.translated.length > 0 ? "machine" : "arrival",
  );
  const [lit, setLit] = useState(false);
  const [shown, setShown] = useState<{
    id: PhraseId;
    animate: boolean;
    n: number;
  } | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(0);
  const [pulls, setPulls] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const lang = useRef(language);
  lang.current = language;
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [scene]);
  useEffect(() => {
    if (!shown) {
      setPhase("idle");
      return;
    }
    if (!shown.animate || reduced) {
      setPhase("done");
      return;
    }
    const len = phrases.find((p) => p.id === shown.id)!.translation[
      lang.current
    ].length;
    setPhase("gears");
    setTyped(0);
    let iv = 0;
    const t = window.setTimeout(() => {
      setPhase("typing");
      let i = 0;
      iv = window.setInterval(() => {
        i += 1;
        setTyped(i);
        if (i >= len) {
          window.clearInterval(iv);
          setPhase("done");
        }
      }, TYPE_MS);
    }, GEARS_MS);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(iv);
    };
  }, [shown, reduced]);
  function turnOn() {
    if (reduced) return setScene("machine");
    setLit(true);
    window.setTimeout(() => setScene("machine"), 1100);
  }
  function pick(id: PhraseId) {
    const already = state.translated.includes(id);
    dispatch({ type: "translate", id });
    setShown((s) => ({ id, animate: !already, n: (s?.n ?? 0) + 1 }));
  }
  function pull() {
    dispatch({ type: "ending" });
    setPulls((n) => n + 1);
    setScene("ending");
  }
  const phrase = shown && phrases.find((p) => p.id === shown.id);
  const text = phrase ? phrase.translation[language] : "";
  const visible =
    phase === "done" ? text.length : phase === "typing" ? typed : 0;
  const busy = phase === "gears" || phase === "typing";
  const unlocked = endingUnlocked(state);
  return (
    <main className="trad">
      <header className="trad-header">
        <button className="trad-text" onClick={onExit}>
          ← {c.hub[language]}
        </button>
        <h1 ref={heading} tabIndex={-1}>
          {c.title[language]}
        </h1>
      </header>
      {scene === "arrival" ? (
        <div className="trad-world trad-arrival">
          <div
            className="trad-stage"
            role="group"
            aria-label={c.arrivalAlt[language]}
          >
            <WorkshopArt uncovered={lit} />
          </div>
          <p className="trad-arrival-line">{arrivalLine[language]}</p>
          <button className="trad-next" onClick={turnOn} disabled={lit}>
            {c.turnOn[language]}
          </button>
        </div>
      ) : (
        <div className="trad-flip-wrap">
          <div
            className={`trad-flip ${scene === "ending" ? "is-flipped" : ""}`}
          >
            <div className="trad-face trad-front" inert={scene === "ending"}>
              <div className={`trad-world ${busy ? "trad-busy" : ""}`}>
                <div
                  className="trad-head"
                  role="group"
                  aria-label={c.machineAlt[language]}
                >
                  <MachineArt />
                </div>
                <section className="trad-slip" aria-label={c.slip[language]}>
                  <h2>{c.slip[language]}</h2>
                  {phrase ? (
                    <div
                      key={shown!.n}
                      className={phase === "idle" ? "" : "trad-paper"}
                    >
                      <p className="trad-said">
                        {phrase.eye && <EyeIcon />}
                        {phrase.said?.[language]}{" "}
                        {phrase.detail && (
                          <small>{phrase.detail[language]}</small>
                        )}
                      </p>
                      <p className="trad-translation" aria-label={text}>
                        <span aria-hidden="true">{text.slice(0, visible)}</span>
                        <span aria-hidden="true" className="trad-rest">
                          {text.slice(visible)}
                        </span>
                      </p>
                      <span
                        className={`trad-stamp ${phase === "done" ? "trad-stamped" : ""}`}
                      >
                        {c.stamp[language]}
                      </span>
                    </div>
                  ) : (
                    <p className="trad-hint">{c.hint[language]}</p>
                  )}
                </section>
                <section className="trad-plate" aria-label={c.plate[language]}>
                  <h2>{c.plate[language]}</h2>
                  <ul>
                    {phraseIds.map((id) => {
                      const p = phrases.find((x) => x.id === id)!;
                      const done = state.translated.includes(id);
                      return (
                        <li key={id}>
                          <button
                            className={`trad-tile ${done ? "trad-done" : ""} ${shown?.id === id ? "trad-sel" : ""}`}
                            aria-pressed={shown?.id === id}
                            onClick={() => pick(id)}
                          >
                            {p.eye && <EyeIcon />}
                            {p.said && (
                              <span className={p.action ? "trad-action" : ""}>
                                {p.said[language]}
                              </span>
                            )}
                            {p.detail && <small>{p.detail[language]}</small>}
                            {done && <i aria-hidden="true">✓</i>}
                            {done && (
                              <span className="trad-sr">
                                , {c.done[language]}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <p className="trad-counter" role="status">
                  {state.translated.length}/{phraseIds.length}
                </p>
                {unlocked && !busy && (
                  <button className="trad-lever" onClick={pull}>
                    <LeverArt />
                    <span>{c.lever[language]}</span>
                  </button>
                )}
              </div>
            </div>
            <div className="trad-face trad-back" inert={scene !== "ending"}>
              <MachineArt back />
              {scene === "ending" && (
                <Ending
                  key={pulls}
                  language={language}
                  onAgain={() => setScene("machine")}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
