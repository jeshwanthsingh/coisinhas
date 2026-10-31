import { useCallback, useEffect, useRef, useState } from "react";
/** Press-and-hold with a tap alternative (`finish`). Releasing early just resets; there is no failure state. */
export function useHold(ms: number, onDone: () => void) {
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);
  const start = useRef<number | null>(null);
  const done = useRef(false);
  const cb = useRef(onDone);
  cb.current = onDone;
  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    start.current = null;
  }, []);
  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    stop();
    setProgress(1);
    cb.current();
  }, [stop]);
  const cancel = useCallback(() => {
    stop();
    if (!done.current) setProgress(0);
  }, [stop]);
  const begin = useCallback(() => {
    if (done.current || start.current !== null) return;
    start.current = performance.now();
    const tick = () => {
      if (start.current === null) return;
      const p = Math.min(1, (performance.now() - start.current) / ms);
      setProgress(p);
      if (p >= 1) finish();
      else raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [ms, finish]);
  useEffect(() => stop, [stop]);
  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture?.(e.pointerId);
      begin();
    },
    onPointerUp: cancel,
    onPointerCancel: cancel,
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        begin();
      }
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") cancel();
    },
    onBlur: cancel,
    onContextMenu: (e: React.SyntheticEvent) => e.preventDefault(),
  };
  return { progress, handlers, finish };
}
