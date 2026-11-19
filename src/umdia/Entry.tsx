import type { Ref } from "react";
import type { Language } from "../content/museumContent";
import { UmDiaIcon } from "../nav/Icons";
import { c } from "./content";
import "../tradutor/entry.css";

export function UmDiaEntry({
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
      <UmDiaIcon />
      <span>
        <strong>{c.entry[language]}</strong>
        <small>{c.entryHint[language]}</small>
      </span>
    </button>
  );
}
