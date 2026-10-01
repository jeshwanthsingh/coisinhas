import { useCallback, useEffect, useRef, useState } from "react";
import { ending, words } from "../content/museumContent";
import type { Language } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { ObjectArt } from "./ObjectArt";
import { RoomIllustration } from "./RoomIllustration";
import { VoiceNote } from "./VoiceNote";

function Ending({
  language,
  onCat,
}: {
  language: Language;
  onCat: () => void;
}) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced ? ending.length + 1 : 1);
  const [cat, setCat] = useState(reduced);
  useEffect(() => {
    if (cat || reduced) onCat();
  }, [cat, reduced, onCat]);
  useEffect(() => {
    if (reduced) return;
    if (visible > ending.length) {
      const timer = setTimeout(() => setCat(true), 3000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setVisible((n) => n + 1),
      visible === ending.length ? 4500 : 2900,
    );
    return () => clearTimeout(timer);
  }, [visible, reduced]);
  return (
    <div className="ending">
      <span className="eyebrow">{words.endingLabel[language]}</span>
      <div className="ending-lines">
        {ending.map((line, i) => (
          <p
            key={i}
            className={i < visible || reduced ? "revealed" : "unrevealed"}
          >
            {line[language]}
          </p>
        ))}
      </div>
      {(visible > ending.length || reduced) && (
        <div className="final-words">
          <h2>{words.final[language]}</h2>
          <p className="signature">{words.signature[language]}</p>
        </div>
      )}
      {(cat || reduced) && (
        <div className="final-cat">
          <div className="ending-vignette" aria-hidden="true">
            <svg viewBox="0 0 100 115" fill="none">
              <path
                d="M27 64L68 62L78 78L29 84Z"
                fill="#9b7f60"
                stroke="#383832"
                strokeWidth="2"
              />
              <path
                d="M27 64L20 18Q39 7 60 16L68 62Z"
                fill="#9b7f60"
                stroke="#383832"
                strokeWidth="2"
              />
              <path
                d="M29 21L34 56M39 19L44 56M49 20L55 56M34 83L28 111M70 79L76 107"
                stroke="#725b48"
                strokeWidth="3"
              />
            </svg>
            <ObjectArt id="cat" />
          </div>
          <small>{words.collection[language]}</small>
        </div>
      )}
    </div>
  );
}
export function UnfinishedRoom({
  language,
  onBack,
}: {
  language: Language;
  onBack: () => void;
}) {
  const [step, setStep] = useState(0);
  const [finalCat, setFinalCat] = useState(false);
  const showCat = useCallback(() => setFinalCat(true), []);
  const [revealed, setRevealed] = useState(0);
  const reduced = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);
  useEffect(() => {
    if (step !== 0 || reduced) return;
    const timers = [1500, 4200, 6900].map((delay, index) =>
      setTimeout(() => setRevealed(index + 1), delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [step, reduced]);
  return (
    <main className={`unfinished-room ${step === 4 ? "predawn" : ""}`}>
      <div className="quiet-illustration">
        <RoomIllustration simple dawn={step === 4} />
        {finalCat && (
          <div className="quiet-cat">
            <ObjectArt id="cat" />
          </div>
        )}
      </div>
      <div className="quiet-content">
        <span className="eyebrow">{words.unfinishedLabel[language]}</span>
        <h1 tabIndex={-1} ref={heading}>
          {words.unfinishedTitle[language]}
        </h1>
        <div className="quiet-chapter" key={step}>
          {step === 0 && (
            <>
              <p className="unknown">{words.unknown[language]}</p>
              <p
                className={`many ${revealed >= 1 || reduced ? "revealed" : "unrevealed"}`}
              >
                {words.many[language]}
              </p>
              <p
                className={revealed >= 2 || reduced ? "revealed" : "unrevealed"}
              >
                {words.decipher[language]}
              </p>
              <p
                className={`discover ${revealed >= 3 || reduced ? "revealed" : "unrevealed"}`}
              >
                {words.discover[language]}
              </p>
            </>
          )}
          {step === 1 && <p className="prose">{words.more[language]}</p>}
          {step === 2 && (
            <p className="becoming prose">{words.becoming[language]}</p>
          )}
          {step === 3 && (
            <VoiceNote language={language} onContinue={() => setStep(4)} />
          )}
          {step === 4 && <Ending language={language} onCat={showCat} />}
          {step < 3 && (
            <button
              className={`text-button chapter-next ${step === 0 && revealed < 3 && !reduced ? "unrevealed" : ""}`}
              disabled={step === 0 && revealed < 3 && !reduced}
              onClick={() => setStep((s) => s + 1)}
            >
              {words.next[language]} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        <button className="text-button museum-back" onClick={onBack}>
          ← {words.back[language]}
        </button>
      </div>
    </main>
  );
}
