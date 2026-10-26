import { useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import { c } from "./content";
export function SundayVoice({
  language,
  opened,
  onOpen,
  onDone,
}: {
  language: Language;
  opened: boolean;
  onOpen: () => void;
  onDone: () => void;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  async function toggle() {
    const audio = ref.current;
    if (!audio) return;
    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {
      setError(true);
      setPlaying(false);
    }
  }
  return (
    <>
      <button
        className="sun-cassette-button"
        onClick={onOpen}
        aria-expanded={opened}
      >
        <svg viewBox="0 0 180 100" aria-hidden="true">
          <path
            d="M5 8l169-3 2 88L7 97Z"
            fill="#a698ae"
            stroke="#d2c2be"
            strokeWidth="2"
          />
          <path d="M22 21h136v43H22Z" fill="#d9cbb7" />
          <circle
            className={playing ? "sun-reel spinning" : "sun-reel"}
            cx="52"
            cy="43"
            r="13"
            stroke="#7b7185"
            strokeWidth="5"
            strokeDasharray="7 4"
          />
          <circle
            className={playing ? "sun-reel spinning" : "sun-reel"}
            cx="128"
            cy="43"
            r="13"
            stroke="#7b7185"
            strokeWidth="5"
            strokeDasharray="7 4"
          />
          <path d="M67 43h46M51 83h78" stroke="#7b7185" strokeWidth="3" />
        </svg>
        <span>{c.cassette[language]}</span>
      </button>
      {opened && (
        <div className="sun-audio">
          {__HAS_SUNDAY_VOICE__ && !error ? (
            <>
              <audio
                ref={ref}
                preload="metadata"
                src={`${import.meta.env.BASE_URL}audio/domingo.m4a`}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onError={() => setError(true)}
                onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) =>
                  setDuration(
                    Number.isFinite(e.currentTarget.duration)
                      ? e.currentTarget.duration
                      : 0,
                  )
                }
              />
              <button
                className="sun-next"
                onClick={toggle}
                aria-pressed={playing}
              >
                {playing ? c.pause[language] : c.play[language]}
              </button>
              <label className="sun-seek">
                <span>{c.seek[language]}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 1}
                  value={time}
                  step="0.1"
                  disabled={!duration}
                  onChange={(e) => {
                    if (ref.current) {
                      ref.current.currentTime = Number(e.target.value);
                      setTime(Number(e.target.value));
                    }
                  }}
                />
              </label>
            </>
          ) : (
            <p className="sun-reply" role="status">
              {c[error ? "voiceError" : "voiceQuiet"][language]}
            </p>
          )}
        </div>
      )}
      <button
        className="sun-text"
        onClick={() => {
          ref.current?.pause();
          onDone();
        }}
      >
        {c.voiceSkip[language]} →
      </button>
    </>
  );
}
