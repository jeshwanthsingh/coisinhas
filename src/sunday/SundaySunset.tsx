import type { Language } from "../content/museumContent";
import type { SundayState, SundayEvent } from "./state";
import { c, sunsetLines } from "./content";
import { StoryLines } from "./SundayOpening";
export function SundaySunset({
  state,
  language,
  dispatch,
  catBetween,
}: {
  state: SundayState;
  language: Language;
  dispatch: (e: SundayEvent) => void;
  catBetween: boolean;
}) {
  return (
    <>
      {state.scene === "sunset" ? (
        <>
          <h2>{c.seatPrompt[language]}</h2>
          <div className="sun-choices">
            {(["sofa", "window"] as const).map((value) => (
              <button
                key={value}
                aria-pressed={state.seat === value}
                onClick={() => dispatch({ type: "seat", value })}
              >
                {c[value][language]}
              </button>
            ))}
          </div>
          {state.seat && (
            <StoryLines
              lines={sunsetLines}
              language={language}
              action={c.stay[language]}
              onDone={() => dispatch({ type: "to-closeness" })}
            />
          )}
        </>
      ) : (
        <>
          <div className="sun-choices sun-close-choices">
            {(["hands", "lean", "quiet"] as const).map((value) => (
              <button
                key={value}
                aria-pressed={state.closeness === value}
                onClick={() => dispatch({ type: "closeness", value })}
              >
                {c[value][language]}
              </button>
            ))}
          </div>
          {state.closeness && (
            <>
              <p className="sun-reply" role="status">
                {c[`${state.closeness}Reply`][language]}
              </p>
              <button
                className="sun-next"
                onClick={() => dispatch({ type: "to-voice" })}
              >
                {c.eveningGo[language]}
              </button>
            </>
          )}
        </>
      )}
      {catBetween && (
        <p className="sun-hint" role="status">
          {c.catReply[language]}
        </p>
      )}
    </>
  );
}
