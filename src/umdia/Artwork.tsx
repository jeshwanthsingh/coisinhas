import type { Art } from "./content";

const ink = "#8b4a3c";
const soft = "#c9b99c";
const line = {
  fill: "none",
  stroke: ink,
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Small original drawings for each page, in the ink of the diary. */
export function PageArt({ art }: { art: Art }) {
  return (
    <svg className="ud-art" viewBox="0 0 120 90" aria-hidden="true">
      {art === "phone" && (
        <g {...line}>
          <rect x="44" y="8" width="32" height="70" rx="6" />
          <path d="M55 70h10" />
          <rect x="49" y="22" width="22" height="13" rx="3" fill="#d8b87c55" />
          <text
            x="60"
            y="32"
            fill={ink}
            stroke="none"
            fontSize="10"
            fontFamily="Georgia, serif"
            textAnchor="middle"
          >
            Jes
          </text>
          <path d="M88 30l8-6M90 42h10M88 54l8 6" />
        </g>
      )}
      {art === "cloud" && (
        <g {...line}>
          <circle cx="84" cy="24" r="10" />
          <path d="M84 6v4M84 38v4M66 24h4M98 24h4" />
          <path d="M26 66c-9 0-14-6-12-13 2-6 8-8 13-6 2-10 15-13 22-5 8-2 15 4 14 12 7 1 9 12 0 12z" />
          <path d="M36 80h2M48 80h2M60 80h2" />
        </g>
      )}
      {art === "cat" && (
        <g {...line}>
          <path d="M22 70c0-18 16-30 38-30s38 12 38 30z" fill="#e8dcc4" />
          <path d="M34 44l4-12 8 10M58 40l6-11 5 12" />
          <path d="M98 70c8 0 12-8 4-14" />
          <path d="M40 54c2 2 4 2 6 0M54 54c2 2 4 2 6 0" />
          <path d="M14 76h92" stroke={soft} />
        </g>
      )}
      {art === "stars" && (
        <g {...line}>
          <path d="M34 20l4 10 10 1-8 6 3 10-9-6-9 6 3-10-8-6 10-1z" />
          <path d="M86 40l4 10 10 1-8 6 3 10-9-6-9 6 3-10-8-6 10-1z" />
          <path
            d="M44 42c10 10 22 14 34 12"
            strokeDasharray="2 6"
            stroke={soft}
          />
        </g>
      )}
      {art === "plates" && (
        <g {...line}>
          <circle cx="38" cy="46" r="24" />
          <circle cx="38" cy="46" r="12" />
          <circle cx="84" cy="46" r="24" />
          <circle cx="84" cy="46" r="12" />
          <path d="M8 26v40M110 26v40" />
        </g>
      )}
      {art === "blank" && (
        <rect
          x="30"
          y="12"
          width="60"
          height="66"
          rx="6"
          fill="none"
          stroke={soft}
          strokeWidth="2"
          strokeDasharray="5 6"
        />
      )}
      {art === "hug" && (
        <g {...line}>
          <circle cx="47" cy="22" r="10" />
          <circle cx="73" cy="22" r="10" />
          <path d="M28 84c0-22 9-38 21-38 8 0 12 6 9 14M92 84c0-22-9-38-21-38-8 0-12 6-9 14" />
          <path d="M60 46c-3-5-10-4-10 2 0 5 10 10 10 10s10-5 10-10c0-6-7-7-10-2z" fill="#b3473d33" />
        </g>
      )}
    </svg>
  );
}

/** The closed diary shown on arrival. */
export function ClosedDiary() {
  return (
    <svg className="ud-closed" viewBox="0 0 320 210" aria-hidden="true">
      <path d="M20 182h280" stroke="#82778b66" strokeWidth="2" />
      <rect x="78" y="34" width="164" height="142" rx="6" fill="#6e4a3a" />
      <rect x="86" y="40" width="152" height="130" rx="4" fill="#8b5a44" />
      <path d="M96 40v130" stroke="#5a3a2c" strokeWidth="3" />
      <rect x="120" y="76" width="96" height="36" rx="3" fill="#e2d3b7" />
      <text
        x="168"
        y="100"
        fill="#2a2218"
        fontSize="17"
        fontFamily="Georgia, serif"
        textAnchor="middle"
      >
        um dia.
      </text>
      <path d="M196 40v-14l7 6 7-6v14" fill="#b3473d" />
      <path d="M200 170v22l6-5 6 5v-22" fill="#b3473d" />
      <circle cx="262" cy="52" r="3" fill="#d8b87c" />
      <circle cx="54" cy="70" r="2" fill="#d8b87c" />
      <circle cx="276" cy="120" r="2" fill="#ae9ab9" />
    </svg>
  );
}
