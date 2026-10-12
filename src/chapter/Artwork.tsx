import { useId } from "react";
export function AfterHoursArtwork({ warm }: { warm: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="after-art"
      viewBox="0 0 700 660"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}light`}>
          <stop stopColor="#e7bc77" stopOpacity={warm ? ".35" : ".22"} />
          <stop offset="1" stopColor="#e7bc77" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}sky`} x2="0" y2="1">
          <stop stopColor="#111e37" />
          <stop offset="1" stopColor="#393751" />
        </linearGradient>
        <clipPath id={`${id}arch`}>
          <path d="M256 303V165C256 65 455 65 455 165V303Z" />
        </clipPath>
        <pattern
          id={`${id}rain`}
          width="35"
          height="71"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0L14 15M7 38L2 51"
            stroke="#abbace"
            strokeWidth="1"
            opacity=".22"
          />
        </pattern>
      </defs>
      <path
        d="M42 117L493 51L654 148V518L482 631L42 537Z"
        fill="#0c1722"
        stroke="#0c1620"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <path d="M43 116L493 52V454L43 520Z" fill="#303541" />
      <path d="M493 52L654 148V518L493 454Z" fill="#232b3b" />
      <path d="M43 520L493 454L654 518L482 631L43 537Z" fill="#6c554c" />
      <g stroke="#3c3435" opacity=".65">
        <path d="M44 544L512 477M148 560L553 495M289 590L599 514M393 614L638 530M138 506L228 576M264 487L369 606M391 468L512 611M492 457L586 562" />
      </g>
      <path d="M43 506L493 440L650 505" stroke="#101e2a" strokeWidth="7" />
      <path
        d="M247 307V163C247 54 463 54 463 163V308Z"
        fill="#8b8175"
        stroke="#141e2c"
        strokeWidth="5"
      />
      <g clipPath={`url(#${id}arch)`}>
        <path d="M253 69H458V310H253Z" fill={`url(#${id}sky)`} />
        <path
          className="after-cloud"
          d="M261 191Q280 172 302 184Q314 166 334 179Q357 174 382 195M371 250Q391 224 416 236Q440 221 466 247"
          fill="#737080"
          opacity=".2"
        />
        <path
          d="M413 130Q391 147 417 157Q388 167 384 143Q386 126 413 130Z"
          fill="#e6dbbc"
        />
        <g fill="#c5c9d4">
          <circle cx="285" cy="150" r="1.8" />
          <circle cx="338" cy="120" r="1.5" />
          <circle cx="370" cy="200" r="1.2" />
          <circle cx="436" cy="192" r="1.5" />
          <circle cx="313" cy="244" r="1.2" />
        </g>
        <path
          d="M242 293L275 272L310 289L345 276L381 295L426 280L470 297V317H240Z"
          fill="#172637"
        />
        <rect
          className="rain"
          x="250"
          y="0"
          width="214"
          height="325"
          fill={`url(#${id}rain)`}
        />
      </g>
      <path d="M355 89V309M252 208H459" stroke="#9a8e7b" strokeWidth="5" />
      <path
        d="M244 309L465 306L478 320L248 326L234 318Z"
        fill="#ad9c7f"
        stroke="#26303c"
        strokeWidth="2"
      />
      <path
        d="M256 328L413 316L583 534L523 572Z"
        fill="#b0b2c4"
        opacity=".045"
      />
      <path
        d="M231 124Q220 227 235 307L250 308Q240 213 253 117M466 115Q485 240 469 306L482 312Q499 208 478 116"
        fill="#6c6570"
      />
      <g stroke="#252631" strokeWidth="2" strokeLinejoin="round">
        <path d="M82 218L188 203L195 216L84 233Z" fill="#a48b6b" />
        <path d="M92 216L89 161L101 158L105 215Z" fill="#8c7675" />
        <path d="M107 215L108 149L121 148L122 214Z" fill="#a49d7d" />
        <path d="M131 211L126 164L142 163L148 209Z" fill="#5a7070" />
        <path d="M159 208L153 184L182 183L178 207Z" fill="#b78968" />
        <path
          d="M167 185Q143 168 151 154Q169 156 167 185M167 180Q184 158 181 142Q165 148 167 180"
          fill="#7e8f6f"
        />
        <path d="M74 422L208 401L221 422L77 447Z" fill="#ac8968" />
        <path
          d="M87 446L86 516M207 425L211 493"
          stroke="#826148"
          strokeWidth="9"
        />
        <path d="M103 453L191 439L193 474L104 491Z" fill="#81644f" />
        <path d="M136 465L155 461" stroke="#c2a078" strokeWidth="3" />
        <path d="M430 415L585 396L623 426L458 451Z" fill="#a68968" />
        <path
          d="M463 450L462 535M607 430L614 510"
          stroke="#82644e"
          strokeWidth="9"
        />
        <path d="M475 455L590 441L591 478L477 494Z" fill="#715b4f" />
        <circle cx="535" cy="465" r="3" fill="#c3a77c" />
        <path d="M501 518L579 505L604 531L523 549Z" fill="#a98d70" />
        <path
          d="M529 550V585M591 535L598 563"
          stroke="#87694e"
          strokeWidth="7"
        />
        <path d="M291 463L348 453L385 489L312 508Z" fill="#9c826c" />
        <path d="M291 463L274 384Q305 368 332 379L349 453Z" fill="#98816d" />
        <path
          d="M283 390L299 451M301 386L315 448M318 386L332 444"
          stroke="#766157"
        />
        <path
          d="M314 507L306 556M376 492L390 538"
          stroke="#a38467"
          strokeWidth="8"
        />
        <path
          d="M306 393Q325 384 340 393L355 462L344 511L322 505L331 461Z"
          fill="#7e748b"
        />
        <path
          d="M311 397L337 498M322 393L347 474"
          stroke="#b0a0ad"
          opacity=".4"
        />
        <path d="M550 389L548 363L578 359L582 385Z" fill="#c1ab85" />
        <path d="M550 369L574 365" stroke="#8b7560" />
        <path d="M602 404L599 354L624 367L624 415Z" fill="#99715c" />
        <path
          d="M612 366Q586 341 590 321Q613 332 612 366M614 369Q636 350 637 329Q613 335 614 369"
          fill="#758568"
        />
      </g>
      <g stroke="#bda076" strokeWidth="5">
        <path d="M404 289V493M385 497Q405 506 427 494" />
      </g>
      <path
        d="M382 230L425 231L447 290Q407 308 363 292Z"
        fill="#d7b37e"
        stroke="#34313b"
        strokeWidth="2"
      />
      <path d="M389 237L381 289M405 236V294M420 238L432 288" stroke="#b99665" />
      <ellipse cx="405" cy="312" rx="205" ry="225" fill={`url(#${id}light)`} />
      <path d="M43 536L482 630L654 518" stroke="#ad8b6b" strokeOpacity=".35" />
      <g className="dust" fill="#e8d1a0" opacity=".45">
        <circle cx="368" cy="335" r="1.3" />
        <circle cx="431" cy="354" r="1" />
        <circle cx="386" cy="393" r="1.2" />
      </g>
    </svg>
  );
}
export function RadioArt() {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <path
        d="M13 43Q15 21 42 20L135 24L148 99L11 96Z"
        fill="#9a7157"
        stroke="#272b32"
        strokeWidth="3"
      />
      <path d="M24 44L88 41L90 85L24 87Z" fill="#423f3e" />
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d={`M${29 + i * 8} 45L${29 + i * 8} 83`}
          stroke="#af9777"
          opacity=".55"
        />
      ))}
      <path d="M100 39H135V52H100Z" fill="#d6bb7d" />
      <path d="M119 39V52" stroke="#775f54" />
      <circle
        cx="117"
        cy="74"
        r="13"
        fill="#d0b68b"
        stroke="#4b4440"
        strokeWidth="3"
      />
      <path d="M117 65V74" stroke="#55493d" strokeWidth="3" />
      <path
        d="M30 99L28 106M129 101L133 108"
        stroke="#5c493e"
        strokeWidth="5"
      />
    </svg>
  );
}
export function AtlasArt() {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <path
        d="M14 28L72 19L140 34L148 102L77 89L8 105Z"
        fill="#c0ac8e"
        stroke="#292d39"
        strokeWidth="3"
      />
      <path
        d="M21 36L70 28L72 81L17 94ZM80 29L132 42L139 90L82 81Z"
        fill="#3d485b"
      />
      <path d="M32 71L49 47L60 70M96 48L114 69L126 53" stroke="#c3b594" />
      {[
        [32, 71],
        [49, 47],
        [60, 70],
        [96, 48],
        [114, 69],
        [126, 53],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3" fill="#ecce8d" />
      ))}
      <path d="M74 24L77 89" stroke="#8d7c66" strokeWidth="2" />
    </svg>
  );
}
export function EnvelopeArt() {
  return (
    <svg viewBox="0 0 160 115" fill="none" aria-hidden="true">
      <path
        d="M12 26L143 20L148 94L17 102Z"
        fill="#d3bda0"
        stroke="#3e3640"
        strokeWidth="2"
      />
      <path
        d="M12 26L82 68L143 20"
        fill="#e4d0af"
        stroke="#9c846b"
        strokeWidth="2"
      />
      <path d="M17 102L58 64M148 94L107 62" stroke="#aa9073" />
      <circle cx="81" cy="63" r="11" fill="#826274" />
      <path d="M78 57L80 63L87 62L81 67" stroke="#c8a399" />
    </svg>
  );
}
