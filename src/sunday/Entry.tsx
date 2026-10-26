import type { Ref } from "react";
import type { Language } from "../content/museumContent";
import { c } from "./content";
import "./entry.css";
export function SundayEntry({
  language,
  onEnter,
  buttonRef,
}: {
  language: Language;
  onEnter: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <button ref={buttonRef} className="sunday-entry" onClick={onEnter}>
      <svg viewBox="0 0 95 95" aria-hidden="true">
        <path
          d="M19 18l62 5-6 65-63-8z"
          fill="#e2d3b7"
          stroke="#8c7c71"
          strokeWidth="2"
        />
        <path d="M19 18l62 5-1 17-63-5z" fill="#a58d9d" />
        <path
          d="M31 11l-2 15M67 15l-1 15"
          stroke="#e8d9c2"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="47" cy="58" r="12" fill="#d4ae70" />
        <path
          d="M47 40v-4M47 80v-4M29 58h-4M69 58h-4"
          stroke="#a48461"
          strokeWidth="2"
        />
      </svg>
      <span>
        <strong>{c.entry[language]}</strong>
        <small>{c.entryHint[language]}</small>
      </span>
    </button>
  );
}
