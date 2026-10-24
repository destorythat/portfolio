"use client";

import { useEffect, useRef } from "react";

export function CursorWave() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!cursor || !fine) return;
    const dot = cursor;

    document.documentElement.classList.add("has-wave-cursor");

    function hideCursor(target: EventTarget | null) {
      const field =
        target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']");
      return Boolean(field);
    }

    function onMove(event: PointerEvent) {
      dot.style.opacity = hideCursor(event.target) ? "0" : "1";
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
    }

    function onLeave() {
      dot.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, true);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-wave-cursor");
    };
  }, []);

  return (
    <span
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed z-[70] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white opacity-0 shadow-[0_0_0_1px_rgba(44,51,40,0.35)]"
    >
      <span className="absolute inset-[9px] rounded-full bg-white" />
    </span>
  );
}
