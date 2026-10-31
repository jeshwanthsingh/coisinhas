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
export function RoomArt({ glow }: { glow: boolean }) {
  return (
    <svg viewBox="0 0 400 380" className="esc-art" aria-hidden="true">
      <defs>
        <linearGradient id="esc-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d2a3a" />
          <stop offset="1" stopColor="#29384b" />
        </linearGradient>
        <linearGradient id="esc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3f63" />
          <stop offset="1" stopColor="#ae9ab9" />
        </linearGradient>
        <radialGradient id="esc-lamp">
          <stop offset="0" stopColor="#d8b87c" stopOpacity=".7" />
          <stop offset="1" stopColor="#d8b87c" stopOpacity="0" />
        </radialGradient>
        <clipPath id="esc-lens">
          <circle cx="320" cy="132" r="44" />
        </clipPath>
      </defs>
      <rect width="400" height="380" fill="#172230" />
      <path d="M12 8h376v326H12z" fill="url(#esc-wall)" />
      <path d="M12 334h376v46H12z" fill="#101a26" />
      <path d="M12 334h376" stroke="#3b4c63" strokeWidth="3" />
      {/* hatch and ladder */}
      <path d="M150 8h100v26H150z" fill="#5e4630" />
      <path d="M156 14h88v14h-88z" fill="#8a6b4d" />
      <path
        d="M176 34v250M224 34v250"
        stroke="#a58660"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M176 60h48M176 94h48M176 128h48M176 162h48M176 196h48M176 230h48M176 264h48"
        stroke="#8a6b4d"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M200 34v-26" stroke="#d8b87c" strokeWidth="2" opacity=".5" />
      {/* string lights */}
      <path
        d="M12 52Q80 96 150 66M250 66Q330 100 388 52"
        fill="none"
        stroke="#3b4c63"
        strokeWidth="2"
      />
      {[
        [40, 74],
        [78, 87],
        [116, 83],
        [276, 82],
        [314, 90],
        [352, 79],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="14" fill="url(#esc-lamp)" />
          <circle cx={x} cy={y} r="4.5" fill="#d8b87c" />
        </g>
      ))}
      {/* periscope window */}
      <path d="M320 8v36" stroke="#5c6b80" strokeWidth="10" />
      <circle cx="320" cy="132" r="52" fill="#3b4c63" />
      <g clipPath="url(#esc-lens)">
        <rect x="270" y="86" width="100" height="92" fill="url(#esc-sky)" />
        <circle cx="344" cy="108" r="7" fill="#e2d3b7" />
        <path
          d="M290 112h2M306 104h2M334 94h2"
          stroke="#e2d3b7"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M270 170Q300 156 320 164T370 160V180H270z" fill="#1d2a3a" />
        <path d="M313 170v-30" stroke="#101a26" strokeWidth="3" />
        <path
          d="M313 144q-22-2-24-9 11 2 24 3q13-1 24-3-2 7-24 9M313 134q-16-1-18-7 9 2 18 2t18-2q-2 6-18 7M313 124q-10-1-12-5 6 1 12 1t12-1q-2 4-12 5"
          fill="#101a26"
        />
      </g>
      <circle
        cx="320"
        cy="132"
        r="44"
        fill="none"
        stroke="#5c6b80"
        strokeWidth="5"
      />
      <path
        d="M298 98q22-14 44 0"
        fill="none"
        stroke="#fff"
        strokeOpacity=".12"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* workbench: its top and the wall above stay empty */}
      <path d="M18 270h134v12H18z" fill="#8a6b4d" />
      <path
        d="M26 282v52M144 282v52M26 306h118"
        stroke="#5e4630"
        strokeWidth="6"
      />
      {/* backpacks */}
      <g>
        <rect x="270" y="238" width="60" height="96" rx="20" fill="#a58660" />
        <rect x="278" y="282" width="44" height="34" rx="8" fill="#8a6b4d" />
        <path
          d="M284 240v-10a16 16 0 0 1 32 0v10"
          fill="none"
          stroke="#e2d3b7"
          strokeWidth="5"
        />
        <rect x="294" y="296" width="12" height="7" rx="2" fill="#d8b87c" />
      </g>
      <g transform="translate(-20 0) rotate(9 360 334)">
        <rect x="326" y="226" width="62" height="108" rx="22" fill="#82967b" />
        <rect x="334" y="276" width="46" height="40" rx="9" fill="#5f7059" />
        <path
          d="M342 228v-12a16 16 0 0 1 32 0v12"
          fill="none"
          stroke="#e2d3b7"
          strokeWidth="5"
        />
        <rect
          x="350"
          y="206"
          width="10"
          height="26"
          rx="3"
          fill="#b86a5a"
          transform="rotate(-18 355 220)"
        />
        <path
          d="M382 292q14 14 4 40"
          fill="none"
          stroke="#e2d3b7"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="357" cy="300" r="6" fill="#ae9ab9" />
        <path
          d="M330 262l-14 8"
          stroke="#e2d3b7"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      {/* stash crate */}
      <ellipse
        cx="200"
        cy="300"
        rx="90"
        ry="40"
        fill="url(#esc-lamp)"
        opacity={glow ? 1 : 0.55}
      />
      <rect x="150" y="272" width="100" height="72" rx="4" fill="#8a6b4d" />
      <path d="M150 296h100M150 320h100" stroke="#5e4630" strokeWidth="4" />
      <path d="M160 272v72M240 272v72" stroke="#5e4630" strokeWidth="6" />
      <path d="M144 264h112l-6 12H150z" fill="#a58660" />
      <rect x="188" y="290" width="24" height="18" rx="3" fill="#d8b87c" />
      <circle cx="200" cy="299" r="3" fill="#5e4630" />
    </svg>
  );
}
