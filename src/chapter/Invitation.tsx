import { useEffect, useState } from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { chapterCopy as c } from "./content";
export function Invitation({
  language,
  onEnter,
}: {
  language: Language;
  onEnter: () => void;
}) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(reduced);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <aside className="chapter-invitation">
      <span className="invitation-door" aria-hidden="true">
        <i />
      </span>
      <p>{c.closed[language]}</p>
      <p className={ready || reduced ? "" : "unrevealed"}>
        {c.oneMore[language]}
      </p>
      <button className="text-button" onClick={onEnter}>
        {c.enter[language]} <span aria-hidden="true">↗</span>
      </button>
    </aside>
  );
}
