import { useState } from "react";
import type { Language } from "../content/museumContent";
import type { SundayState, SundayEvent, Activity, Game } from "./state";
import { c } from "./content";
export function SundayAfternoon({
  state,
  language,
  dispatch,
  activity,
  onActivity,
  gameMode,
  onGameMode,
  resolved,
  onResolved,
}: {
  state: SundayState;
  language: Language;
  dispatch: (e: SundayEvent) => void;
  activity: Activity | null;
  onActivity: (a: Activity | null) => void;
  gameMode: Game | null;
  onGameMode: (g: Game) => void;
  resolved: boolean;
  onResolved: () => void;
}) {
  const [mealPicked, setMealPicked] = useState(false);
  function choose(a: Activity | null) {
    setMealPicked(false);
    onActivity(a);
  }
  return (
    <>
      {!activity ? (
        <>
          <p className="sun-hint">{c.activityHint[language]}</p>
          <div className="sun-activity-links">
            {(["food", "tv", "game"] as const).map((a) => (
              <button key={a} onClick={() => choose(a)}>
                <span aria-hidden="true">
                  {state.activities.includes(a) ? "✦" : "✧"}
                </span>
                {c[a][language]}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>
            {
              c[
                activity === "food"
                  ? "foodPrompt"
                  : activity === "tv"
                    ? "tvPrompt"
                    : "gamePrompt"
              ][language]
            }
          </h2>
          {activity === "food" && (
            <>
              <div className="sun-choices">
                {(["sushi", "pasta"] as const).map((value) => (
                  <button
                    key={value}
                    aria-pressed={mealPicked && state.food === value}
                    onClick={() => {
                      dispatch({ type: "food", value });
                      setMealPicked(true);
                    }}
                  >
                    {c[value][language]}
                  </button>
                ))}
              </div>
              {mealPicked && (
                <>
                  <p>{c.platePrompt[language]}</p>
                  <div className="sun-choices">
                    {(["share", "defend"] as const).map((value) => (
                      <button
                        key={value}
                        aria-pressed={resolved && state.plate === value}
                        onClick={() => {
                          dispatch({ type: "plate", value });
                          onResolved();
                        }}
                      >
                        {c[value][language]}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {resolved && (
                <p className="sun-reply" role="status">
                  {
                    c[
                      state.plate === "share"
                        ? "shareReply"
                        : state.food === "sushi"
                          ? "sushiDefend"
                          : "pastaDefend"
                    ][language]
                  }
                </p>
              )}
            </>
          )}
          {activity === "tv" && (
            <>
              <div className="sun-choices">
                {(["comedy", "drama"] as const).map((value) => (
                  <button
                    key={value}
                    aria-pressed={resolved && state.channel === value}
                    onClick={() => {
                      dispatch({ type: "tv", value });
                      onResolved();
                    }}
                  >
                    {c[value][language]}
                  </button>
                ))}
              </div>
              {resolved && (
                <div role="status">
                  {state.channel === "drama" && (
                    <p className="sun-hint">{c.dramaAside[language]}</p>
                  )}
                  <p className="sun-reply">{c.tvReply[language]}</p>
                </div>
              )}
            </>
          )}
          {activity === "game" && (
            <>
              <div className="sun-choices">
                {(["coop", "competitive"] as const).map((value) => (
                  <button
                    key={value}
                    aria-pressed={gameMode === value}
                    onClick={() => onGameMode(value)}
                  >
                    {c[value][language]}
                  </button>
                ))}
              </div>
              {gameMode && !resolved && (
                <>
                  <p className="sun-hint">
                    {gameMode === "competitive" && c.unfair[language]}
                  </p>
                  <button
                    className="sun-next"
                    onClick={() => {
                      dispatch({ type: "game", value: gameMode });
                      onResolved();
                    }}
                  >
                    {c[gameMode === "coop" ? "push" : "race"][language]}
                  </button>
                </>
              )}
              {resolved && (
                <p className="sun-reply" role="status">
                  {
                    c[state.game === "coop" ? "coopReply" : "competitiveReply"][
                      language
                    ]
                  }
                </p>
              )}
            </>
          )}
          <button className="sun-text" onClick={() => choose(null)}>
            ← {c.another[language]}
          </button>
        </>
      )}
      {state.activities.length > 0 && (!activity || resolved) && (
        <button
          className="sun-next"
          onClick={() => dispatch({ type: "to-sunset" })}
        >
          {c.sunsetGo[language]}
        </button>
      )}
    </>
  );
}
