import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { Language } from "../content/museumContent";
import { useReducedMotion, useSaved } from "../hooks/useMuseumState";
import {
  KEY,
  advanceUmDia,
  freshUmDia,
  lastPage,
  validUmDia,
  type UmDiaEvent,
} from "./state";
import { HUG_DATE, c, diary, intro } from "./content";
import { ClosedDiary, PageArt } from "./Artwork";
import "./umdia.css";

type Scene = "arrival" | "diary";

export default function UmDia({
  language,
  onExit,
}: {
  language: Language;
  onLanguage?: (l: Language) => void; // unused: the shared PT/EN toggle drives the language
  onExit: () => void;
}) {
  const reduced = useReducedMotion();
  const [state, setState] = useSaved(KEY, freshUmDia(), validUmDia);
  const dispatch = useCallback(
    (e: UmDiaEvent) => setState((old) => advanceUmDia(old, e)),
    [setState],
  );
  const [scene, setScene] = useState<Scene>(
    state.seen.length > 0 ? "diary" : "arrival",
  );
  const [turn, setTurn] = useState<{ dir: "next" | "prev"; n: number }>({
    dir: "next",
    n: 0,
  });
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [scene]);

  function go(page: number) {
    if (page < 0 || page > lastPage || page === state.page) return;
    setTurn((t) => ({ dir: page > state.page ? "next" : "prev", n: t.n + 1 }));
    dispatch({ type: "go", page });
  }

  function openDiary() {
    // Opening the diary counts the page it opens on as seen.
    dispatch({ type: "go", page: state.page });
    setScene("diary");
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(state.page + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(state.page - 1);
    }
  }

  const page = diary[state.page];
  const isHug = page.id === "abraco";

  return (
    <main className="ud">
      <header className="ud-header">
        <button className="ud-text" onClick={onExit}>
          ← {c.hub[language]}
        </button>
        <h1 ref={heading} tabIndex={-1}>
          {c.title[language]}
        </h1>
      </header>

      {scene === "arrival" ? (
        <div className="ud-arrival">
          <div role="img" aria-label={c.closedAlt[language]}>
            <ClosedDiary />
          </div>
          {intro.map((line, i) => (
            <p key={i} className="ud-intro">
              {line[language]}
            </p>
          ))}
          <button className="ud-next" onClick={openDiary}>
            {c.open[language]}
          </button>
        </div>
      ) : (
        <div className="ud-diary" onKeyDown={onKey}>
          <p className="ud-sr" role="status" aria-live="polite">
            {c.page[language]} {state.page + 1} {c.of[language]}{" "}
            {diary.length}: {page.date[language]}
          </p>
          <div className="ud-book">
            <article
              key={`${page.id}-${turn.n}`}
              className={`ud-page ${!reduced && turn.n > 0 ? `ud-turn-${turn.dir}` : ""} ${page.unwritten ? "ud-unwritten" : ""} ${isHug ? "ud-hug" : ""}`}
              aria-label={page.date[language]}
            >
              <p className="ud-date">{page.date[language]}</p>
              <PageArt art={page.art} />
              {page.quote && (
                <figure className="ud-quote">
                  <figcaption>{c.youSaid[language]}</figcaption>
                  <blockquote lang="en">“{page.quote}”</blockquote>
                </figure>
              )}
              {page.unwritten && (
                <p className="ud-empty">{c.unwritten[language]}</p>
              )}
              {isHug && (
                <p className="ud-hug-date">
                  {HUG_DATE ?? c.hugDateEmpty[language]}
                </p>
              )}
              {page.note && <p className="ud-note">{page.note[language]}</p>}
              {page.note && !page.unwritten && (
                <p className="ud-sign">{c.signature[language]}</p>
              )}
            </article>
          </div>

          <div className="ud-controls">
            <button
              className="ud-arrow"
              onClick={() => go(state.page - 1)}
              aria-label={c.prev[language]}
              aria-disabled={state.page === 0}
            >
              ←
            </button>
            <nav className="ud-months" aria-label={c.months[language]}>
              {diary.map((p, i) => (
                <button
                  key={p.id}
                  className={`ud-month ${p.unwritten || p.id === "abraco" ? "ud-future" : ""}`}
                  aria-current={i === state.page ? "page" : undefined}
                  aria-label={p.date[language]}
                  onClick={() => go(i)}
                >
                  {p.month[language]}
                </button>
              ))}
            </nav>
            <button
              className="ud-arrow"
              onClick={() => go(state.page + 1)}
              aria-label={c.next[language]}
              aria-disabled={state.page === lastPage}
            >
              →
            </button>
          </div>
          {state.page === lastPage && (
            <p className="ud-continues">{c.continues[language]}</p>
          )}
        </div>
      )}
    </main>
  );
}
