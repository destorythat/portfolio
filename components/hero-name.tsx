"use client";

import { useRef } from "react";

const ACCENT = "#d4532b";
const REACH = 86;

const glyphs = [
  ..."Gokula".split("").map((ch) => ({ ch, italic: false, break: false })),
  { ch: "", italic: false, break: true },
  ..."Krishnan".split("").map((ch) => ({ ch, italic: true, break: false })),
  ..." N".split("").map((ch) => ({ ch, italic: false, break: false })),
];

export function HeroName({ className }: { className?: string }) {
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  function paint(clientX: number, clientY: number) {
    letters.current.forEach((node) => {
      if (!node) return;
      const box = node.getBoundingClientRect();
      const dx = clientX - (box.left + box.width / 2);
      const dy = clientY - (box.top + box.height / 2);
      node.style.color = dx * dx + dy * dy < REACH * REACH ? ACCENT : "";
    });
  }

  function clear() {
    letters.current.forEach((node) => {
      if (node) node.style.color = "";
    });
  }

  return (
    <>
      <h1
        className={
          className ??
          "rise relative z-10 mt-6 max-w-4xl cursor-none font-serif text-[clamp(3.4rem,9vw,7.4rem)] leading-[0.88] tracking-tight"
        }
        onPointerMove={(event) => paint(event.clientX, event.clientY)}
        onPointerEnter={(event) => paint(event.clientX, event.clientY)}
        onPointerLeave={clear}
      >
        {glyphs.map((glyph, index) =>
          glyph.break ? (
            <br key={index} />
          ) : (
            <span
              key={index}
              ref={(node) => {
                letters.current[index] = node;
              }}
              className={`inline-block transition-colors duration-150 ${glyph.italic ? "italic" : ""}`}
            >
              {glyph.ch === " " ? "\u00A0" : glyph.ch}
            </span>
          ),
        )}
      </h1>
    </>
  );
}
