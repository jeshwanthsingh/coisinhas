import type { Language } from "../content/museumContent";
import type { SundayState, SundayEvent, Activity, Game } from "./state";
import { c } from "./content";
import { SundayArtwork, WeatherArt } from "./SundayArtwork";
export function SundayApartment({
  state,
  language,
  dispatch,
  activity,
  gameMode,
  catBetween,
  onCat,
  onActivity,
  onCassette,
}: {
  state: SundayState;
  language: Language;
  dispatch: (e: SundayEvent) => void;
  activity: Activity | null;
  gameMode: Game | null;
  catBetween: boolean;
  onCat: () => void;
  onActivity: (a: Activity) => void;
  onCassette: () => void;
}) {
  const evening = ["voice", "postcard", "ending"].includes(state.scene);
  const sunset = ["sunset", "closeness"].includes(state.scene);
  const description = evening
    ? c.roomEvening
    : sunset
      ? c.roomSunset
      : state.scene === "afternoon"
        ? c.roomAfternoon
        : c.roomMorning;
  return (
    <div className="sun-apartment">
      <div role="img" aria-label={description[language]}>
        <SundayArtwork
          state={state}
          activity={activity}
          gameMode={gameMode}
          catBetween={catBetween}
        />
      </div>
      {state.scene === "morning" && (
        <div
          className="sun-weather-charms"
          role="group"
          aria-label={c.weather[language]}
        >
          {(["rain", "sun"] as const).map((w) => (
            <button
              key={w}
              className="sun-weather-charm"
              aria-pressed={state.weather === w}
              onClick={() => dispatch({ type: "weather", value: w })}
            >
              <WeatherArt sun={w === "sun"} />
              <span>{c[w][language]}</span>
            </button>
          ))}
        </div>
      )}
      {state.scene === "afternoon" &&
        !activity &&
        (["food", "tv", "game"] as const).map((a) => (
          <button
            key={a}
            className={`sun-hotspot sun-hotspot-${a}`}
            aria-label={c[a][language]}
            onClick={() => onActivity(a)}
          >
            <span aria-hidden="true">✧</span>
          </button>
        ))}
      {state.scene === "sunset" &&
        (["sofa", "window"] as const).map((seat) => (
          <button
            key={seat}
            className={`sun-hotspot sun-hotspot-${seat}`}
            aria-label={c[seat][language]}
            aria-pressed={state.seat === seat}
            onClick={() => dispatch({ type: "seat", value: seat })}
          >
            <span aria-hidden="true">✧</span>
          </button>
        ))}
      {sunset && (
        <button
          className="sun-hotspot sun-hotspot-cat"
          aria-label={c.cat[language]}
          onClick={onCat}
        >
          <span aria-hidden="true">✧</span>
        </button>
      )}
      {state.scene === "voice" && (
        <button
          className="sun-hotspot sun-hotspot-cassette"
          aria-label={c.cassette[language]}
          onClick={onCassette}
        >
          <span aria-hidden="true">✧</span>
        </button>
      )}
    </div>
  );
}
