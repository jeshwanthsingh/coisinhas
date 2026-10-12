import { useEffect, useRef, useState } from "react";
import { words } from "../content/museumContent";
import type { Language } from "../content/museumContent";
import { chapterCopy as c } from "./content";
export function Certificate({
  language,
  onClose,
  onLanguage,
}: {
  language: Language;
  onClose: () => void;
  onLanguage: (language: Language) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [reacted, setReacted] = useState(false);
  useEffect(() => {
    const old = document.activeElement as HTMLElement;
    const node = dialog.current;
    node?.showModal();
    return () => {
      node?.close();
      old?.focus();
    };
  }, []);
  useEffect(() => {
    if (!reacted) return;
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [reacted, onClose]);
  return (
    <dialog
      ref={dialog}
      className="certificate-dialog"
      aria-labelledby="certificate-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article>
        <div
          className="language-toggle certificate-language"
          role="group"
          aria-label={words.language[language]}
        >
          <button
            onClick={() => onLanguage("pt")}
            aria-pressed={language === "pt"}
          >
            PT
          </button>
          <span>/</span>
          <button
            onClick={() => onLanguage("en")}
            aria-pressed={language === "en"}
          >
            EN
          </button>
        </div>
        <button
          className="certificate-close"
          onClick={onClose}
          aria-label={c.close[language]}
        >
          ×
        </button>
        <span className="certificate-star" aria-hidden="true">
          ✧
        </span>
        <h2 id="certificate-title">{c.certificate[language]}</h2>
        <p>{c.certificateBody[language]}</p>
        <small>{c.ongoing[language]}</small>
        <button
          className="certificate-reaction"
          onClick={() => setReacted(true)}
          aria-label={c.reaction[language]}
        >
          🙄
        </button>
        <p role="status">{reacted ? c.reactionText[language] : " "}</p>
      </article>
    </dialog>
  );
}
