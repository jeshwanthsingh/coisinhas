import { useEffect } from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { c } from "./content";
import { useHold } from "./useHold";
const R = 34;
const C = 2 * Math.PI * R;
/** Round hold button with a filling ring, plus a plain tap alternative. Reduced motion: one tap. */
export function HoldButton({
  ms,
  hold,
  tap,
  language,
  onDone,
  onProgress,
}: {
  ms: number;
  hold: { pt: string; en: string };
  tap: { pt: string; en: string };
  language: Language;
  onDone: () => void;
  onProgress?: (p: number) => void;
}) {
  const reduced = useReducedMotion();
  const { progress, handlers, finish } = useHold(ms, onDone);
  useEffect(() => onProgress?.(progress), [progress, onProgress]);
  if (reduced)
    return (
      <button className="esc-hold esc-hold-tap" onClick={finish}>
        {tap[language]}
      </button>
    );
  return (
    <div className="esc-hold-wrap">
      <button className="esc-hold" aria-label={hold[language]} {...handlers}>
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r={R} className="esc-ring-bg" />
          <circle
            cx="40"
            cy="40"
            r={R}
            className="esc-ring"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            transform="rotate(-90 40 40)"
          />
        </svg>
        <span>{hold[language]}</span>
      </button>
      <button className="esc-text" onClick={finish}>
        {c.orTap[language]}
      </button>
    </div>
  );
}
