"use client";

import { useEffect, useRef } from "react";

export function CursorWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;
    const surface = canvas;
    const dot = cursor;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = surface.getContext("2d");
    if (!context) return;
    const drawContext = context;

    document.documentElement.classList.add("has-wave-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, on: false };
    const trail = Array.from({ length: 22 }, () => ({ x: pointer.x, y: pointer.y }));
    let frame = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      surface.width = Math.floor(window.innerWidth * ratio);
      surface.height = Math.floor(window.innerHeight * ratio);
      surface.style.width = `${window.innerWidth}px`;
      surface.style.height = `${window.innerHeight}px`;
      drawContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function hideCursor(target: EventTarget | null) {
      const field =
        target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']");
      return Boolean(field);
    }

    function onMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.on = !hideCursor(event.target);
      dot.style.opacity = pointer.on ? "1" : "0";
      dot.style.left = `${pointer.x}px`;
      dot.style.top = `${pointer.y}px`;
    }

    function onLeave() {
      pointer.on = false;
      dot.style.opacity = "0";
    }

    function draw(now: number) {
      drawContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (!pointer.on) return;

      const time = reduce ? 0 : now / 260;
      let previous: { x: number; y: number } = pointer;
      trail.forEach((point) => {
        point.x += (previous.x - point.x) * 0.38;
        point.y += (previous.y - point.y) * 0.38;
        previous = point;
      });

      drawContext.lineCap = "round";
      drawContext.lineJoin = "round";
      drawContext.beginPath();
      trail.forEach((point, index) => {
        const lift = Math.sin(time * 3 + index * 0.55) * (16 - index * 0.45);
        const x = point.x;
        const y = point.y + lift;
        if (index === 0) drawContext.moveTo(x, y);
        else drawContext.lineTo(x, y);
      });
      drawContext.strokeStyle = "rgba(255, 255, 255, 0.92)";
      drawContext.lineWidth = 2.4;
      drawContext.stroke();

      drawContext.beginPath();
      for (let step = -26; step <= 26; step += 1) {
        const fade = Math.cos((step / 26) * (Math.PI / 2));
        const x = pointer.x + step * 7;
        const y = pointer.y + Math.sin(step * 0.42 + time * 4) * 18 * fade;
        if (step === -26) drawContext.moveTo(x, y);
        else drawContext.lineTo(x, y);
      }
      drawContext.strokeStyle = "rgba(255, 255, 255, 0.75)";
      drawContext.lineWidth = 1.5;
      drawContext.stroke();
    }

    function tick(now: number) {
      draw(now);
      frame = window.requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, true);
    window.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-wave-cursor");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-30 h-dvh w-full" />
      <span
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed z-[70] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white opacity-0 shadow-[0_0_0_1px_rgba(36,31,24,0.28)]"
      >
        <span className="absolute inset-[9px] rounded-full bg-white" />
      </span>
    </>
  );
}
