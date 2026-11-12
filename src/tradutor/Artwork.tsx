const gearPath = (r: number, teeth: number) => {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2;
    const out = i % 4 === 0 || i % 4 === 1 ? r : r * 0.82;
    pts.push(
      `${(Math.cos(a) * out).toFixed(1)},${(Math.sin(a) * out).toFixed(1)}`,
    );
  }
  return `M${pts.join("L")}Z`;
};
function Gear({
  x,
  y,
  r,
  teeth,
  reverse = false,
}: {
  x: number;
  y: number;
  r: number;
  teeth: number;
  reverse?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`trad-gear ${reverse ? "trad-gear-rev" : ""}`}>
        <path
          d={gearPath(r, teeth)}
          fill="#d8b87c"
          stroke="#6f5426"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle r={r * 0.55} fill="#b08a4a" stroke="#6f5426" strokeWidth="2" />
        <circle r={r * 0.2} fill="#6f5426" />
        <path
          d={`M0 ${-r * 0.5}V${r * 0.5}M${-r * 0.5} 0H${r * 0.5}`}
          stroke="#6f5426"
          strokeWidth="2"
        />
      </g>
    </g>
  );
}
/** Small eye drawn in SVG, so no emoji font is needed. */
export function EyeIcon() {
  return (
    <svg viewBox="0 0 48 32" className="trad-eye" aria-hidden="true">
      <path
        d="M3 16Q24 -2 45 16Q24 34 3 16Z"
        fill="#f3ead8"
        stroke="#2a2218"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle
        cx="24"
        cy="9"
        r="7.5"
        fill="#6b4a2f"
        stroke="#2a2218"
        strokeWidth="2"
      />
      <circle cx="24" cy="8" r="3.2" fill="#1b130c" />
      <path
        d="M8 12Q24 -2 40 12"
        fill="none"
        stroke="#2a2218"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function WorkshopArt({ uncovered }: { uncovered: boolean }) {
  return (
    <svg
      viewBox="0 0 400 280"
      className="trad-art"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="tr-lamp">
          <stop stopColor="#e4b96d" stopOpacity=".7" />
          <stop offset="1" stopColor="#e4b96d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tr-wall" x2="0" y2="1">
          <stop stopColor="#1b2735" />
          <stop offset="1" stopColor="#29384b" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#tr-wall)" />
      <path d="M0 214H400V280H0Z" fill="#3a2f26" />
      <path d="M0 214H400" stroke="#161c26" strokeWidth="3" />
      <path
        d="M24 74H128M24 74v10M128 74v10"
        stroke="#5e4630"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g stroke="#161c26" strokeWidth="2">
        <rect x="34" y="46" width="22" height="28" rx="4" fill="#82967b" />
        <rect x="64" y="40" width="26" height="34" rx="4" fill="#ae9ab9" />
        <rect x="98" y="52" width="20" height="22" rx="4" fill="#d8b87c" />
      </g>
      <path
        d="M300 30H356V92H300Z"
        fill="#243247"
        stroke="#5e4630"
        strokeWidth="4"
      />
      <path d="M328 30V92M300 61H356" stroke="#5e4630" strokeWidth="3" />
      <circle cx="342" cy="46" r="5" fill="#cfd2c8" opacity=".6" />
      <path d="M200 0V52" stroke="#5e4630" strokeWidth="3" />
      <path
        d="M176 52H224L214 76H186Z"
        fill="#8a6b4d"
        stroke="#161c26"
        strokeWidth="2"
      />
      <circle cx="200" cy="86" r="90" fill="url(#tr-lamp)" />
      <circle cx="200" cy="78" r="7" fill="#f0cf8d" />
      <path
        d="M60 222H340V234H60Z"
        fill="#6f533a"
        stroke="#161c26"
        strokeWidth="2"
      />
      <path d="M76 234V270M324 234V270" stroke="#5e4630" strokeWidth="8" />
      {/* the machine: brass, hidden under the cloth until it is lifted */}
      <g>
        <rect
          x="120"
          y="150"
          width="160"
          height="72"
          rx="10"
          fill="#b08a4a"
          stroke="#6f5426"
          strokeWidth="3"
        />
        <circle
          cx="168"
          cy="184"
          r="22"
          fill="#d8b87c"
          stroke="#6f5426"
          strokeWidth="3"
        />
        <circle cx="168" cy="184" r="8" fill="#6f5426" />
        <path
          d="M204 172h56M204 188h40"
          stroke="#6f5426"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M232 150V128h36v22"
          fill="#e2d3b7"
          stroke="#8c7c71"
          strokeWidth="2"
        />
      </g>
      <g className={uncovered ? "trad-cloth trad-cloth-off" : "trad-cloth"}>
        <path
          d="M104 224Q100 160 130 146Q150 130 200 128Q250 130 270 146Q300 160 296 224Q250 236 200 232Q150 236 104 224Z"
          fill="#7a6a86"
          stroke="#161c26"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M130 150Q124 190 134 224M170 136Q164 180 172 230M230 134Q238 180 228 230M272 152Q276 190 266 224"
          stroke="#5e4f6a"
          strokeWidth="3"
          fill="none"
        />
      </g>
    </svg>
  );
}
export function MachineArt({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 360 150"
      className="trad-machine-art"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tr-brass" x2="0" y2="1">
          <stop stopColor="#d8b87c" />
          <stop offset="1" stopColor="#8a6b34" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="14"
        width="340"
        height="112"
        rx="16"
        fill="url(#tr-brass)"
        stroke="#5e4620"
        strokeWidth="4"
      />
      <rect
        x="26"
        y="30"
        width="308"
        height="62"
        rx="10"
        fill="#241c12"
        stroke="#5e4620"
        strokeWidth="3"
      />
      <Gear x={76} y={62} r={26} teeth={10} />
      <Gear x={130} y={72} r={16} teeth={8} reverse />
      <Gear x={182} y={58} r={22} teeth={9} />
      <Gear x={232} y={72} r={14} teeth={7} reverse />
      <Gear x={284} y={60} r={24} teeth={10} reverse />
      <circle cx="40" cy="108" r="5" fill="#6f5426" />
      <circle cx="320" cy="108" r="5" fill="#6f5426" />
      <rect
        x="90"
        y="106"
        width="180"
        height="14"
        rx="5"
        fill="#241c12"
        stroke="#5e4620"
        strokeWidth="2"
      />
      {back && (
        <path d="M30 40h300" stroke="#f0cf8d" strokeWidth="2" opacity=".5" />
      )}
    </svg>
  );
}
export function LeverArt() {
  return (
    <svg viewBox="0 0 60 80" className="trad-lever-art" aria-hidden="true">
      <rect
        x="6"
        y="56"
        width="48"
        height="16"
        rx="6"
        fill="#8a6b34"
        stroke="#5e4620"
        strokeWidth="3"
      />
      <path
        d="M30 60V18"
        stroke="#d8b87c"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle
        cx="30"
        cy="14"
        r="9"
        fill="#b3473d"
        stroke="#5e2420"
        strokeWidth="3"
      />
    </svg>
  );
}
