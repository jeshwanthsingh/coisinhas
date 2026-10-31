import type { Ref } from "react";
import type { Language } from "../content/museumContent";
import { c } from "./content";
import { hasNew, readEsconderijo } from "./state";
import { published } from "./published";
import { EsconderijoIcon } from "../nav/Icons";
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
      <EsconderijoIcon />
      <span>
        <strong>{c.entry[language]}</strong>
        <small>{c.entryHint[language]}</small>
        {fresh && <em role="status">{c.newInStash[language]}</em>}
      </span>
    </button>
  );
}
