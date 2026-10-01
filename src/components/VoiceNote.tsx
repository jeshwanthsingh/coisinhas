import { useEffect, useRef, useState } from "react";
import type { Language } from "../content/museumContent";
import { words } from "../content/museumContent";

export function VoiceNote({
  language,
  onContinue,
}: {
  language: Language;
  onContinue: () => void;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [heard, setHeard] = useState(false);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const source = `${import.meta.env.BASE_URL}audio/coisinhas.m4a`;
  useEffect(() => {
    const controller = new AbortController();
    fetch(source, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        const type = response.headers.get("content-type") ?? "";
        setAvailable(response.ok && !type.includes("text/html"));
      })
      .catch(() => {
        if (!controller.signal.aborted) setAvailable(false);
      });
    return () => controller.abort();
  }, [source]);
  async function toggle() {
    if (!audio.current) return;
    if (playing) {
      audio.current.pause();
      return;
    }
    try {
      setError(false);
      await audio.current.play();
    } catch {
      setError(true);
      setPlaying(false);
    }
  }
  const time = (value: number) =>
    `${Math.floor(value / 60)}:${Math.floor(value % 60)
      .toString()
      .padStart(2, "0")}`;
  return (
    <section className="voice-note">
      <span className="eyebrow">{words.endingLabel[language]}</span>
      <h2>{words.voiceTitle[language]}</h2>
      <p>{words.voiceSub[language]}</p>
      <div
        className={`cassette ${playing ? "playing" : ""}`}
        aria-hidden="true"
      >
        <span className="cassette-screw tl" />
        <span className="cassette-screw tr" />
        <div className="cassette-label">
          <span>{words.cassette[language]}</span>
          <div className="tape-window">
            <i />
            <span>· · · · · ·</span>
            <i />
          </div>
        </div>
        <div className="cassette-base">
          <i />
          <i />
        </div>
        <span className="cassette-screw bl" />
        <span className="cassette-screw br" />
      </div>
      {available && (
        <audio
          ref={audio}
          src={source}
          preload="metadata"
          onPlay={() => {
            setPlaying(true);
            setHeard(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={() => setCurrent(audio.current?.currentTime ?? 0)}
          onLoadedMetadata={() =>
            setDuration(
              Number.isFinite(audio.current?.duration)
                ? audio.current!.duration
                : 0,
            )
          }
          onError={() => {
            setAvailable(false);
            setPlaying(false);
          }}
        />
      )}
      {available ? (
        <>
          <button className="primary-button audio-button" onClick={toggle}>
            <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{" "}
            {playing ? words.voicePause[language] : words.voicePlay[language]}
          </button>
          <div className="audio-timing">
            <progress
              value={current}
              max={duration || 1}
              aria-label={words.voiceTitle[language]}
            />
            <span>
              {time(current)} / {time(duration)}
            </span>
          </div>
        </>
      ) : (
        <div className="voice-placeholder">
          <span>⌁</span>
          <p>
            {available === null
              ? words.voiceChecking[language]
              : words.voicePlaceholder[language]}
          </p>
          {available === false && <small>{words.voiceMissing[language]}</small>}
        </div>
      )}
      {error && <p role="alert">{words.voiceError[language]}</p>}
      <button
        className="text-button voice-next"
        onClick={() => {
          audio.current?.pause();
          onContinue();
        }}
      >
        {heard ? words.voiceContinue[language] : words.voiceSkip[language]}{" "}
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
