import { useId } from "react";
export function Moon({
  phase,
  south = false,
}: {
  phase: number;
  south?: boolean;
}) {
  const id = useId();
  const r = 40;
  const k = Math.cos(phase * Math.PI * 2);
  const waxing = phase < 0.5;
  const lit = `M50 10 A40 40 0 0 ${waxing ? 1 : 0} 50 90 A${Math.max(0.01, Math.abs(k) * r)} 40 0 0 ${waxing ? (k >= 0 ? 0 : 1) : k >= 0 ? 1 : 0} 50 10Z`;
  return (
    <svg
      className="p2-moon"
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ transform: south ? "rotate(180deg)" : undefined }}
    >
      <defs>
        <clipPath id={id}>
          <circle cx="50" cy="50" r="40" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="40" fill="#394353" />
      <path d={lit} fill="#e2d3b7" />
      <g clipPath={`url(#${id})`} fill="#7f7e80" opacity=".15">
        <circle cx="37" cy="33" r="9" />
        <circle cx="62" cy="63" r="12" />
        <circle cx="30" cy="65" r="5" />
      </g>
    </svg>
  );
}
export function Controller() {
  return (
    <svg viewBox="0 0 140 85" fill="none" aria-hidden="true">
      <path
        d="M36 19Q70 7 106 20L126 66Q128 82 113 77L91 58H50L28 77Q12 84 15 65Z"
        fill="#b4a2b5"
        stroke="#33333f"
        strokeWidth="3"
      />
      <path d="M40 27V49M29 38H51" stroke="#3e3d49" strokeWidth="7" />
      <circle cx="100" cy="30" r="5" fill="#d7ba82" />
      <circle cx="112" cy="42" r="5" fill="#82967b" />
      <path d="M63 40H74" stroke="#74677a" strokeWidth="4" />
    </svg>
  );
}
export function HubArt() {
  return (
    <svg viewBox="0 0 760 520" fill="none" aria-hidden="true">
      <path
        d="M30 95L540 40L730 130V407L520 495L30 426Z"
        fill="#293442"
        stroke="#111e2b"
        strokeWidth="6"
      />
      <path d="M540 40V346L730 407V130Z" fill="#233040" />
      <path d="M30 426V393L540 346L730 407L520 495Z" fill="#725b52" />
      <path
        d="M45 415L555 368M147 450L615 390M282 469L669 413M245 375L335 462M405 360L510 489"
        stroke="#4c4141"
      />
      <path
        d="M312 99L477 82V293L312 311Z"
        fill="#172638"
        stroke="#a39681"
        strokeWidth="9"
      />
      <path d="M394 91V301M316 198L474 182" stroke="#a39681" strokeWidth="5" />
      <path
        d="M432 121Q413 138 439 147Q412 154 410 133Q411 122 432 121Z"
        fill="#e2d3b7"
      />
      <g stroke="#778496" opacity=".4">
        <path d="M341 122L336 137M367 162L361 177M459 207L453 224M342 254L336 271" />
      </g>
      <path
        d="M81 330L265 307L290 328L91 360Z"
        fill="#b69774"
        stroke="#32333e"
        strokeWidth="3"
      />
      <path
        d="M102 359L96 430M267 334L275 410"
        stroke="#a48768"
        strokeWidth="10"
      />
      <path
        d="M102 221L232 211L243 303L106 315Z"
        fill="#856e63"
        stroke="#242b37"
        strokeWidth="5"
      />
      <path d="M115 235L220 226L226 289L119 300Z" fill="#182b38" />
      <path d="M154 250L183 248M166 237V264" stroke="#a798b1" strokeWidth="5" />
      <circle cx="206" cy="271" r="5" fill="#d4b77f" />
      <path
        d="M536 200L660 244V339L536 298Z"
        fill="#a48d73"
        stroke="#172333"
        strokeWidth="4"
      />
      <path d="M549 218L647 251V321L549 287Z" fill="#2c3d4c" />
      <path
        d="M562 272L586 246L612 290L634 272"
        stroke="#d1bb8c"
        strokeDasharray="4 5"
        strokeWidth="2"
      />
      <path d="M326 406L404 397L424 423L345 438Z" fill="#927971" />
      <path d="M340 435V467M411 422L423 451" stroke="#a68b70" strokeWidth="7" />
      <path d="M297 212V395M281 398H316" stroke="#b9a075" strokeWidth="5" />
      <path d="M279 159L310 156L330 211L258 220Z" fill="#d6b57e" />
      <path d="M284 167L276 210M301 165L311 207" stroke="#af8f61" />
      <path
        d="M552 419L606 408L599 459L565 463Z"
        fill="#b49378"
        stroke="#34333c"
        strokeWidth="3"
      />
      <path
        d="M581 415V342M581 381L559 363M581 370L603 348"
        stroke="#968574"
        strokeWidth="7"
      />
      <path
        d="M556 361Q529 328 557 321Q583 320 583 345Q604 317 619 338Q635 359 605 370Q589 394 566 375Z"
        fill="#7c9077"
      />
      <circle cx="568" cy="352" r="5" fill="#51404e" />
      <circle cx="600" cy="354" r="5" fill="#51404e" />
      <path d="M73 166L226 149L233 159L77 179Z" fill="#a58d70" />
      <path
        d="M95 160L91 114L106 111L111 159M120 157L120 102L139 99L142 154M153 151L148 117L165 113L172 150"
        fill="#988697"
        stroke="#25303a"
        strokeWidth="3"
      />
    </svg>
  );
}

