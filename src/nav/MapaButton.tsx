import { useEffect, useId, useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import { hasNew, readEsconderijo } from "../esconderijo/state";
import { published } from "../esconderijo/published";
import { n, placeNames } from "./content";
import {
  DepoisIcon,
  EsconderijoIcon,
  Jogador2Icon,
  MuseumIcon,
  SundayIcon,
} from "./Icons";
import type { Place } from "./places";
import "./map.css";
const icons: Record<Place, () => React.JSX.Element> = {
  museu: MuseumIcon,
  depois: DepoisIcon,
  jogador2: Jogador2Icon,
  domingo: SundayIcon,
  esconderijo: EsconderijoIcon,
};
function MapDialog({
  language,
  onLanguage,
  current,
  list,
  onGo,
  onClose,
}: {
  language: Language;
  onLanguage: (l: Language) => void;
  current: Place;
  list: Place[];
  onGo: (p: Place) => void;
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
  const fresh = hasNew(
    readEsconderijo(),
    published.map((card) => card.id),
  );
  return (
    <dialog
      className="map-dialog"
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
      <div className="map-top">
        <div role="group" aria-label={n.language[language]}>
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
        <button onClick={onClose}>{n.close[language]} ×</button>
      </div>
      <h2 id={id}>{n.mapTitle[language]}</h2>
      <ul>
        {list.map((place) => {
          const Icon = icons[place];
          const here = place === current;
          return (
            <li key={place}>
              <button
                className={`map-item ${here ? "map-here" : ""}`}
                aria-current={here ? "page" : undefined}
                onClick={() => onGo(place)}
              >
                <Icon />
                <span>
                  <strong>{placeNames[place][language]}</strong>
                  {here && <small>✦ {n.here[language]}</small>}
                  {place === "esconderijo" && fresh && (
                    <em>{n.newInStash[language]}</em>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
export function MapaButton({
  language,
  onLanguage,
  current,
  list,
  onGo,
}: {
  language: Language;
  onLanguage: (l: Language) => void;
  current: Place;
  list: Place[];
  onGo: (p: Place) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="map-button"
        aria-label={n.map[language]}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path
            d="M6 10l9-3 10 3 9-3v23l-9 3-10-3-9 3z"
            fill="#e2d3b7"
            stroke="#8c7c71"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M15 7v23M25 10v23" stroke="#b9a98a" strokeWidth="1.2" />
          <path
            d="M11 24c4-6 7 1 12-4"
            fill="none"
            stroke="#b86a5a"
            strokeWidth="1.6"
            strokeDasharray="2.5 2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <MapDialog
          language={language}
          onLanguage={onLanguage}
          current={current}
          list={list}
          onGo={(p) => {
            setOpen(false);
            onGo(p);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
