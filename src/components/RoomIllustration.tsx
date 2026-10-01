export function RoomIllustration({
  simple = false,
  dawn = false,
}: {
  simple?: boolean;
  dawn?: boolean;
}) {
  const suffix = simple ? "quiet" : "museum";
  return (
    <svg
      className={`room-illustration ${dawn ? "dawn" : ""}`}
      viewBox="0 0 700 640"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`light-${suffix}`}>
          <stop stopColor="#e4b96d" stopOpacity=".3" />
          <stop offset="1" stopColor="#e4b96d" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`wall-${suffix}`}
          x1="100"
          y1="100"
          x2="500"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#394044" />
          <stop offset="1" stopColor="#242d36" />
        </linearGradient>
        <linearGradient id={`sky-${suffix}`} x2="0" y2="1">
          <stop stopColor={dawn ? "#29364b" : "#142334"} />
          <stop offset="1" stopColor={dawn ? "#51465b" : "#26394a"} />
        </linearGradient>
        <pattern
          id={`floor-${suffix}`}
          width="90"
          height="43"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-25)"
        >
          <path d="M0 0H90V43H0Z" stroke="#372f30" strokeWidth="1" />
          <path d="M8 9L69 12M20 31L80 30" stroke="#856951" opacity=".15" />
        </pattern>
        <pattern
          id={`rain-${suffix}`}
          width="31"
          height="63"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M12 0L8 13M29 31L24 49M6 52L4 61"
            stroke="#b7c6c8"
            strokeWidth="1"
            opacity=".27"
          />
        </pattern>
        <clipPath id={`window-${suffix}`}>
          <path d="M113 146Q113 109 151 108L255 104L257 294L115 302Z" />
        </clipPath>
        <filter id={`grain-${suffix}`}>
          <feTurbulence
            baseFrequency=".62"
            numOctaves="3"
            seed="8"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".055" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="soft-light" />
        </filter>
      </defs>
      <g className="architecture">
        <path
          d="M46 92L484 40L653 144L652 502L466 613L44 511Z"
          fill="#111b26"
          stroke="#0f1821"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <path d="M48 91L484 43L484 442L47 497Z" fill={`url(#wall-${suffix})`} />
        <path d="M484 43L651 146L651 500L484 442Z" fill="#202a34" />
        <path d="M47 497L484 442L651 500L466 610L47 510Z" fill="#6d5544" />
        <path
          d="M47 497L484 442L651 500L466 610L47 510Z"
          fill={`url(#floor-${suffix})`}
        />
        <path
          d="M49 480L484 427L649 485M484 48V428"
          stroke="#141f29"
          strokeWidth="5"
        />
        <path d="M49 478L484 425" stroke="#7e7760" strokeOpacity=".25" />
        <path d="M49 96L484 50L646 150" stroke="#828075" opacity=".18" />
      </g>
      <g className="window-scene">
        <path
          d="M104 147Q105 101 151 100L264 95L266 304L105 314Z"
          fill="#1b252d"
          stroke="#958772"
          strokeWidth="3"
        />
        <g clipPath={`url(#window-${suffix})`}>
          <path d="M110 102H263V307H110Z" fill={`url(#sky-${suffix})`} />
          <g className="clouds" fill="#5b6978" opacity=".23">
            <path d="M111 164Q128 146 145 156Q156 136 180 150Q202 148 215 165Z" />
            <path d="M181 223Q198 204 210 214Q222 202 240 211L273 229Z" />
          </g>
          <path
            d="M215 126Q199 147 222 149Q202 160 194 144Q188 128 215 126Z"
            fill="#e4d6ad"
          />
          <g fill="#bfc5be">
            <circle cx="139" cy="127" r="1.5" />
            <circle cx="239" cy="180" r="1" />
            <circle cx="161" cy="191" r="1.6" />
            <circle cx="186" cy="119" r="1" />
            <circle cx="224" cy="248" r="1" />
          </g>
          <path
            d="M100 285L131 264L146 276L166 256L192 278L219 269L267 282V311H100Z"
            fill="#142431"
          />
          <rect
            className="rain"
            x="104"
            y="44"
            width="164"
            height="320"
            fill={`url(#rain-${suffix})`}
          />
        </g>
        <path
          d="M181 106L182 302M111 207L262 201"
          stroke="#9a8e75"
          strokeWidth="5"
        />
        <path
          d="M104 310L268 298L279 310L105 324L92 318Z"
          fill="#afa084"
          stroke="#202a31"
          strokeWidth="2"
        />
        <path
          d="M96 107Q82 200 101 301L113 298Q103 197 117 106Z"
          fill="#767264"
        />
        <path
          d="M266 93Q275 198 269 295L283 300Q294 186 280 94Z"
          fill="#67675e"
        />
        <path
          d="M100 122Q94 210 104 282M273 110Q282 210 277 281"
          stroke="#a2987d"
          opacity=".3"
        />
      </g>
      {!simple && (
        <g stroke="#20252b" strokeWidth="2" strokeLinejoin="round">
          <path d="M319 163L420 153L423 164L318 177Z" fill="#ad906c" />
          <path d="M329 164L328 119L340 118L341 163Z" fill="#7b625a" />
          <path d="M343 162L342 112L354 111L355 162Z" fill="#949376" />
          <path d="M359 160L355 121L369 119L376 158Z" fill="#b5a181" />
          <path
            d="M389 153L385 128L413 126L411 153Q400 159 389 153Z"
            fill="#a77c60"
          />
          <path
            d="M400 130Q377 114 386 100Q403 101 400 130M400 131Q417 122 419 104Q402 105 400 131M400 123Q396 91 406 88Q418 99 400 123"
            fill="#7a8966"
          />
          <path d="M316 176L320 190M413 166L413 180" stroke="#756953" />
          <path
            d="M583 284L637 310L638 489L584 465Z"
            fill="#17222c"
            stroke="#44463f"
            strokeWidth="4"
          />
          <path
            d="M590 300L630 320L631 477L591 456Z"
            stroke="#626255"
            opacity=".23"
          />
          <circle cx="627" cy="411" r="3" fill="#b6a379" />
          <path
            d="M317 425Q362 408 434 414L522 467Q490 512 359 521L259 473Z"
            fill="#75606a"
          />
          <path
            d="M319 433Q371 416 431 423L504 467Q458 502 361 510L279 473Z"
            stroke="#b29b88"
            strokeWidth="2"
            opacity=".5"
          />
          <path
            d="M303 452L458 484M292 465L433 495M326 438L481 476"
            stroke="#ae8f87"
            opacity=".2"
          />
          <path d="M104 398L257 382L265 404L105 423Z" fill="#ac8c64" />
          <path
            d="M113 424L112 484L122 487L129 421M243 407L247 465L257 468L256 406"
            fill="#715845"
          />
          <path d="M134 427L231 416L232 448L135 459Z" fill="#87684d" />
          <path d="M177 439L188 438" stroke="#c1a780" strokeWidth="3" />
          <path d="M498 385L605 411L609 425L496 400Z" fill="#a28465" />
          <path
            d="M506 402L505 447M598 423L599 470"
            stroke="#755c47"
            strokeWidth="7"
          />
          <path d="M332 485L423 480L450 501L356 515Z" fill="#b49774" />
          <path
            d="M354 516L353 550M437 506L439 538"
            stroke="#85654e"
            strokeWidth="7"
          />
          <path d="M337 489L419 485" stroke="#dec398" opacity=".4" />
          <path d="M80 451L79 413L90 412L92 452Z" fill="#8e6f57" />
          <path
            d="M85 420Q59 402 67 382Q87 392 85 420M85 420Q105 403 104 388Q88 391 85 420"
            fill="#737f61"
          />
          <path d="M143 359L141 330L165 326L169 355Z" fill="#d2b798" />
          <path
            d="M166 330Q183 324 177 342L168 346"
            stroke="#d2b798"
            strokeWidth="4"
          />
        </g>
      )}
      <g className="lamp" stroke="#23262a" strokeWidth="2">
        <ellipse
          cx={simple ? "421" : "336"}
          cy="534"
          rx="29"
          ry="8"
          fill="#171f28"
          opacity=".45"
        />
        <path
          d={
            simple
              ? "M421 321L421 528M403 529L440 529"
              : "M335 290L335 424M317 425L354 425"
          }
          stroke="#ad9270"
          strokeWidth="5"
        />
        <path
          d={
            simple
              ? "M399 266L444 266L466 327Q424 343 376 327Z"
              : "M313 234L355 231L376 290Q338 304 294 293Z"
          }
          fill="#d9b780"
        />
        <path
          d={
            simple
              ? "M403 272L394 324M422 270V329M440 272L448 324"
              : "M317 240L309 287M332 239V291M350 239L361 286"
          }
          stroke="#b79665"
          strokeWidth="1"
        />
      </g>
      <ellipse
        className="lamplight"
        cx={simple ? "421" : "333"}
        cy={simple ? "330" : "298"}
        rx="196"
        ry="215"
        fill={`url(#light-${suffix})`}
        pointerEvents="none"
      />
      {simple && (
        <g stroke="#29292b" strokeWidth="3" strokeLinejoin="round">
          <path d="M297 448L341 450L353 482L297 487Z" fill="#9b7f60" />
          <path d="M296 450L284 382Q308 367 333 378L341 450Z" fill="#9b7f60" />
          <path
            d="M295 389L301 439M307 386L313 440M321 387L327 441"
            stroke="#725b48"
            strokeWidth="2"
          />
          <path
            d="M302 485L292 543M344 482L354 535"
            stroke="#967757"
            strokeWidth="7"
          />
          <path
            d="M288 449L289 482M350 445L354 478M281 448L305 450M334 445L359 447"
            stroke="#b4936c"
            strokeWidth="6"
          />
          <path
            d="M258 543Q315 553 376 531"
            stroke="#101b26"
            strokeWidth="5"
            opacity=".3"
          />
        </g>
      )}
      <path
        d="M47 513L466 613L652 503"
        stroke="#aa8660"
        strokeOpacity=".28"
        strokeWidth="2"
      />
      <path
        d="M46 92L484 40L653 144L652 502L466 613L44 511Z"
        filter={`url(#grain-${suffix})`}
        opacity=".55"
        pointerEvents="none"
      />
      <g className="dust" fill="#ecd4a0" opacity=".35">
        <circle cx="299" cy="319" r="1.2" />
        <circle cx="381" cy="342" r="1" />
        <circle cx="307" cy="365" r="1.3" />
        <circle cx="351" cy="307" r="1" />
      </g>
    </svg>
  );
}
