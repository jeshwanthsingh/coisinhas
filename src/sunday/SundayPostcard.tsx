import { useState, useEffect, useId, useRef } from "react";
import type { Language } from "../content/museumContent";
import type { Postcard } from "./state";
import { c } from "./content";
import { postcardParagraphs, postcardText } from "./postcard";
export function SundayPostcard({
  postcard,
  language,
  onSave,
}: {
  postcard: Postcard;
  language: Language;
  onSave?: () => boolean;
}) {
  const [status, setStatus] = useState<
    "saved" | "saveFail" | "copied" | "copyFail" | null
  >(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(postcardText(postcard, language));
      setStatus("copied");
    } catch {
      setStatus("copyFail");
    }
  }
  return (
    <>
      <article className="sun-postcard">
        <div className="sun-postmark" aria-hidden="true">
          <svg viewBox="0 0 90 65">
            <path
              d="M6 9h44v48H6Z"
              fill="none"
              stroke="currentColor"
              strokeDasharray="3 3"
            />
            <circle cx="28" cy="32" r="11" fill="none" stroke="currentColor" />
            <path
              d="M45 22q10-7 20 0t20 0M45 32q10-7 20 0t20 0M45 42q10-7 20 0t20 0"
              fill="none"
              stroke="currentColor"
            />
          </svg>
        </div>
        <h2>{c.postcard[language]}</h2>
        {postcardParagraphs(postcard, language).map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <p className="sun-signature">{c.signature[language]}</p>
      </article>
      <div className="sun-card-actions">
        {onSave && (
          <button
            className="sun-next"
            onClick={() => setStatus(onSave() ? "saved" : "saveFail")}
          >
            {c.save[language]}
          </button>
        )}
        <button className="sun-text" onClick={copy}>
          {c.copy[language]}
        </button>
      </div>
      <p className="sun-hint" role="status">
        {status ? c[status][language] : c.local[language]}
      </p>
    </>
  );
}
export function SavedSunday({
  postcard,
  language,
  onLanguage,
  onClose,
}: {
  postcard: Postcard;
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
      className="sun-saved-dialog"
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
      <div className="sun-dialog-top">
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
      <h2 id={id} className="sun-hint">
        {c.review[language]}
      </h2>
      <SundayPostcard postcard={postcard} language={language} />
    </dialog>
  );
}
