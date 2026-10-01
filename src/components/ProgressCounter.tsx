import { useEffect, useState } from "react";
import { words } from "../content/museumContent";
import type { Language } from "../content/museumContent";
export function ProgressCounter({
  count,
  language,
}: {
  count: number;
  language: Language;
}) {
  const [unbounded, setUnbounded] = useState(false);
  useEffect(() => {
    if (count !== 6) return;
    const timer = setTimeout(() => setUnbounded(true), 1800);
    return () => clearTimeout(timer);
  }, [count]);
  return (
    <div className="progress" aria-live="polite">
      <span>{words.progress[language]} </span>
      <b>
        {count}/
        {unbounded ? (
          <>
            <s aria-hidden="true">6</s>
            <span className="infinity">?</span>
          </>
        ) : (
          "6"
        )}
      </b>
      {unbounded && <p>{words.growing[language]}</p>}
    </div>
  );
}
