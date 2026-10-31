import type { Ref } from "react";
import type { Language } from "../content/museumContent";
import { c } from "./content";
import { hasNew, readEsconderijo } from "./state";
import { published } from "./published";
import "./entry.css";
export function EsconderijoEntry({
  language,
  onEnter,
  buttonRef,
}: {
  language: Language;
  onEnter: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  const fresh = hasNew(
    readEsconderijo(),
    published.map((card) => card.id),
  );
  return (
    <button
      ref={buttonRef}
      className={`esc-entry ${fresh ? "esc-entry-new" : ""}`}
      onClick={onEnter}
    >
      <svg viewBox="0 0 95 95" aria-hidden="true">
        <rect x="14" y="40" width="67" height="42" rx="4" fill="#8a6b4d" />
        <path d="M14 56h67M14 70h67" stroke="#5e4630" strokeWidth="3" />
        <path d="M10 40h75l-6-14H16z" fill="#a58660" />
        <path d="M24 40l6-14M71 40l-6-14" stroke="#5e4630" strokeWidth="2" />
        <circle cx="47" cy="33" r="10" fill="#d8b87c" opacity=".55" />
        <path d="M44 14h7v12h-7z" fill="#e2d3b7" />
      </svg>
      <span>
        <strong>{c.entry[language]}</strong>
        <small>{c.entryHint[language]}</small>
        {fresh && <em role="status">{c.newInStash[language]}</em>}
      </span>
    </button>
  );
}
