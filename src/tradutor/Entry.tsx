import type { Ref } from "react";
import type { Language } from "../content/museumContent";
import { TradutorIcon } from "../nav/Icons";
import { c } from "./content";
import "./entry.css";
export function TradutorEntry({
  language,
  onEnter,
  buttonRef,
}: {
  language: Language;
  onEnter: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <button ref={buttonRef} className="trad-entry" onClick={onEnter}>
      <TradutorIcon />
      <span>
        <strong>{c.entry[language]}</strong>
        <small>{c.entryHint[language]}</small>
      </span>
    </button>
  );
}
