import { useEffect, useState } from "react";
import { objects } from "../content/museumContent";
import type { Language, ObjectId } from "../content/museumContent";

function read(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}
export function useSaved<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    const stored = read(key);
    return validate(stored) ? stored : fallback;
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Private mode can deny storage; this visit still works. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
export function useMuseumState() {
  const [language, setLanguage] = useSaved<Language>(
    "coisinhas.language.v1",
    "pt",
    (v): v is Language => v === "pt" || v === "en",
  );
  const [found, setFound] = useSaved<ObjectId[]>(
    "coisinhas.found.v1",
    [],
    (v): v is ObjectId[] =>
      Array.isArray(v) &&
      v.every((id) => objects.some((o) => o.id === id)) &&
      new Set(v).size === v.length,
  );
  const [secretTaps, setSecretTaps] = useSaved<number>(
    "coisinhas.cat.v1",
    0,
    (v): v is number =>
      typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 5,
  );
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);
  const discover = (id: ObjectId) =>
    setFound((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
  return { language, setLanguage, found, discover, secretTaps, setSecretTaps };
}
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}
