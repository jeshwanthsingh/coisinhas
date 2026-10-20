// TODO(jesh): Replace only this SHA-256 placeholder with the hash of your postcard word.
export const POSTCARD_HASH =
  "0000000000000000000000000000000000000000000000000000000000000000";
export async function matchesPostcard(
  word: string,
  expected = POSTCARD_HASH,
): Promise<boolean> {
  if (!word.trim() || /^0{64}$/.test(expected)) return false;
  const bytes = new TextEncoder().encode(word.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hash = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return hash === expected;
}
