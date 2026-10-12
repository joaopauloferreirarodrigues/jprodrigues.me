import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Dispara onUnlock quando o visitante digita ↑ ↑ ↓ ↓ ← → ← → B A.
export function useKonamiCode(onUnlock) {
  const position = useRef(0);
  const callback = useRef(onUnlock);

  useEffect(() => {
    callback.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    function handleKey(event) {
      const tag = event.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === SEQUENCE[position.current]) {
        position.current += 1;
        if (position.current === SEQUENCE.length) {
          position.current = 0;
          callback.current();
        }
      } else {
        position.current = key === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
}
