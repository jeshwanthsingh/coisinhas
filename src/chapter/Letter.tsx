import { useState, type ReactNode } from "react";
import type { Language } from "../content/museumContent";
import { chapterCopy as c } from "./content";
import { EnvelopeArt } from "./Artwork";
export function Letter({
  language,
  onComplete,
  afterLetter,
}: {
  afterLetter?: ReactNode;
  language: Language;
  onComplete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [end, setEnd] = useState(false);
  return (
    <div className={`letter-experience ${open ? "envelope-open" : ""}`}>
      <div className="envelope-stage">
        <div className="envelope-book" aria-hidden="true" />
        <button
          className="folded-envelope"
          onClick={() => setOpen(true)}
          aria-label={c.openLetter[language]}
          aria-expanded={open}
        >
          <EnvelopeArt />
          <span className="envelope-flap" aria-hidden="true" />
          <span className="envelope-seal" aria-hidden="true">
            c.
          </span>
        </button>
        {!open && <p>{c.openLetter[language]} ↗</p>}
      </div>
      {open && (
        <article className="unfolded-letter">
          <span className="paper-kicker">{c.letter[language]}</span>
          <h2>{c.letterTitle[language]}</h2>
          <p>{c.letterList[language]}</p>
          {!end ? (
            <button
              className="text-button"
              onClick={() => {
                setEnd(true);
                onComplete();
              }}
            >
              {c.continue[language]} →
            </button>
          ) : (
            <div className="letter-last revealed">
              <p>{c.letterEnd[language]}</p>
              <p className="signature">{c.signature[language]}</p>
              <small>{c.ps[language]}</small>
            </div>
          )}
        </article>
      )}
      {end && afterLetter}
    </div>
  );
}
