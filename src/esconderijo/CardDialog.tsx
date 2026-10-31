import { useEffect, useId, useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import type { Card } from "./cards";
import { CardIcon } from "./Artwork";
import { HoldButton } from "./HoldButton";
import { c } from "./content";
/** A paper tag: story on the front, one line about her on the back. */
export function CardDialog({
  card,
  language,
  onLanguage,
  onFlip,
  onClose,
}: {
  card: Card;
  language: Language;
  onLanguage: (l: Language) => void;
  onFlip: (id: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  const id = useId();
  const [flipped, setFlipped] = useState(false);
  const [revived, setRevived] = useState(card.id !== "resgates");
  useEffect(() => {
    const active = document.activeElement as HTMLElement | null;
    const d = ref.current;
    d?.showModal();
    return () => {
      d?.close();
      active?.focus({ preventScroll: true });
    };
  }, []);
  function flip(to: boolean) {
    setFlipped(to);
    if (to) onFlip(card.id);
    requestAnimationFrame(() =>
      (to ? back : front).current?.focus({ preventScroll: true }),
    );
  }
  const lines = card.story[language].split(/(?<=[.!?])\s+/);
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
        ).filter((b) => !b.closest("[inert]"));
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
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button onClick={onClose}>{c.close[language]} ×</button>
      </div>
      <div className={`esc-flip ${flipped ? "is-flipped" : ""}`}>
        <div className="esc-face esc-front" inert={flipped}>
          <i className="esc-hole" aria-hidden="true" />
          <span className="esc-stamp">{c.rarity[card.rarity][language]}</span>
          <div ref={front} tabIndex={-1} className="esc-face-body">
            <CardIcon name={card.icon} />
            <h2 id={id}>{card.title[language]}</h2>
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <button className="esc-flip-btn" onClick={() => flip(true)}>
            {c.flip[language]} ↻
          </button>
        </div>
        <div className="esc-face esc-back" inert={!flipped}>
          <i className="esc-hole" aria-hidden="true" />
          <div
            ref={back}
            tabIndex={-1}
            className="esc-face-body"
            aria-live="polite"
          >
            {revived ? (
              <p className="esc-noticed">{card.noticed[language]}</p>
            ) : (
              <HoldButton
                ms={1500}
                hold={c.holdRevive}
                tap={c.tapRevive}
                language={language}
                onDone={() => setRevived(true)}
              />
            )}
          </div>
          <button className="esc-flip-btn" onClick={() => flip(false)}>
            ↺ {c.flipBack[language]}
          </button>
        </div>
      </div>
    </dialog>
  );
}
