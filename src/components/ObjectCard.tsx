import { useEffect, useRef, useState } from "react";
import { eyeRolls, objects, words } from "../content/museumContent";
import type { Language, ObjectId } from "../content/museumContent";
import { ObjectArt } from "./ObjectArt";

type Props = {
  id: ObjectId | "secret";
  language: Language;
  onClose: () => void;
  onLanguage: (language: Language) => void;
};
export function ObjectCard({ id, language, onClose, onLanguage }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [roll, setRoll] = useState<number | null>(null);
  const [reacted, setReacted] = useState(false);
  const object = objects.find((o) => o.id === id);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const node = dialog.current;
    node?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      node?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  useEffect(() => {
    if (!reacted) return;
    const timer = setTimeout(onClose, 1400);
    return () => clearTimeout(timer);
  }, [reacted, onClose]);
  return (
    <dialog
      ref={dialog}
      className={`object-dialog ${id === "secret" ? "secret-dialog" : ""}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="card-title"
    >
      <article className="card-paper">
        <header className="card-top">
          <span>
            {id === "secret"
              ? words.research[language]
              : `${words.exhibit[language]} ${object?.number} / 06`}
          </span>
          <div
            className="card-language language-toggle"
            role="group"
            aria-label={words.language[language]}
          >
            <button
              aria-pressed={language === "pt"}
              onClick={() => onLanguage("pt")}
            >
              PT
            </button>
            <span>/</span>
            <button
              aria-pressed={language === "en"}
              onClick={() => onLanguage("en")}
            >
              EN
            </button>
          </div>
          <button
            className="icon-close"
            onClick={onClose}
            aria-label={words.close[language]}
          >
            ×
          </button>
        </header>
        {object && (
          <div className="card-object">
            <ObjectArt id={object.id} />
          </div>
        )}
        <h2 id="card-title">
          {id === "secret"
            ? words.archiveTitle[language]
            : object?.title[language]}
        </h2>
        <p className="card-body">
          {id === "secret" ? words.archive[language] : object?.body[language]}
        </p>
        {object?.aside && (
          <p className="card-aside">{object.aside[language]}</p>
        )}
        {object?.metadata && (
          <p className="card-metadata">{object.metadata[language]}</p>
        )}
        {id === "frame" && (
          <div className="eye-rolls">
            <div className="eye-row">
              {eyeRolls.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setRoll(i)}
                  onMouseEnter={() => setRoll(i)}
                  onFocus={() => setRoll(i)}
                  aria-label={label[language]}
                  aria-pressed={roll === i}
                >
                  🙄
                </button>
              ))}
            </div>
            <p role="status">
              {roll === null ? "· · ·" : eyeRolls[roll][language]}
            </p>
          </div>
        )}
        {id === "secret" ? (
          <div className="secret-response">
            <button
              onClick={() => setReacted(true)}
              aria-label={words.archiveReaction[language]}
              disabled={reacted}
            >
              {words.reaction[language]}
            </button>
            <p role="status">{reacted ? words.there[language] : "\u00a0"}</p>
          </div>
        ) : (
          <button className="text-button card-close" onClick={onClose}>
            {words.close[language]} <span aria-hidden="true">↗</span>
          </button>
        )}
      </article>
    </dialog>
  );
}