export function CareArt({
  kind,
}: {
  kind: "sleep" | "monster" | "patience" | "dengo";
}) {
  return (
    <svg viewBox="0 0 150 100" fill="none" aria-hidden="true">
      <ellipse cx="75" cy="86" rx="55" ry="7" fill="#101e2c" />
      {kind === "sleep" ? (
        <>
          <path
            d="M22 65L36 24 130 33 115 78Z"
            fill="#a99bb8"
            stroke="#d0c4d5"
          />
          <path d="M38 62Q75 68 112 50M45 32Q70 45 112 40" stroke="#81748e" />
          <path d="M31 66L35 59M117 38l6 3" stroke="#e2d3b7" />
        </>
      ) : kind === "monster" ? (
        <>
          <rect
            x="47"
            y="15"
            width="55"
            height="70"
            rx="7"
            fill="#738b7c"
            stroke="#b2bda2"
          />
          <ellipse cx="74" cy="17" rx="26" ry="5" fill="#c7c8b4" />
          <path
            d="M68 17h13M60 38h30M61 43h21M61 65l11-12 13 13"
            stroke="#dce0c2"
            strokeWidth="2"
          />
        </>
      ) : kind === "patience" ? (
        <>
          <rect x="30" y="25" width="91" height="54" rx="12" fill="#b5a48a" />
          <path d="M64 39v25M87 39v25" stroke="#514c58" strokeWidth="7" />
          <path d="M36 31h10M109 71h6" stroke="#e2d3b7" />
        </>
      ) : (
        <>
          <path
            d="M30 29Q65 14 118 33L125 75Q80 91 24 73Z"
            fill="#9c859d"
            stroke="#d1b5c6"
          />
          <path
            d="M35 38L112 49M32 50L115 61M30 62L116 73M52 27l-7 46M77 27l-4 50M101 32l2 44"
            stroke="#bca1b6"
          />
          <path
            d="M28 76v8M40 79v8M53 81v8M67 82v7M83 82v7M99 81v7M115 78v7"
            stroke="#c7acb9"
          />
        </>
      )}
    </svg>
  );
}

export function TreeArt({ stage }: { stage: number }) {
  const size = 0.25 + (stage / 28) * 0.75;
  return (
    <svg viewBox="0 0 600 390" aria-hidden="true">
      <path
        d="M50 355V45M550 355V45M50 65h500M50 265h500M50 290h500"
        fill="none"
        stroke="#4b5669"
        strokeWidth="4"
      />
      <path
        d="M80 290v65M145 290v65M210 290v65M390 290v65M455 290v65M520 290v65"
        stroke="#4b5669"
        strokeWidth="3"
      />
      <path d="M480 83q-25 10-8 34-34-6-25-30 8-15 33-4" fill="#d3cbb7" />
      <path
        d="M95 90l-6 18M150 135l-6 18M410 110l-6 18M500 160l-6 18"
        stroke="#81909d"
        opacity=".3"
      />
      <ellipse cx="300" cy="357" rx="90" ry="10" fill="#142130" />
      <path d="M252 300h96l-14 55h-68Z" fill="#8e7169" stroke="#b29685" />
      <ellipse cx="300" cy="300" rx="49" ry="9" fill="#4b4146" />
      <g transform={`translate(300 300) scale(${size})`}>
        <path
          d="M0 0q-12-82 1-160M-2-55l-50-57M-1-95l48-47M0-127l-32-42"
          stroke="#a68a72"
          strokeWidth="9"
          fill="none"
        />
        {[
          [-50, -140],
          [42, -168],
          [-25, -190],
          [0, -215],
          [62, -130],
          [-65, -110],
          [12, -152],
        ].map(([x, y], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="39"
            ry="28"
            fill={i % 2 ? "#718b78" : "#526f64"}
            transform={`rotate(${i * 17} ${x} ${y})`}
          />
        ))}
        {Array.from({ length: Math.floor(stage / 3) }, (_, i) => (
          <g key={i}>
            <circle
              cx={Math.sin(i * 2.4) * 33}
              cy={-70 - i * 12}
              r="7"
              fill="#49334e"
              stroke="#92758b"
            />
            <circle
              cx={Math.sin(i * 2.4) * 33 - 2}
              cy={-73 - i * 12}
              r="1.5"
              fill="#d0adbd"
            />
          </g>
        ))}
      </g>
      <path
        d="M119 325h37l-5 27h-27zM155 330q30-20 27 2l-30 10M126 324q-3-20 14-20t13 20"
        fill="none"
        stroke="#a2a6af"
        strokeWidth="4"
      />
    </svg>
  );
}
