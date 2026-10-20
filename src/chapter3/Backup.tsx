import { useEffect, useRef, useState } from "react";
import type { SceneProps } from "./Player2";
import { c } from "./content";
export function Backup({
  language,
  state,
  dispatch,
}: Omit<SceneProps, "onLanguage">) {
  const [now, setNow] = useState(Date.now);
  const [status, setStatus] = useState<
    "backupSent" | "backupError" | "backupSending" | null
  >(null);
  const busy = useRef(false);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const cooling = state.backupAt !== null && now - state.backupAt < 600000;
  async function send() {
    const at = Date.now();
    if (
      busy.current ||
      (state.backupAt !== null && at - state.backupAt < 600000)
    )
      return;
    busy.current = true;
    dispatch({ type: "backup", at });
    setNow(at);
    setStatus("backupSending");
    try {
      const response = await fetch(
        `https://ntfy.sh/${encodeURIComponent(import.meta.env.VITE_NTFY_TOPIC)}`,
        {
          method: "POST",
          body: c.backupMessage.pt,
          signal: AbortSignal.timeout(12000),
        },
      );
      if (!response.ok) throw new Error();
      setStatus("backupSent");
    } catch {
      setStatus("backupError");
    } finally {
      busy.current = false;
    }
  }
  return (
    <aside className="p2-backup">
      <button
        className="p2-link"
        disabled={cooling || status === "backupSending"}
        onClick={() => void send()}
      >
        {c.backup[language]} ✧
      </button>
      <p role="status">
        {status ? c[status][language] : cooling ? c.backupWait[language] : null}
      </p>
    </aside>
  );
}
