export const needIds = ["sleep", "monster", "patience", "dengo"] as const;
export const lootIds = ["fleabag", "amor", "eyes", "cat", "call"] as const;
export const letterIds = ["tired", "exam", "longing", "fight"] as const;
export const milestones = [2, 4, 6, 8, 10] as const;
export type NeedId = (typeof needIds)[number];
export type LootId = (typeof lootIds)[number];
export type LetterId = (typeof letterIds)[number];
export type Milestone = (typeof milestones)[number];
export type Player2State = {
  version: 1;
  slot: null | "karol";
  needs: Record<NeedId, number>;
  cheatUsed: boolean;
  note: string;
  loot: LootId[];
  lettersOpened: LetterId[];
  extracted: boolean;
  treeStage: number;
  lastWatered: string | null;
  hearts: number;
  cutscenesSeen: Milestone[];
  giftSeen: boolean;
  creditsSeen: boolean;
  postcardUnlocked: boolean;
  backupAt: number | null;
};
export type Player2Event =
  | { type: "choose" | "cheat" | "extract" | "gift" | "credits" | "postcard" }
  | { type: "care"; need: NeedId }
  | { type: "note"; text: string }
  | { type: "loot"; id: LootId }
  | { type: "letter"; id: LetterId }
  | { type: "water"; date: string }
  | { type: "cutscene"; id: Milestone }
  | { type: "backup"; at: number };
export const freshPlayer2 = (): Player2State => ({
  version: 1,
  slot: null,
  needs: { sleep: 35, monster: 15, patience: 5, dengo: 25 },
  cheatUsed: false,
  note: "",
  loot: [],
  lettersOpened: [],
  extracted: false,
  treeStage: 0,
  lastWatered: null,
  hearts: 0,
  cutscenesSeen: [],
  giftSeen: false,
  creditsSeen: false,
  postcardUnlocked: false,
  backupAt: null,
});
export const needsFull = (s: Player2State) =>
  needIds.every((id) => s.needs[id] === 100);
export const heartsFor = (s: Player2State) =>
  Math.min(10, s.treeStage + (needsFull(s) ? 2 : 0) + (s.extracted ? 2 : 0));
export const farmComplete = (s: Player2State) =>
  s.hearts === 10 || (s.treeStage > 0 && s.giftSeen);
export const endingReady = (s: Player2State) =>
  s.slot === "karol" && needsFull(s) && s.extracted && farmComplete(s);
export const progressCount = (s: Player2State) =>
  Number(needsFull(s)) + Number(s.extracted) + Number(farmComplete(s));
export function validDate(v: unknown): v is string {
  return (
    typeof v === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(v) &&
    Number.isFinite(Date.parse(v)) &&
    new Date(v).toISOString().slice(0, 10) === v
  );
}
export function validPlayer2(v: unknown): v is Player2State {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const s = v as Player2State;
  const keys = Object.keys(freshPlayer2());
  const integer = (n: unknown, max: number) =>
    typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= max;
  const unique = (items: unknown, allowed: readonly (string | number)[]) =>
    Array.isArray(items) &&
    items.every((x) => allowed.includes(x)) &&
    new Set(items).size === items.length;
  if (
    Object.keys(s).length !== keys.length ||
    !Object.keys(s).every((k) => keys.includes(k)) ||
    s.version !== 1 ||
    !(s.slot === null || s.slot === "karol")
  )
    return false;
  if (
    !s.needs ||
    typeof s.needs !== "object" ||
    Array.isArray(s.needs) ||
    Object.keys(s.needs).length !== 4 ||
    !needIds.every((id) => integer(s.needs[id], 100))
  )
    return false;
  if (
    ![
      s.cheatUsed,
      s.extracted,
      s.giftSeen,
      s.creditsSeen,
      s.postcardUnlocked,
    ].every((x) => typeof x === "boolean")
  )
    return false;
  if (
    typeof s.note !== "string" ||
    s.note.length > 280 ||
    !unique(s.loot, lootIds) ||
    !unique(s.lettersOpened, letterIds) ||
    !unique(s.cutscenesSeen, milestones)
  )
    return false;
  if (
    !integer(s.treeStage, 28) ||
    !integer(s.hearts, 10) ||
    s.hearts !== heartsFor(s)
  )
    return false;
  if (s.treeStage === 0 ? s.lastWatered !== null : !validDate(s.lastWatered))
    return false;
  if (
    s.backupAt !== null &&
    !(
      typeof s.backupAt === "number" &&
      Number.isSafeInteger(s.backupAt) &&
      s.backupAt >= 0
    )
  )
    return false;
  if (s.extracted && s.loot.length !== lootIds.length) return false;
  if (s.slot === null) {
    const fresh = freshPlayer2();
    if (needIds.some((id) => s.needs[id] !== fresh.needs[id])) return false;
    if (
      keys
        .filter((key) => key !== "needs")
        .some(
          (key) =>
            JSON.stringify(s[key as keyof Player2State]) !==
            JSON.stringify(fresh[key as keyof Player2State]),
        )
    )
      return false;
  }
  return (
    (!s.cheatUsed || needsFull(s)) &&
    s.cutscenesSeen.every((n) => n <= s.hearts) &&
    (!s.creditsSeen || endingReady(s))
  );
}
const withHearts = (s: Player2State): Player2State => ({
  ...s,
  hearts: heartsFor(s),
});
export function advance(s: Player2State, e: Player2Event): Player2State {
  if (e.type === "choose") return s.slot ? s : { ...s, slot: "karol" };
  if (!s.slot) return s;
  switch (e.type) {
    case "care":
      return withHearts({
        ...s,
        needs: { ...s.needs, [e.need]: Math.min(100, s.needs[e.need] + 25) },
      });
    case "cheat":
      return withHearts({
        ...s,
        cheatUsed: true,
        needs: { sleep: 100, monster: 100, patience: 100, dengo: 100 },
      });
    case "note":
      return { ...s, note: e.text.slice(0, 280) };
    case "loot":
      return s.loot.includes(e.id) ? s : { ...s, loot: [...s.loot, e.id] };
    case "letter":
      return s.lettersOpened.includes(e.id)
        ? s
        : { ...s, lettersOpened: [...s.lettersOpened, e.id] };
    case "extract":
      return withHearts({ ...s, extracted: true, loot: [...lootIds] });
    case "water":
      return s.treeStage >= 28 ||
        !validDate(e.date) ||
        (s.lastWatered !== null && e.date <= s.lastWatered)
        ? s
        : withHearts({ ...s, treeStage: s.treeStage + 1, lastWatered: e.date });
    case "gift":
      return { ...s, giftSeen: true };
    case "cutscene":
      return e.id > s.hearts || s.cutscenesSeen.includes(e.id)
        ? s
        : { ...s, cutscenesSeen: [...s.cutscenesSeen, e.id] };
    case "credits":
      return endingReady(s) ? { ...s, creditsSeen: true } : s;
    case "postcard":
      return { ...s, postcardUnlocked: true };
    case "backup":
      return !Number.isSafeInteger(e.at) ||
        e.at < 0 ||
        (s.backupAt !== null && e.at - s.backupAt < 600000)
        ? s
        : { ...s, backupAt: e.at };
  }
}

export const achievements = (s: Player2State) => ({
  call: s.loot.includes("call"),
  eyes: needsFull(s),
  fleabag: s.loot.includes("fleabag"),
  dengo: s.needs.dengo === 100,
  home: s.extracted,
  garden: s.treeStage > 0,
  hug: false,
});
