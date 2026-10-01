import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { objects, words } from "../content/museumContent";
import type { Language, ObjectId } from "../content/museumContent";
import { useReducedMotion } from "../hooks/useMuseumState";
import { RoomIllustration } from "./RoomIllustration";
import { ObjectArt } from "./ObjectArt";

type Props = {
  language: Language;
  entered: boolean;
  found: ObjectId[];
  blocked: boolean;
  onDiscover: (id: ObjectId) => void;
  onDoor: () => void;
  onSecret: () => void;
};
const locations: Record<Exclude<ObjectId, "cat">, [number, number, number]> = {
  monster: [251, 370, 72],
  frame: [401, 245, 99],
  sims: [155, 372, 100],
  fruit: [391, 480, 79],
  tv: [550, 359, 99],
};
const catLocations = [
  [492, 550],
  [568, 513],
  [288, 466],
  [182, 470],
  [362, 580],
];
export function MuseumRoom({
  language,
  entered,
  found,
  blocked,
  onDiscover,
  onDoor,
  onSecret,
}: Props) {
  const [catTries, setCatTries] = useState(0);
  const [catPosition, setCatPosition] = useState(0);
  const [catVisible, setCatVisible] = useState(true);
  const [active, setActive] = useState<ObjectId | null>(null);
  const [message, setMessage] = useState("");
  const reduced = useReducedMotion();
  const room = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const catFound = found.includes("cat");
  const complete = found.length === 6;
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!catFound || blocked || !entered) return;
    const timer = setTimeout(
      () => {
        if (!catVisible) {
          setCatPosition((p) => (p + 1) % catLocations.length);
          setCatVisible(true);
        } else {
          setCatPosition((p) => (p + 1) % catLocations.length);
        }
      },
      catVisible ? 14000 : 4500,
    );
    return () => clearTimeout(timer);
  }, [catFound, catVisible, catPosition, blocked, entered]);
  function tap(id: ObjectId) {
    if (active || blocked) return;
    if (id === "cat") {
      if (catFound) {
        onSecret();
        setCatVisible(false);
        setMessage("");
        return;
      }
      if (catTries < 2) {
        setCatTries((t) => t + 1);
        setCatPosition((p) => p + 1);
        setMessage(catTries === 0 ? "catMove" : "catAgain");
        return;
      }
    }
    setMessage("");
    setActive(id);
    timer.current = setTimeout(
      () => {
        onDiscover(id);
        setActive(null);
      },
      reduced ? 0 : id === "fruit" ? 850 : 450,
    );
  }
  return (
    <div
      className={`room-stage ${entered ? "entered" : "preview-room"} ${complete ? "complete" : ""} ${active === "fruit" ? "fruit-moment" : ""}`}
    >
      <div
        className="room-parallax"
        ref={room}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || reduced) return;
          const box = e.currentTarget.getBoundingClientRect();
          room.current?.style.setProperty(
            "--shift-x",
            `${((e.clientX - box.left) / box.width - 0.5) * 5}px`,
          );
          room.current?.style.setProperty(
            "--shift-y",
            `${((e.clientY - box.top) / box.height - 0.5) * 3}px`,
          );
        }}
        onPointerLeave={() => {
          room.current?.style.setProperty("--shift-x", "0px");
          room.current?.style.setProperty("--shift-y", "0px");
        }}
      >
        <RoomIllustration />
        {objects
          .filter((o) => o.id !== "cat")
          .map((object) => {
            const [x, y, size] =
              locations[object.id as Exclude<ObjectId, "cat">];
            const style = {
              left: `${x / 7}%`,
              top: `${y / 6.4}%`,
              width: `${size / 7}%`,
              "--object-index": object.number,
            } as CSSProperties;
            return entered ? (
              <button
                key={object.id}
                type="button"
                style={style}
                className={`museum-object ${object.id} ${found.includes(object.id) ? "found" : ""} ${active === object.id ? "activated" : ""}`}
                onClick={() => tap(object.id)}
                aria-label={`${object.name[language]}${found.includes(object.id) ? ` · ${words.discovered[language]}` : ""}`}
              >
                <ObjectArt id={object.id} />
                <span className="object-label">{object.name[language]}</span>
                <span className="found-mark" aria-hidden="true" />
              </button>
            ) : (
              <div
                className={`museum-object decorative ${object.id}`}
                key={object.id}
                style={style}
              >
                <ObjectArt id={object.id} />
              </div>
            );
          })}
        <button
          type="button"
          className={`museum-object cat ${catVisible ? "" : "cat-hidden"}`}
          style={{
            left: `${catLocations[catPosition][0] / 7}%`,
            top: `${catLocations[catPosition][1] / 6.4}%`,
            width: "12%",
          }}
          onClick={() => tap("cat")}
          disabled={!entered || !catVisible}
          tabIndex={entered && catVisible ? 0 : -1}
          aria-label={
            catFound ? words.catSecret[language] : objects[5].name[language]
          }
        >
          <ObjectArt id="cat" />
          <span className="object-label">
            {catFound ? "pspsps…" : objects[5].name[language]}
          </span>
        </button>
        {entered && complete && (
          <button
            className="door-button"
            onClick={onDoor}
            aria-label={words.doorLabel[language]}
          >
            <span aria-hidden="true">↗</span>
          </button>
        )}
        <div className="fruit-eyes" aria-hidden="true">
          <i />
          <i />
        </div>
      </div>
      <div className="cat-message" role="status">
        {message === "catMove"
          ? words.catMove[language]
          : message === "catAgain"
            ? words.catAgain[language]
            : ""}
      </div>
    </div>
  );
}
