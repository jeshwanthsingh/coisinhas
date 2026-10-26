import { useId } from "react";
import type { SundayState, Activity, Game } from "./state";
export function WeatherArt({ sun }: { sun: boolean }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      {sun ? (
        <>
          <circle cx="30" cy="30" r="12" fill="#d5ad67" />
          <path
            d="M30 5v7M30 48v7M5 30h7M48 30h7M12 12l5 5M43 43l5 5M12 48l5-5M43 17l5-5"
            stroke="#a47d48"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M12 35q-10-11 3-17 5-14 18-5 14-5 16 10 12 8 1 14Z"
            fill="#8b9ca7"
          />
          <path
            d="M19 42l-4 9M32 42l-4 9M45 42l-4 9"
            stroke="#69818e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
export function Couple({
  close,
  cat,
}: {
  close: SundayState["closeness"];
  cat: boolean;
}) {
  return (
    <g className={`sun-couple ${close || ""}`}>
      <g className="sun-figure-one">
        <path
          d="M-44 3q-27 3-26 35l3 29h49l-4-30Q-20 8-44 3Z"
          fill="#997f95"
          stroke="#554c62"
          strokeWidth="2"
        />
        <circle cx="-44" cy="-13" r="17" fill="#b6a4aa" />
        <path
          d="M-54 64l-2 34 23 1M-30 65l12 30h20"
          fill="none"
          stroke="#65556b"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          className="sun-arm-one"
          d="M-58 22q2 26 29 28"
          stroke="#c6b4b5"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g className="sun-figure-two">
        <path
          d="M31 3q-26 3-28 33l3 31h51l-2-31Q54 6 31 3Z"
          fill="#c5b798"
          stroke="#7c756e"
          strokeWidth="2"
        />
        <circle cx="31" cy="-13" r="17" fill="#b6a4aa" />
        <path
          d="M17 65l-7 32 21 1M43 65l13 32h21"
          stroke="#7e7b79"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="sun-arm-two"
          d="M42 23q-1 27-26 27"
          stroke="#c6b4b5"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {cat && (
        <g transform="translate(-8 54) scale(.65)">
          <CatArt sleeping />
        </g>
      )}
    </g>
  );
}
export function CatArt({ sleeping = false }: { sleeping?: boolean }) {
  return (
    <g className={sleeping ? "sun-cat-sleep" : "sun-cat-stretch"}>
      <path d="M-28 10q-15-24 8-28 17-3 32 9l15 5-1 19h-49Z" fill="#252735" />
      <path d="M10-7l-1-20 13 10 13-8 1 22q-11 15-26-4Z" fill="#252735" />
      <path
        d="M-22 9q-32 7-27-16"
        stroke="#252735"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {sleeping ? (
        <path d="M16-5l4 2M27-4l4-2" stroke="#d8bd88" strokeWidth="1.5" />
      ) : (
        <>
          <circle cx="19" cy="-6" r="1.5" fill="#d8bd88" />
          <circle cx="29" cy="-6" r="1.5" fill="#d8bd88" />
        </>
      )}
    </g>
  );
}
export function SundayArtwork({
  state,
  activity,
  gameMode,
  catBetween,
}: {
  state: SundayState;
  activity: Activity | null;
  gameMode: Game | null;
  catBetween: boolean;
}) {
  const id = useId();
  const {
    scene,
    weather,
    morning,
    food,
    plate,
    channel,
    game,
    seat,
    closeness,
  } = state;
  const late = ["sunset", "closeness", "voice", "postcard", "ending"].includes(
    scene,
  );
  const night = ["voice", "postcard", "ending"].includes(scene);
  const seated = late || activity === "tv" || activity === "game";
  const windowSeat = late && seat === "window";
  const catX = late
    ? 690
    : morning === "rise"
      ? 615
      : weather === "rain"
        ? 535
        : 325;
  const catY = late
    ? 514
    : morning === "rise"
      ? 435
      : weather === "rain"
        ? 465
        : 534;
  return (
    <svg
      className="sun-room-svg"
      viewBox="0 0 800 650"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="var(--sun-sky-top)" />
          <stop offset="1" stopColor="var(--sun-sky-bottom)" />
        </linearGradient>
        <clipPath id={`${id}-glass`}>
          <path d="M302 72l366 12-4 241-363 10Z" />
        </clipPath>
        <pattern
          id={`${id}-cloth`}
          width="13"
          height="13"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 4h13M4 0v13" stroke="#d4bac1" strokeOpacity=".24" />
        </pattern>
      </defs>
      <path
        d="M36 65L693 38 773 124 772 529 55 567Z"
        fill="var(--sun-wall)"
        stroke="#363448"
        strokeWidth="3"
      />
      <path d="M693 38l80 86-1 405-78-71Z" fill="var(--sun-side)" />
      <path d="M55 455l639 3 78 71-206 96L35 550Z" fill="var(--sun-floor)" />
      <path
        d="M62 477l654 4M63 511l687 6M75 550l623 3M211 458l-87 107M352 458l-31 139M493 458l62 158M620 458l100 88"
        stroke="#776b69"
        strokeWidth="1.5"
        opacity=".4"
      />
      <path
        d="M288 60l395 13-4 267-392 11Z"
        fill="#9f8b78"
        stroke="#766b65"
        strokeWidth="3"
      />
      <path d="M302 72l366 12-4 241-363 10Z" fill={`url(#${id}-sky)`} />
      <g clipPath={`url(#${id}-glass)`}>
        <circle
          className="sun-sky-orb"
          opacity={weather === "rain" && !late ? 0 : 1}
          cx={late ? 550 : 585}
          cy={night ? 132 : late ? 277 : 139}
          r={late && !night ? 45 : 24}
          fill={night ? "#ede0bd" : "#f7d594"}
        />
        <path
          d="M295 268q55-25 107-1t113-8 158 2v92H295Z"
          fill="var(--sun-horizon)"
          opacity=".65"
        />
        <path
          d="M309 184q30-15 78 0M439 124q40-10 65 4"
          stroke="#e4dfd5"
          strokeWidth="8"
          opacity=".27"
          strokeLinecap="round"
        />
        {night && (
          <g fill="#ddd1c2">
            <circle cx="346" cy="119" r="1.5" />
            <circle cx="425" cy="165" r="1.5" />
            <circle cx="612" cy="199" r="1.5" />
            <circle cx="531" cy="106" r="1" />
          </g>
        )}
        {weather === "rain" && !night && (
          <g className="sun-rain" stroke="#9cadb7" strokeWidth="1.5">
            {Array.from({ length: 22 }, (_, i) => (
              <path
                key={i}
                d={`M${310 + ((i * 37) % 350)} ${65 + ((i * 67) % 270)}l-6 17`}
              />
            ))}
          </g>
        )}
      </g>
      <path d="M482 79l-2 251M300 217l366-3" stroke="#c9b99c" strokeWidth="8" />
      <path d="M290 345l390-9 15 14-407 13Z" fill="#d6c5a8" />
      <path d="M298 72q-28 82-2 222l-29 25q-25-128 8-250Z" fill="#cbbca9" />
      <path d="M670 82q27 87-1 218l28 13q24-112-13-230Z" fill="#cbbca9" />
      <path
        d="M283 81q-13 109 1 200M683 95q13 90-1 194"
        stroke="#a89b90"
        strokeWidth="2"
      />
      <path
        className="sun-daylight"
        d="M302 233L665 270 683 539 235 567Z"
        fill="#f5d399"
        opacity={night ? 0 : weather === "rain" ? 0.04 : late ? 0.27 : 0.17}
      />
      <g
        className="sun-leaf-shadow"
        stroke="#817f69"
        strokeWidth="5"
        opacity={weather === "sun" && !night ? 0.16 : 0}
      >
        <path d="M605 359q-80 52-167 182M584 383l-65-2M560 405l-12-49M533 433l-76-5M507 461l-15-49M478 493l-72-5" />
      </g>
      <g>
        <path
          d="M77 255l153-5 2 98-155 6Z"
          fill="#7f6f6e"
          stroke="#554e59"
          strokeWidth="3"
        />
        <path
          d="M87 264l130-4 1 75-130 7Z"
          fill={activity === "tv" ? "#d4cfc1" : "#39434b"}
        />
        <path
          d="M128 354l-7 15M181 350l8 16"
          stroke="#6d6062"
          strokeWidth="6"
        />
        {activity === "tv" && channel && (
          <g className={`sun-tv-show ${channel}`}>
            <path
              d="M117 320l9-26 16 1 10 25M168 318l5-25 16-2 10 26"
              fill="#535264"
            />
            <circle cx="134" cy="285" r="9" fill="#535264" />
            <circle cx="184" cy="280" r="9" fill="#535264" />
            {channel === "drama" && (
              <path d="M153 278l5-9 4 8-5 12Z" fill="#9f737c" />
            )}
          </g>
        )}
        <path d="M65 371l184-5-4 67-175 8Z" fill="#a58b76" />
        <path d="M76 388l151-5M80 418l143-5" stroke="#786b65" strokeWidth="3" />
        <path
          d="M87 390v24M103 388v25M121 389v23M140 386v26"
          stroke="#c0a3ad"
          strokeWidth="10"
        />
      </g>
      <g>
        <path
          d="M251 218l2 233M230 455h48"
          stroke="#786f66"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M224 161l45-4 19 70-82 5Z"
          fill={night || weather === "rain" ? "#edc78b" : "#c8b89d"}
          stroke="#9d876d"
          strokeWidth="2"
        />
        <path
          d="M240 163l-10 64M256 160l9 65"
          stroke="#b39a76"
          strokeWidth="2"
        />
        <path
          className="sun-lamp-light"
          d="M218 231L182 424 324 419 277 228Z"
          fill="#efc88b"
          opacity={night || weather === "rain" ? 0.18 : 0}
        />
      </g>
      <g>
        <path d="M338 365l263-5 10 21-278 7Z" fill="#bba58b" />
        <path
          d="M349 386l-7 64M589 382l8 62"
          stroke="#887869"
          strokeWidth="7"
        />
        <path d="M370 359q10-21 45-17l-1 18Z" fill="#a193a3" />
        <path d="M501 357q8-20 43-16l10 17Z" fill="#a7aa8e" />
      </g>
      {seated && windowSeat && (
        <g className="sun-seating" transform="translate(484 311) scale(.8)">
          <Couple close={closeness} cat={catBetween} />
        </g>
      )}
      <g>
        <path
          d="M432 395q0-25 28-29l209-8q30 0 32 29l1 88-266 10Z"
          fill="#9e8b9d"
          stroke="#6c6075"
          strokeWidth="3"
        />
        <path
          d="M454 402q-3-21 22-22l72-3q13 1 13 20l-2 48-105 2ZM569 396q0-22 20-22l63-2q24 0 23 23l-2 47-105 3Z"
          fill="#b2a0b1"
          stroke="#8d7b94"
          strokeWidth="2"
        />
        <path d="M443 442l244-9 9 46-251 11Z" fill="#a795a9" />
        <path
          d="M425 420q-13-5-17 9l4 61 41 1-1-62q-1-12-27-9M688 407q-12 0-11 17l1 61 40-6-1-61q-2-15-29-11"
          fill="#8c7a91"
          stroke="#6c6075"
          strokeWidth="2"
        />
        <path
          d="M430 490l-5 24M697 484l8 22"
          stroke="#6d6269"
          strokeWidth="8"
        />
        <path d="M620 389l45-3 2 65-44 15Z" fill="#a7af9d" />
        <path
          d="M625 396l36-4M627 406l35-4M628 416l35-3"
          stroke="#cad0ba"
          strokeWidth="2"
        />
      </g>
      {seated && !windowSeat && (
        <g
          className={`sun-seating ${activity === "tv" ? `sun-watching ${channel || ""}` : ""}`}
          transform={
            windowSeat ? "translate(484 311) scale(.8)" : "translate(563 387)"
          }
        >
          <Couple close={late ? closeness : null} cat={catBetween} />
        </g>
      )}
      <g>
        <path
          d="M151 445l222-12 35 44-252 20Z"
          fill="#c1a78a"
          stroke="#8a766b"
          strokeWidth="3"
        />
        <path
          d="M167 495l-8 69M383 482l12 69"
          stroke="#8b7566"
          strokeWidth="11"
        />
        <path d="M200 448l117-5 25 40-122 8Z" fill="#d8c4b7" />
        <path
          d="M216 448l19 37M233 447l20 37M251 446l21 37M269 445l21 36"
          stroke="#c0a5a3"
          strokeWidth="1.5"
        />
        {activity === "food" && food ? (
          <>
            <ellipse
              cx="272"
              cy="461"
              rx="54"
              ry="16"
              fill="#e6ddc6"
              stroke="#a49b91"
              strokeWidth="2"
            />
            {food === "sushi" ? (
              <g>
                {[246, 273, 300].map((x) => (
                  <g key={x}>
                    <path d={`M${x - 8} 450h17v13h-17Z`} fill="#3e4d4b" />
                    <ellipse cx={x} cy="450" rx="9" ry="5" fill="#eee4c9" />
                    <ellipse cx={x} cy="450" rx="4" ry="3" fill="#bf9084" />
                  </g>
                ))}
              </g>
            ) : (
              <path
                d="M242 459q25-20 57 0m-52-6q25 18 49 0m-54 9q25-15 56 1m-45-14q20 13 39 8"
                stroke="#d0a768"
                strokeWidth="4"
                strokeLinecap="round"
              />
            )}
            <path
              className={`sun-sneaky-hand ${plate || "waiting"}`}
              d="M387 441l-42 6-37 6q-11 7-3 9l41-3 44-8"
              fill="#b6a4aa"
              stroke="#82717e"
              strokeWidth="2"
            />
            {plate === "defend" && (
              <path
                className="sun-defending-fork"
                d="M306 419l-13 48M299 418l-4 15q4 7 13 4l5-16M306 420l-4 14"
                stroke="#6d7781"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
          </>
        ) : (
          <>
            <path d="M211 448h24v19h-24Z" fill="#c6b8c3" />
            <path d="M236 451q14-2 9 8l-9 2" stroke="#c6b8c3" strokeWidth="4" />
            <path d="M299 445h24v19h-24Z" fill="#a2ad96" />
            <path d="M324 448q14-2 9 8l-9 2" stroke="#a2ad96" strokeWidth="4" />
          </>
        )}
      </g>
      <g transform="translate(364 491) rotate(-8)">
        <path
          d="M0 0h39v25H0Z"
          fill="#c3b49b"
          stroke="#877b70"
          strokeWidth="2"
        />
        <circle cx="19" cy="12" r="9" fill="#e1d4bc" />
        <path
          className={
            morning === "snooze" ? "sun-clock-hand snoozed" : "sun-clock-hand"
          }
          d="M19 5v7l5 2"
          stroke="#746879"
          strokeWidth="2"
        />
        <path d="M5 25l-3 5M33 25l4 4" stroke="#877b70" strokeWidth="3" />
      </g>
      <g transform="translate(488 523)">
        <path
          d="M-29-5q28-14 57 0l13 25q0 10-11 5L16 13h-32l-15 13q-10 2-10-8Z"
          fill="#b4a1b9"
          stroke="#786a84"
          strokeWidth="2"
        />
        <path d="M-22 0v12M-28 6h12" stroke="#5a5366" strokeWidth="3" />
        <circle cx="-5" cy="-7" r="2" fill="#e3bf87" />
        <circle cx="4" cy="-7" r="2" fill="#b9c99f" />
        <circle cx="23" cy="2" r="3" fill="#d9b678" />
        <circle cx="30" cy="10" r="3" fill="#91a18c" />
      </g>
      {activity === "game" && (
        <g
          className={`sun-mini-game ${gameMode || game || ""} ${game ? "played" : ""}`}
          transform="translate(310 548) scale(1.35)"
        >
          <path d="M0 19h230" stroke="#958c7a" strokeWidth="2" />
          <path
            d="M187 18V-1l14-12 15 12v19Z"
            fill="#d2bb92"
            stroke="#887a6d"
            strokeWidth="2"
          />
          <circle className="sun-pea" cx="24" cy="10" r="9" fill="#7f9569" />
          <g
            className="sun-push-one"
            stroke="#806883"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <circle cx="0" cy="-3" r="4" fill="#b6a4aa" stroke="none" />
            <path d="M0 3v9l-5 8M0 12l7 8M0 6l13 5" />
          </g>
          <g
            className="sun-push-two"
            stroke="#d7c3a4"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <circle cx="11" cy="-10" r="4" fill="#b6a4aa" stroke="none" />
            <path d="M11-4v9l-5 7M11 5l7 7M11-1l13 6" />
          </g>
          {game === "competitive" && (
            <path d="M186-22l8 5 7-9 7 9 9-5-5 15h-22Z" fill="#d6b573" />
          )}
        </g>
      )}
      <g>
        <path
          d="M716 377l5-104M720 330q-40-8-39-34 31-5 40 21M720 298q34-3 39-32-29-4-39 19M720 278q-29-7-30-32 27-2 31 22"
          stroke="#687963"
          strokeWidth="4"
          fill="#899a7e"
        />
        <path
          d="M696 369h48l-8 45h-32Z"
          fill="#ad8c7b"
          stroke="#7f7167"
          strokeWidth="2"
        />
      </g>
      {!catBetween && (
        <g
          className="sun-cat-position"
          transform={`translate(${catX} ${catY})`}
        >
          <CatArt sleeping={late} />
        </g>
      )}
      {(scene === "voice" || scene === "postcard" || scene === "ending") && (
        <g transform="translate(269 464) rotate(-4)">
          <path
            d="M-33-17h66v37h-66Z"
            fill="#a698ae"
            stroke="#6d627e"
            strokeWidth="2"
          />
          <path d="M-24-8h48v17h-48Z" fill="#d9cbb7" />
          <circle cx="-13" cy="1" r="5" stroke="#7b7185" strokeWidth="2" />
          <circle cx="13" cy="1" r="5" stroke="#7b7185" strokeWidth="2" />
          <path d="M-9 1H9M-17 17h34" stroke="#7b7185" strokeWidth="2" />
        </g>
      )}
      <path
        d="M56 570l510 55 204-96"
        stroke="#2a2b3b"
        strokeWidth="3"
        opacity=".4"
      />
    </svg>
  );
}
