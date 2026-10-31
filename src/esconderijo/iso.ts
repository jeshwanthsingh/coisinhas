/** Floor point under the corner: s runs along the back wall (leftwards), t along the right wall. */
export const iso = (s: number, t: number): [number, number] => [
  484 - 0.992 * s + 0.945 * t,
  442 + 0.125 * s + 0.328 * t,
];
/** Crate position as a share of the 700x640 room, for the tap target. */
export const crateSpot = (() => {
  const [x, y] = iso(206, 95);
  return { x: x / 7, y: (y - 40) / 6.4 };
})();
