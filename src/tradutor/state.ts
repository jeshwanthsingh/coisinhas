export const phraseIds = [
  "bom-dia",
  "dorme-na-chamada",
  "loot-primeiro",
  "meu-amorzinho",
  "vai-dormir",
  "jabuticabeira",
  "revirada",
  "you-hate-me",
  "portugues",
] as const;
export type PhraseId = (typeof phraseIds)[number];
export type TradutorState = {
  version: 1;
  translated: PhraseId[];
  endingSeen: boolean;
};
export type TradutorEvent =
  { type: "translate"; id: PhraseId } | { type: "ending" };
export const KEY = "coisinhas.tradutor.v1";
export const freshTradutor = (): TradutorState => ({
  version: 1,
  translated: [],
  endingSeen: false,
});
export const endingUnlocked = (s: TradutorState) =>
  s.translated.length === phraseIds.length;
export function validTradutor(v: unknown): v is TradutorState {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const s = v as TradutorState;
  return (
    s.version === 1 &&
    Array.isArray(s.translated) &&
    s.translated.every((id) =>
      (phraseIds as readonly unknown[]).includes(id),
    ) &&
    new Set(s.translated).size === s.translated.length &&
    typeof s.endingSeen === "boolean" &&
    (!s.endingSeen || endingUnlocked(s))
  );
}
export function advanceTradutor(
  s: TradutorState,
  e: TradutorEvent,
): TradutorState {
  if (e.type === "ending")
    return endingUnlocked(s) && !s.endingSeen ? { ...s, endingSeen: true } : s;
  return s.translated.includes(e.id)
    ? s
    : { ...s, translated: [...s.translated, e.id] };
}
