import { useState, type ReactNode } from "react";
import type { Copy, Language } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { c } from "./content";
export function StoryLines({
  lines,
  language,
  action,
  onDone,
  final = false,
  footer,
}: {
  lines: Copy[];
  language: Language;
  action: string;
  onDone: () => void;
  final?: boolean;
  footer?: ReactNode;
}) {
  const [count, setCount] = useState(1);
  const reduced = useReducedMotion();
  const visible = reduced ? lines.length : count;
  return (
    <div className={`sun-story ${final ? "sun-final-story" : ""}`}>
      <div aria-live="polite">
        {lines.slice(0, visible).map((line, i) => (
          <p
            key={i}
            className={final && i === lines.length - 1 ? "sun-final-line" : ""}
          >
            {line[language]}
          </p>
        ))}
      </div>
      {visible < lines.length ? (
        <button className="sun-next" onClick={() => setCount((n) => n + 1)}>
          {c.next[language]} <span aria-hidden="true">→</span>
        </button>
      ) : (
        <>
          {footer}
          <button className="sun-next" onClick={onDone}>
            {action} <span aria-hidden="true">→</span>
          </button>
        </>
      )}
    </div>
  );
}
