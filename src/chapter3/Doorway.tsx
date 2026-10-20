import type { Language } from "../content/museumContent";
import { c } from "./content";
import { Controller } from "./Artwork";
import "./chapter3.css";
export function Doorway({
  language,
  onEnter,
}: {
  language: Language;
  onEnter: () => void;
}) {
  return (
    <aside className="player2 p2-doorway">
      <Controller />
      <p>{c.invitation[language]}</p>
      <button className="p2-link" onClick={onEnter}>
        {c.door[language]} <span aria-hidden="true">↗</span>
      </button>
    </aside>
  );
}
