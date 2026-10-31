import { useEffect, useId, useRef } from "react";
import type { Language } from "../content/museumContent";
import type { Card } from "./cards";
import { CardIcon } from "./Artwork";
import { c } from "./content";
export function CardDialog({
  card,
  language,
  onLanguage,
  onClose,
}: {
  card: Card;
  language: Language;
  onLanguage: (l: Language) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const active = document.activeElement as HTMLElement | null;
    const d = ref.current;
    d?.showModal();
    return () => {
      d?.close();
      active?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      className={`esc-dialog esc-${card.rarity}`}
      ref={ref}
      aria-labelledby={id}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const controls = Array.from(
          e.currentTarget.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)",
          ),
        );
        const first = controls[0],
          last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="esc-dialog-top">
        <div role="group" aria-label={c.language[language]}>
          {(["pt", "en"] as const).map((l) => (
            <button
              key={l}
              aria-pressed={language === l}
              onClick={() => onLanguage(l)}
            >
              {c[l][language]}
            </button>
          ))}
        </div>
        <button onClick={onClose}>{c.close[language]} ×</button>
      </div>
      <CardIcon name={card.icon} />
      <span className="esc-rarity">{c.rarity[card.rarity][language]}</span>
      <h2 id={id}>{card.title[language]}</h2>
      <h3>{c.happened[language]}</h3>
      <p>{card.story[language]}</p>
      <h3>{c.noticed[language]}</h3>
      <p className="esc-noticed">{card.noticed[language]}</p>
    </dialog>
  );
}
