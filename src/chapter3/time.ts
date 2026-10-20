export const KAROL_ZONE = "America/Sao_Paulo";
export const SF_ZONE = "America/Los_Angeles";
export function karolDate(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: KAROL_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  return ["year", "month", "day"]
    .map((type) => parts.find((p) => p.type === type)!.value)
    .join("-");
}
export function greeting(
  now: Date,
): "morning" | "workday" | "evening" | "late" {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: KAROL_ZONE,
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
  );
  return hour < 6
    ? "late"
    : hour < 12
      ? "morning"
      : hour < 18
        ? "workday"
        : "evening";
}
export function clockTime(now: Date, zone: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
}
// Approximate synodic phase; epoch is the 2000-01-06 new moon (18:14 UTC).
export function moonPhase(now: Date): number {
  const cycles =
    (now.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / (29.530588853 * 86400000);
  return ((cycles % 1) + 1) % 1;
}
export function phaseIndex(phase: number): number {
  return Math.round(phase * 8) % 8;
}
