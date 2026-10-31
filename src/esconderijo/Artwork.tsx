import { iso } from "./iso";
import type { IconName } from "./cards";
const stroke = { strokeLinecap: "round", strokeLinejoin: "round" } as const;
const icons: Record<IconName, React.ReactNode> = {
  backpack: (
    <>
      <path
        d="M20 12v-3h8v3"
        fill="none"
        stroke="#e2d3b7"
        strokeWidth="2.5"
        {...stroke}
      />
      <rect x="9" y="12" width="30" height="30" rx="10" fill="#82967b" />
      <path d="M9 24h30" stroke="#5f7059" strokeWidth="2.5" />
      <rect x="15" y="29" width="18" height="10" rx="3" fill="#5f7059" />
      <rect x="21" y="26" width="6" height="5" rx="1.5" fill="#d8b87c" />
    </>
  ),
  flare: (
    <>
      <rect
        x="20"
        y="18"
        width="9"
        height="24"
        rx="2"
        fill="#b86a5a"
        transform="rotate(20 24 30)"
      />
      <path d="M30 12l3-6 2 6 6 1-6 3-1 6-3-6-6-1z" fill="#d8b87c" />
    </>
  ),
  zipline: (
    <>
      <path d="M4 12l40 18" stroke="#e2d3b7" strokeWidth="2" {...stroke} />
      <path d="M24 21v8" stroke="#ae9ab9" strokeWidth="2.5" {...stroke} />
      <rect x="19" y="29" width="10" height="9" rx="3" fill="#ae9ab9" />
    </>
  ),
  key: (
    <>
      <circle
        cx="16"
        cy="18"
        r="8"
        fill="none"
        stroke="#d8b87c"
        strokeWidth="4"
      />
      <path
        d="M22 24l18 18M32 34l5-5M37 39l4-4"
        stroke="#d8b87c"
        strokeWidth="4"
        {...stroke}
      />
    </>
  ),
  battery: (
    <>
      <rect
        x="11"
        y="14"
        width="26"
        height="22"
        rx="4"
        fill="#29384b"
        stroke="#82967b"
        strokeWidth="2.5"
      />
      <rect x="37" y="21" width="4" height="8" rx="1" fill="#82967b" />
      <path
        d="M17 21v8M23 21v8M29 21v8"
        stroke="#d8b87c"
        strokeWidth="3"
        {...stroke}
      />
    </>
  ),
  musicbox: (
    <>
      <rect x="8" y="22" width="32" height="18" rx="3" fill="#8a6b4d" />
      <path d="M8 22l4-8h24l4 8z" fill="#a58660" />
      <path
        d="M31 8v10M31 8l7 2"
        stroke="#ae9ab9"
        strokeWidth="2.5"
        fill="none"
        {...stroke}
      />
      <circle cx="28" cy="19" r="3" fill="#ae9ab9" />
    </>
  ),
  duck: (
    <>
      <ellipse cx="22" cy="32" rx="14" ry="9" fill="#d8b87c" />
      <circle cx="30" cy="18" r="8" fill="#d8b87c" />
      <path d="M37 18h7l-5 4z" fill="#b86a5a" />
      <circle cx="32" cy="16" r="1.5" fill="#172230" />
    </>
  ),
  can: (
    <>
      <rect x="14" y="8" width="20" height="34" rx="4" fill="#29384b" />
      <path d="M14 14h20M14 36h20" stroke="#82967b" strokeWidth="2" />
      <path d="M21 18l-3 8h5l-2 8 7-11h-5l3-5z" fill="#d8b87c" />
    </>
  ),
  collar: (
    <>
      <path
        d="M8 18c6 14 26 14 32 0"
        fill="none"
        stroke="#ae9ab9"
        strokeWidth="5"
        {...stroke}
      />
      <path
        d="M24 28l2.4 5 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4-3.9-3.8 5.4-.8z"
        fill="#d8b87c"
      />
    </>
  ),
  star: (
    <path
      d="M24 5l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z"
      fill="#d8b87c"
    />
  ),
  bolt: (
    <>
      <path
        d="M24 40C10 30 8 22 12 16c4-5 10-3 12 1 2-4 8-6 12-1 4 6 2 14-12 24z"
        fill="#b86a5a"
      />
      <path
        d="M26 14l-6 11h6l-3 9"
        fill="none"
        stroke="#e2d3b7"
        strokeWidth="2.5"
        {...stroke}
      />
    </>
  ),
  map: (
    <>
      <path d="M6 12l12-4 12 4 12-4v28l-12 4-12-4-12 4z" fill="#e2d3b7" />
      <path d="M18 8v28M30 12v28" stroke="#b9a98a" strokeWidth="1.5" />
      <path
        d="M12 28c6-8 10 2 16-6"
        fill="none"
        stroke="#b86a5a"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
    </>
  ),
};
export function CardIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="esc-icon">
      {icons[name]}
    </svg>
  );
}
const pt = (p: [number, number]) => p.join(",");
function Box({
  s,
  t,
  w,
  d,
  h,
  top,
  left,
  right,
  stroke = "#161c26",
}: {
  s: number;
  t: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  stroke?: string;
}) {
  const up = (p: [number, number]): [number, number] => [p[0], p[1] - h];
  const a = iso(s, t),
    b = iso(s + w, t),
    c = iso(s + w, t + d),
    e = iso(s, t + d);
  return (
    <g stroke={stroke} strokeWidth="2" strokeLinejoin="round">
      <path d={`M${pt(b)}L${pt(c)}L${pt(up(c))}L${pt(up(b))}Z`} fill={left} />
      <path d={`M${pt(e)}L${pt(c)}L${pt(up(c))}L${pt(up(e))}Z`} fill={right} />
      <path
        d={`M${pt(up(a))}L${pt(up(b))}L${pt(up(c))}L${pt(up(e))}Z`}
        fill={top}
      />
    </g>
  );
}
/** The same black cat as the museum, curled up; `awake` raises its head. */
export function Cat({ awake }: { awake: boolean }) {
  return (
    <g
      className="esc-cat"
      stroke="#101720"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M-34 6Q-40 -10 -22 -14Q0 -22 22 -12Q40 -4 32 8Q10 16 -16 14Q-30 14 -34 6Z"
        fill="#171c26"
      />
      <path
        d="M24 6Q42 12 30 20Q10 26 -14 20"
        fill="none"
        stroke="#171c26"
        strokeWidth="9"
      />
      <g className={awake ? "esc-head esc-head-up" : "esc-head"}>
        <path
          d="M-30 -2Q-40 -14 -28 -24L-30 -38L-18 -28L-6 -28L4 -38L4 -22Q10 -8 -2 0Q-14 6 -30 -2Z"
          fill="#171c26"
        />
        <path
          d="M-28 -34L-27 -27L-21 -29M0 -34L0 -26L-5 -28"
          fill="#59444c"
          stroke="none"
        />
        {awake ? (
          <>
            <circle cx="-21" cy="-17" r="2.4" fill="#d2b974" stroke="none" />
            <circle cx="-8" cy="-17" r="2.4" fill="#d2b974" stroke="none" />
          </>
        ) : (
          <path
            d="M-25 -16L-18 -15M-11 -15L-4 -17"
            stroke="#d2b974"
            strokeWidth="2.5"
          />
        )}
        <path d="M-16 -10L-14 -8L-12 -11" fill="#8b6b68" stroke="none" />
        <path
          d="M-30 -10L-42 -12M-30 -6L-42 -4M-2 -9L10 -12"
          stroke="#657073"
          strokeWidth="1"
        />
      </g>
    </g>
  );
}
export function RoomArt({
  glow,
  awake,
  dim,
  warm,
  close,
}: {
  glow: boolean;
  awake: boolean;
  dim: boolean;
  warm: boolean;
  close: boolean;
}) {
  const cc = iso(206, 95);
  const bagA = iso(44, 60);
  const bagB = iso(30, 138);
  const can = iso(86, 150);
  return (
    <svg
      viewBox="0 0 700 640"
      className={`esc-art ${dim ? "esc-dim" : ""} ${warm ? "esc-warm" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="esc-wall"
          x1="100"
          y1="100"
          x2="500"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3a4350" />
          <stop offset="1" stopColor="#242d36" />
        </linearGradient>
        <radialGradient id="esc-lamp">
          <stop stopColor="#e4b96d" stopOpacity=".55" />
          <stop offset="1" stopColor="#e4b96d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="esc-sky" x2="0" y2="1">
          <stop stopColor="#2c3157" />
          <stop offset="1" stopColor="#b79fbe" />
        </linearGradient>
        <pattern
          id="esc-floor"
          width="90"
          height="43"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-25)"
        >
          <path d="M0 0H90V43H0Z" stroke="#372f30" strokeWidth="1" />
          <path d="M8 9L69 12M20 31L80 30" stroke="#856951" opacity=".2" />
        </pattern>
        <clipPath id="esc-lens">
          <circle cx="86" cy="150" r="40" />
        </clipPath>
      </defs>
      {/* architecture, same camera as the museum */}
      <path
        d="M46 92L484 40L653 144L652 502L466 613L44 511Z"
        fill="#111b26"
        stroke="#0f1821"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path d="M48 91L484 43L484 442L47 497Z" fill="url(#esc-wall)" />
      <path d="M484 43L651 146L651 500L484 442Z" fill="#212b36" />
      <path d="M47 497L484 442L651 500L466 610L47 510Z" fill="#6d5544" />
      <path
        d="M47 497L484 442L651 500L466 610L47 510Z"
        fill="url(#esc-floor)"
      />
      <path
        d="M49 480L484 427L649 485M484 48V428"
        stroke="#141f29"
        strokeWidth="5"
      />
      <path d="M48 96L484 50L646 150" stroke="#828075" opacity=".2" />
      {/* back wall plane */}
      <g transform="translate(48 91) skewY(-6.3)">
        <path d="M0 0H436V30H0Z" fill="#4a3a2c" opacity=".55" />
        {/* hatch + ladder */}
        <path
          d="M186 6H266V46H186Z"
          fill="#1a2433"
          stroke="#8a6b4d"
          strokeWidth="5"
        />
        <path d="M194 12H258V40H194Z" fill="#3a4b6a" opacity=".5" />
        <path
          d="M204 46V346M248 46V346"
          stroke="#a58660"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M204 78h44M204 112h44M204 146h44M204 180h44M204 214h44M204 248h44M204 282h44M204 316h44"
          stroke="#8a6b4d"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* string lights */}
        <path
          d="M14 70Q90 118 176 84M280 84Q360 120 424 72"
          stroke="#2a3340"
          strokeWidth="2.5"
        />
        {[
          [44, 98],
          [86, 110],
          [130, 106],
          [316, 108],
          [358, 112],
          [396, 96],
        ].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="22" fill="url(#esc-lamp)" />
            <circle cx={x} cy={y} r="5" fill="#f0cf8d" />
          </g>
        ))}
        {/* workbench: the top and the wall above it stay empty for later drops */}
        <path
          d="M34 262H178V276H34Z"
          fill="#8a6b4d"
          stroke="#161c26"
          strokeWidth="2"
        />
        <path
          d="M44 276V398M168 276V398M44 336H168"
          stroke="#5e4630"
          strokeWidth="7"
        />
        {/* pegboard with hooks: rope coil and a flashlight */}
        <path
          d="M296 150H420V250H296Z"
          fill="#3a2f26"
          stroke="#161c26"
          strokeWidth="2"
        />
        <path
          d="M312 166h12M360 166h12M396 166h12M312 230h12M396 230h12"
          stroke="#6d5544"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="342" cy="196" r="18" stroke="#c9b48a" strokeWidth="6" />
        <circle cx="342" cy="196" r="7" stroke="#c9b48a" strokeWidth="4" />
        <path
          d="M388 172v44"
          stroke="#5f7059"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle
          cx="388"
          cy="166"
          r="9"
          fill="#f0cf8d"
          stroke="#161c26"
          strokeWidth="2"
        />
      </g>
      {/* right wall plane: periscope */}
      <g transform="translate(484 43) skewY(31.6)">
        <path d="M80 0V104" stroke="#586577" strokeWidth="16" />
        <circle
          cx="86"
          cy="150"
          r="46"
          fill="#3a4658"
          stroke="#161c26"
          strokeWidth="2"
        />
        <g clipPath="url(#esc-lens)">
          <rect x="40" y="104" width="92" height="92" fill="url(#esc-sky)" />
          <circle cx="112" cy="128" r="7" fill="#efe3c4" />
          <path d="M60 180Q86 168 140 176V200H40Z" fill="#1c2432" />
          <path d="M84 178V146" stroke="#0f1620" strokeWidth="3" />
          <path
            d="M84 150q-24-2-26-9 11 2 26 3 15-1 26-3-2 7-26 9M84 140q-17-1-19-7 9 2 19 2t19-2q-2 6-19 7M84 130q-11-1-13-5 6 1 13 1t13-1q-2 4-13 5"
            fill="#0f1620"
          />
        </g>
        <circle
          cx="86"
          cy="150"
          r="40"
          fill="none"
          stroke="#6a788b"
          strokeWidth="5"
        />
        <path
          d="M62 124q22-14 48 0"
          stroke="#fff"
          strokeOpacity=".16"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
      {/* floor light pool */}
      <ellipse
        cx="300"
        cy="530"
        rx="210"
        ry="62"
        fill="url(#esc-lamp)"
        className="esc-pool"
      />
      {/* his backpack, tidy; hers leans on it, overflowing with loot */}
      <g transform={`translate(${bagA[0]} ${bagA[1]})`}>
        <g className={close ? "esc-bag esc-closer-his" : "esc-bag"}>
          <ellipse cx="0" cy="4" rx="40" ry="9" fill="#0b121b" opacity=".5" />
          <path d="M-9 -88q9-14 18 0" stroke="#e2d3b7" strokeWidth="5" />
          <rect
            x="-34"
            y="-84"
            width="68"
            height="86"
            rx="22"
            fill="#a58660"
            stroke="#161c26"
            strokeWidth="2"
          />
          <path d="M-34 -50H34" stroke="#8a6b4d" strokeWidth="3" />
          <rect
            x="-22"
            y="-36"
            width="44"
            height="30"
            rx="8"
            fill="#8a6b4d"
            stroke="#161c26"
            strokeWidth="2"
          />
          <rect
            x="-6"
            y="-48"
            width="12"
            height="9"
            rx="2"
            fill="#d8b87c"
            stroke="#161c26"
            strokeWidth="2"
          />
          <path
            d="M-34 -64q-10 24 0 50M34 -64q10 24 0 50"
            stroke="#6f533a"
            strokeWidth="5"
            fill="none"
          />
        </g>
      </g>
      <g transform={`translate(${bagB[0]} ${bagB[1]})`}>
        <g className={close ? "esc-bag esc-closer-hers" : "esc-bag esc-lean"}>
          <ellipse cx="0" cy="4" rx="44" ry="9" fill="#0b121b" opacity=".5" />
          <path
            d="M-22 -92l-10-26M-8 -94l2-34M10 -94l14-22"
            stroke="#b86a5a"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle
            cx="-34"
            cy="-118"
            r="6"
            fill="#f0cf8d"
            stroke="#161c26"
            strokeWidth="2"
          />
          <path
            d="M6 -96q16-10 24 2t-8 20"
            stroke="#e2d3b7"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="-38"
            y="-92"
            width="76"
            height="94"
            rx="24"
            fill="#82967b"
            stroke="#161c26"
            strokeWidth="2"
          />
          <path d="M-38 -54H38" stroke="#5f7059" strokeWidth="3" />
          <rect
            x="-26"
            y="-42"
            width="52"
            height="34"
            rx="9"
            fill="#5f7059"
            stroke="#161c26"
            strokeWidth="2"
          />
          <circle cx="0" cy="-26" r="6" fill="#ae9ab9" />
          <path
            d="M-38 -22q-16 8-6 26M30 -4q22 4 14 22"
            stroke="#e2d3b7"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M-12 -92v-8" stroke="#e2d3b7" strokeWidth="5" />
        </g>
      </g>
      {/* pink can on her side (unbranded) */}
      <g transform={`translate(${can[0]} ${can[1]})`}>
        <ellipse cx="0" cy="3" rx="13" ry="4" fill="#0b121b" opacity=".5" />
        <rect
          x="-11"
          y="-38"
          width="22"
          height="40"
          rx="5"
          fill="#e87fa8"
          stroke="#161c26"
          strokeWidth="2"
        />
        <path
          d="M-11 -28h22M-11 -10h22"
          stroke="#fff"
          strokeOpacity=".45"
          strokeWidth="2"
        />
        <path
          d="M-2 -24l-4 9h6l-3 9"
          stroke="#7a2a4a"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
      </g>
      {/* stash crate, glowing, cat curled on top */}
      <ellipse
        cx={cc[0]}
        cy={cc[1] - 40}
        rx="150"
        ry="78"
        fill="url(#esc-lamp)"
        opacity={glow ? 1 : 0.7}
        className="esc-crate-glow"
      />
      <Box
        s={150}
        t={62}
        w={112}
        d={66}
        h={70}
        top="#b08a5e"
        left="#8a6b4d"
        right="#6f533a"
      />
      <g transform={`translate(${cc[0] + 4} ${cc[1] - 70})`}>
        <Cat awake={awake} />
      </g>
    </svg>
  );
}
export function TopsideArt() {
  return (
    <svg
      viewBox="0 0 400 440"
      className="esc-art esc-art-top"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="top-sky" x2="0" y2="1">
          <stop stopColor="#0a1220" />
          <stop offset="1" stopColor="#26394a" />
        </linearGradient>
        <linearGradient id="top-beam" x2="0" y2="1">
          <stop stopColor="#cfe3ff" stopOpacity=".34" />
          <stop offset="1" stopColor="#cfe3ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="top-glow">
          <stop stopColor="#e4b96d" stopOpacity=".85" />
          <stop offset="1" stopColor="#e4b96d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="440" fill="url(#top-sky)" />
      <circle cx="320" cy="60" r="16" fill="#cfd2c8" opacity=".5" />
      <g fill="#cfd8e3" opacity=".6">
        <circle cx="50" cy="40" r="1.4" />
        <circle cx="140" cy="70" r="1.1" />
        <circle cx="230" cy="30" r="1.3" />
        <circle cx="360" cy="120" r="1" />
        <circle cx="90" cy="120" r="1" />
      </g>
      {/* searchlights */}
      <g className="esc-beam esc-beam-a">
        <path d="M70 300L20 -20L120 -20Z" fill="url(#top-beam)" />
      </g>
      <g className="esc-beam esc-beam-b">
        <path d="M340 310L290 -20L390 -20Z" fill="url(#top-beam)" />
      </g>
      {/* distant machine: dome body on thin legs, one dim eye */}
      <g transform="translate(0 -62)">
        <g className="esc-arc" fill="#0c141f" stroke="#0c141f">
          <path d="M232 200Q238 160 268 158Q298 160 304 200Z" />
          <path d="M268 158V138M268 138l-8-12M268 138l8-10" strokeWidth="2.5" />
          <path
            d="M240 198L222 262M254 200L246 274M282 200L290 274M296 198L316 262"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="268"
            cy="182"
            r="4"
            fill="#b86a5a"
            stroke="none"
            opacity=".85"
          />
        </g>
      </g>
      {/* ruined skyline */}
      <path
        d="M0 300V200L26 196V230L48 226V176L82 170V250L110 244V212L142 208V270L170 264V222L196 218V300Z"
        fill="#101a28"
      />
      <path
        d="M200 300V240L226 236V206L252 202V258L284 254V190L312 186V230L344 226V262L372 258V210L400 206V300Z"
        fill="#0e1724"
      />
      <path d="M0 300H400V440H0Z" fill="#101a24" />
      <path
        d="M0 304Q100 296 200 306T400 300"
        stroke="#26394a"
        strokeWidth="2"
      />
      <g fill="#1a2634">
        <path d="M30 330l24-4 16 14-30 4z" />
        <path d="M320 350l30-6 12 16-34 4z" />
        <path d="M120 392l34-6 10 14-38 4z" />
      </g>
      {/* extraction point */}
      <ellipse
        cx="200"
        cy="332"
        rx="62"
        ry="16"
        fill="url(#top-glow)"
        className="esc-extract"
      />
      <ellipse
        cx="200"
        cy="332"
        rx="30"
        ry="8"
        fill="none"
        stroke="#f0cf8d"
        strokeWidth="2"
        opacity=".8"
      />
      <path
        d="M170 332V120M230 332V120"
        stroke="#e4b96d"
        strokeOpacity=".07"
        strokeWidth="1"
      />
      {/* two raiders: featureless, storybook style, both women */}
      <g
        fill="#070d16"
        stroke="#070d16"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <g transform="translate(164 338) scale(1.35)">
          <ellipse cx="0" cy="2" rx="14" ry="4" opacity=".5" />
          <path d="M-8 -60q8-10 16 0q6 12 8 56h-32q2-44 8-56z" />
          <circle cx="0" cy="-70" r="9" />
          <path d="M-9 -72q-6 14-3 30M9 -72q6 14 3 30" strokeWidth="5" />
          <rect x="-16" y="-52" width="10" height="26" rx="4" />
        </g>
        <g transform="translate(236 338) scale(1.35)">
          <ellipse cx="0" cy="2" rx="14" ry="4" opacity=".5" />
          <path d="M-8 -58q8-10 16 0q6 12 8 54h-32q2-42 8-54z" />
          <circle cx="0" cy="-67" r="9" />
          <circle cx="2" cy="-79" r="6" />
          <rect x="6" y="-50" width="12" height="30" rx="4" />
          <path d="M-14 -36l-12 -8" strokeWidth="5" />
        </g>
      </g>
      <path d="M0 440V380Q200 352 400 380V440Z" fill="#0a121c" opacity=".7" />
    </svg>
  );
}
