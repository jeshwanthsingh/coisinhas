import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SceneProps } from "./Player2";
import { needIds, needsFull, type NeedId } from "./state";
import { c, needCopy } from "./content";
import { Dialog } from "./Dialog";
import { matchesPostcard } from "./postcard";
import { postcardLetter } from "./content";
import { CareArt } from "./Artwork";
export function KarolMode({
  language,
  state,
  dispatch,
  onLanguage,
}: SceneProps) {
  const [message, setMessage] = useState<NeedId | null>(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [code, setCode] = useState("");
  const [unknown, setUnknown] = useState(false);
  const [postcard, setPostcard] = useState(false);
  const [checking, setChecking] = useState(false);
  const [cryptoError, setCryptoError] = useState(false);
  const checkingRef = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (consoleOpen) input.current?.focus();
  }, [consoleOpen]);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (checkingRef.current) return;
    setUnknown(false);
    setCryptoError(false);
    if (code.trim().toLowerCase() === "dengolode") dispatch({ type: "cheat" });
    else {
      checkingRef.current = true;
      setChecking(true);
      try {
        if (await matchesPostcard(code)) {
          dispatch({ type: "postcard" });
          setPostcard(true);
        } else setUnknown(true);
      } catch {
        setCryptoError(true);
      } finally {
        checkingRef.current = false;
        setChecking(false);
      }
    }
    setCode("");
  }

  return (
    <section className="p2-scene">
      <div className="p2-mode-layout">
        <section className="p2-needs">
          <h2>{c.needs[language]}</h2>
          {needIds.map((id) => (
            <label key={id}>
              <span>
                {needCopy[id].name[language]}{" "}
                <small>{state.needs[id]}/100</small>
              </span>
              <meter min="0" max="100" value={state.needs[id]}>
                {state.needs[id]}
              </meter>
            </label>
          ))}
        </section>
        <div className="p2-care-grid">
          {needIds.map((id) => (
            <button
              key={id}
              disabled={state.needs[id] === 100}
              onClick={() => {
                dispatch({ type: "care", need: id });
                setMessage(id);
              }}
            >
              <CareArt kind={id} />
              <span>{needCopy[id].action[language]}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="p2-care-message" role="status">
        {message
          ? needCopy[message].message[language]
          : needsFull(state)
            ? c.completeNeeds[language]
            : " "}
      </p>
      <aside className="p2-moods">
        <h3>{c.mood[language]}</h3>
        <ul>
          <li>{(state.needs.patience < 100 ? c.tense : c.happy)[language]}</li>
          {state.needs.dengo === 100 && <li>{c.cozy[language]}</li>}
          {state.needs.sleep === 100 && <li>{c.rested[language]}</li>}
        </ul>
      </aside>
      <button
        className="p2-console-toggle"
        aria-label={c.console[language]}
        aria-expanded={consoleOpen}
        onClick={() => setConsoleOpen((v) => !v)}
      >
        ~
      </button>
      {consoleOpen && (
        <form className="p2-console" onSubmit={(e) => void submit(e)}>
          <label htmlFor="p2-code">{c.code[language]}</label>
          <div>
            <input
              ref={input}
              id="p2-code"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={100}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="p2-link" type="submit" disabled={checking}>
              {c.runCode[language]} ↵
            </button>
          </div>
          <small>{c.cheatHint[language]}</small>
          <p role="status">
            {checking
              ? c.checking[language]
              : cryptoError
                ? c.cryptoUnavailable[language]
                : unknown
                  ? c.unknown[language]
                  : state.cheatUsed
                    ? c.cheatNote[language]
                    : null}
          </p>
          {state.postcardUnlocked && (
            <button
              type="button"
              className="p2-link"
              onClick={() => setPostcard(true)}
            >
              {c.postcardOpen[language]}
            </button>
          )}
        </form>
      )}
      <section className="p2-frame">
        <span aria-hidden="true">✧</span>
        <h2>{c.frame[language]}</h2>
        <p>{c.frameHint[language]}</p>
        <label>
          <span className="sr-only">{c.frame[language]}</span>
          <textarea
            maxLength={280}
            value={state.note}
            onChange={(e) => dispatch({ type: "note", text: e.target.value })}
          />
        </label>
        <small>
          {state.note.length}/280 {c.characters[language]}
        </small>
        <p className="p2-local-note">{c.localNote[language]}</p>
        {state.note.trim() ? (
          <a
            className="p2-share"
            href={`https://wa.me/?text=${encodeURIComponent(state.note)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.share[language]} ↗
          </a>
        ) : (
          <button className="p2-link" disabled>
            {c.share[language]} ↗
          </button>
        )}
      </section>
      {postcard && (
        <Dialog
          language={language}
          onLanguage={onLanguage}
          title={c.postcard[language]}
          onClose={() => setPostcard(false)}
        >
          <p className="p2-letter-body">{postcardLetter[language]}</p>
        </Dialog>
      )}
    </section>
  );
}
