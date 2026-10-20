import { useEffect, useRef, useId, type ReactNode } from "react";
import type { Language } from "../content/museumContent";
import { c } from "./content";
export function Dialog({
  language,
  onLanguage,
  title,
  onClose,
  children,
}: {
  language: Language;
  onLanguage: (l: Language) => void;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const active = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      active?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="player2 p2-dialog"
      aria-labelledby={id}
      onCancel={(e) => {
        e.preventDefault();
        close.current();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close.current();
        }
      }}
    >
      <div className="p2-dialog-top">
        <div role="group" aria-label={c.language[language]}>
          {(["pt", "en"] as const).map((l) => (
            <button
              key={l}
              className="p2-link"
              aria-pressed={l === language}
              onClick={() => onLanguage(l)}
            >
              {c[l][language]}
            </button>
          ))}
        </div>
        <button className="p2-link" onClick={onClose}>
          {c.close[language]} ×
        </button>
      </div>
      <h2 id={id}>{title}</h2>
      {children}
    </dialog>
  );
}
