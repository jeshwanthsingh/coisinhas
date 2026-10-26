import type { Language } from "../content/museumContent";
import type { SundayState, SundayEvent } from "./state";
import { c } from "./content";
export function SundayMorning({
  state,
  language,
  dispatch,
}: {
  state: SundayState;
  language: Language;
  dispatch: (e: SundayEvent) => void;
}) {
  return (
    <>
      <h2>{c.weather[language]}</h2>
      {state.weather && (
        <>
          <p className="sun-reply" role="status">
            {c[`${state.weather}Reply`][language]}
          </p>
          <h3>{c.alarm[language]}</h3>
          <div className="sun-choices">
            {(["snooze", "rise"] as const).map((value) => (
              <button
                key={value}
                aria-pressed={state.morning === value}
                onClick={() => dispatch({ type: "morning", value })}
              >
                {c[value][language]}
              </button>
            ))}
          </div>
          {state.morning && (
            <>
              <p className="sun-reply" role="status">
                {c[`${state.morning}Reply`][language]}
              </p>
              <button
                className="sun-next"
                onClick={() => dispatch({ type: "to-afternoon" })}
              >
                {c.afternoonGo[language]}
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
