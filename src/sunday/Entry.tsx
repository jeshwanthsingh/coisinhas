import type { Ref } from "react";
import type { Language } from "../content/museumContent";
import { c } from "./content";
import { SundayIcon } from "../nav/Icons";
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
      <SundayIcon />
      <span>
        <strong>{c.entry[language]}</strong>
        <small>{c.entryHint[language]}</small>
      </span>
    </button>
  );
}
