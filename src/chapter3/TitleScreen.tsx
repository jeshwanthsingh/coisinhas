import type { Language } from "../content/museumContent";
import { c } from "./content";
import { Controller } from "./Artwork";
export function TitleScreen({
  language,
  onChoose,
}: {
  language: Language;
  onChoose: () => void;
}) {
  return (
    <section className="p2-save-screen">
      <Controller />
      <div className="p2-save-slots">
        <button className="p2-save-slot" onClick={onChoose}>
          <span className="p2-slot-light" />
          <strong>{c.karol[language]}</strong>
          <span>{c.slotOne[language]}</span>
        </button>
        <button className="p2-save-slot p2-slot-away" disabled>
          <strong>{c.jesh[language]}</strong>
          <span>{c.slotTwo[language]}</span>
        </button>
      </div>
      <p>{c.saved[language]}</p>
    </section>
  );
}
