import type { ObjectId } from "../content/museumContent";
export function ObjectArt({ id }: { id: ObjectId }) {
  return (
    <svg
      viewBox="0 0 120 110"
      fill="none"
      aria-hidden="true"
      className={`object-art art-${id}`}
    >
      {id === "monster" && (
        <g className="can-art" stroke="#252d2e" strokeWidth="2">
          <ellipse
            cx="61"
            cy="99"
            rx="27"
            ry="6"
            fill="#0d1620"
            opacity=".4"
            stroke="none"
          />
          <path d="M42 22Q60 17 79 22L77 91Q61 99 44 92Z" fill="#293731" />
          <path d="M48 24L49 89M73 24L72 89" stroke="#4f6047" />
          <ellipse cx="60" cy="22" rx="19" ry="5" fill="#a3a68b" />
          <ellipse cx="60" cy="22" rx="6" ry="2" fill="#39453c" />
          <path
            d="M53 40L57 53L53 76M61 39L64 54L61 76M69 39L71 53L69 72"
            stroke="#b6c477"
            strokeWidth="3"
          />
          <path d="M48 85Q61 89 74 85" stroke="#7c8660" />
        </g>
      )}
      {id === "frame" && (
        <g className="frame-art" stroke="#1b222a" strokeWidth="2">
          <path d="M19 18L100 14L104 96L17 99Z" fill="#ad885c" />
          <path d="M25 24L94 22L97 89L25 92Z" fill="#655345" />
          <path d="M30 29L89 28L90 83L31 85Z" fill="#d5c59a" />
          <circle cx="60" cy="56" r="22" fill="#dabb78" stroke="none" />
          <ellipse cx="51" cy="51" rx="7" ry="8" fill="#f4eac9" stroke="none" />
          <ellipse cx="70" cy="50" rx="7" ry="8" fill="#f4eac9" stroke="none" />
          <circle cx="53" cy="47" r="3" fill="#373136" />
          <circle cx="72" cy="46" r="3" fill="#373136" />
          <path d="M53 68Q61 66 69 68" stroke="#69503d" />
        </g>
      )}
      {id === "sims" && (
        <g stroke="#182128" strokeWidth="2">
          <path d="M20 23L101 26L97 83L22 79Z" fill="#707778" />
          <path d="M26 30L95 33L91 75L29 72Z" fill="#243c40" />
          <g className="plumbob">
            <path d="M60 36L48 53L60 69L72 52Z" fill="#8bab76" />
            <path d="M60 36V69L72 52Z" fill="#557953" stroke="none" />
            <path d="M48 53L60 55L72 52" stroke="#b6cf90" strokeWidth="1" />
          </g>
          <path d="M22 79L97 83L111 95L9 91Z" fill="#9a9f99" />
          <path d="M32 83L88 85M28 87L95 90" stroke="#687775" />
          <path d="M9 91L111 95L107 99L13 96Z" fill="#656c69" />
        </g>
      )}
      {id === "fruit" && (
        <g stroke="#372933" strokeWidth="2">
          <ellipse
            cx="62"
            cy="87"
            rx="43"
            ry="9"
            fill="#141b25"
            opacity=".4"
            stroke="none"
          />
          <path d="M19 65Q24 95 61 95Q96 95 102 65Z" fill="#b18e73" />
          <ellipse cx="60" cy="64" rx="41" ry="12" fill="#d6b99b" />
          <g className="fruit-art">
            <circle cx="59" cy="53" r="23" fill="#382538" />
            <path
              d="M45 49Q45 37 57 37"
              stroke="#78536a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M59 30L61 23" stroke="#8f9269" />
            <circle cx="49" cy="43" r="3" fill="#d2bdbe" stroke="none" />
            <circle cx="68" cy="47" r="2" fill="#b8a0aa" stroke="none" />
          </g>
          <path d="M29 79Q62 95 92 78" stroke="#97745d" />
        </g>
      )}
      {id === "tv" && (
        <g stroke="#1a232a" strokeWidth="2">
          <path d="M47 24L32 7M54 24L74 9" stroke="#9b927b" />
          <path
            d="M10 28Q9 22 18 22L105 27Q112 29 111 39L108 90L11 87Z"
            fill="#9a7254"
          />
          <path d="M18 33Q46 28 88 35L87 76Q53 81 20 75Z" fill="#d1c5a4" />
          <g className="tv-screen">
            <path d="M23 36Q51 31 83 38L81 71Q52 77 25 70Z" fill="#6b7775" />
            <circle cx="42" cy="48" r="7" fill="#d9d4bf" stroke="none" />
            <path
              d="M32 69Q30 54 41 54Q54 55 53 72"
              fill="#343d43"
              stroke="none"
            />
            <circle cx="64" cy="49" r="6" fill="#d9d4bf" stroke="none" />
            <path
              d="M56 73Q54 55 65 55Q76 56 76 73"
              fill="#c0b8a5"
              stroke="none"
            />
          </g>
          <circle cx="99" cy="46" r="5" fill="#433d37" />
          <circle cx="98" cy="63" r="3" fill="#433d37" />
          <path
            d="M94 75H103M94 79H103M26 89L23 99M94 92L96 101"
            stroke="#776049"
            strokeWidth="3"
          />
        </g>
      )}
      {id === "cat" && (
        <g
          className="cat-art"
          stroke="#101720"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path
            d="M77 88Q108 90 100 67Q96 59 91 64"
            stroke="#101720"
            strokeWidth="10"
          />
          <path
            d="M41 91Q33 65 44 50L42 24L57 36L70 35L85 22L83 51Q91 79 77 94Z"
            fill="#171c26"
          />
          <path
            d="M47 32L48 43L55 40M77 31L73 40L79 43"
            fill="#59444c"
            stroke="none"
          />
          <path d="M46 54L55 55M69 55L77 52" stroke="#d2b974" strokeWidth="3" />
          <path d="M61 63L63 65L65 62" fill="#8b6b68" />
          <path d="M52 72L49 92M70 72L72 92" stroke="#30313a" />
          <path
            d="M42 64L28 61M43 69L30 71M77 65L90 60"
            stroke="#657073"
            strokeWidth="1"
          />
        </g>
      )}
    </svg>
  );
}
