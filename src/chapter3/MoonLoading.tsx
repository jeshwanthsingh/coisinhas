import { useEffect, useRef } from "react";
import type { Language } from "../content/museumContent";
import { c, moonNames } from "./content";
import { moonPhase, phaseIndex } from "./time";
import { Moon } from "./Artwork";
export function MoonLoading({
  language,
  onDone,
}: {
  language: Language;
  onDone: () => void;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const phase = moonPhase(new Date());
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    button.current?.focus({ preventScroll: true });
    const timer = setTimeout(onDone, 1400);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <section className="p2-loading" aria-label={c.hub[language]}>
      <div className="p2-twin-moons">
        {[false, true].map((south) => (
          <figure key={String(south)}>
            <Moon phase={phase} south={south} />
            <figcaption>{(south ? c.curitiba : c.sf)[language]}</figcaption>
          </figure>
        ))}
      </div>
      <p>{c.moonCaption[language]}</p>
      <small>
        {moonNames[phaseIndex(phase)][language]} · {c.moonApprox[language]}
      </small>
      <button className="p2-link" ref={button} onClick={onDone}>
        {c.skip[language]}
      </button>
    </section>
  );
}
