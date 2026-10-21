"use client";

import { useEffect, useState } from "react";
import { skillGroups } from "@/lib/profile";

const names = skillGroups.flatMap((group) => group.items);

export function SkillsBoard() {
  const [active, setActive] = useState(0);
  const [holding, setHolding] = useState(false);
  const [reduce, setReduce] = useState(false);
  const group = skillGroups[active] ?? skillGroups[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (holding || reduce) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % skillGroups.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [holding, reduce]);

  return (
    <div>
      <div className="mt-12 overflow-hidden border-y border-ink/10 py-4">
        <div className={`skill-marquee flex w-max gap-10 ${reduce ? "skill-marquee-still" : ""}`}>
          {[...names, ...names].map((name, index) => (
            <span key={`${name}-${index}`} className="font-serif text-2xl italic text-moss/80">
              {name}
            </span>
          ))}
        </div>
      </div>

      <section
        className="mt-10 overflow-hidden rounded-[1.6rem] border border-ink/10 bg-paper/85 p-6 backdrop-blur-sm sm:p-8"
        aria-live="polite"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-olive">{group.label}</p>
          <p className="text-xs text-olive">
            {String(active + 1).padStart(2, "0")} / {String(skillGroups.length).padStart(2, "0")}
          </p>
        </div>
        <div key={`swap-${group.label}`} className="skill-swap mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {group.items.map((item) => (
            <span key={item} className="font-serif text-4xl leading-none text-foreground sm:text-5xl">
              {item}
            </span>
          ))}
        </div>
        <span
          key={`meter-${group.label}`}
          className={`skill-meter mt-8 ${reduce || holding ? "skill-meter-hold" : ""}`}
        />
      </section>

      <div
        className="mt-8 grid gap-4 sm:grid-cols-2"
        onMouseLeave={() => setHolding(false)}
        onBlur={(event) => {
          const next = event.relatedTarget;
          if (!(next instanceof Node) || !event.currentTarget.contains(next)) setHolding(false);
        }}
      >
        {skillGroups.map((entry, index) => {
          const selected = index === active;
          return (
            <article
              key={entry.label}
              className={`skill-card relative overflow-hidden rounded-[1.4rem] border bg-paper p-6 ${
                selected
                  ? "skill-card-live border-moss/40 shadow-[0_18px_40px_-28px_rgba(62,70,52,0.7)]"
                  : "border-ink/10"
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
              onMouseEnter={() => {
                setActive(index);
                setHolding(true);
              }}
              onFocus={() => {
                setActive(index);
                setHolding(true);
              }}
              tabIndex={0}
            >
              <span className="skill-card-bar" aria-hidden />
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-xs uppercase tracking-[0.18em] text-olive">{entry.label}</h2>
                <span className="skill-index font-serif text-sm text-moss/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {entry.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="skill-chip rounded-full bg-[#eef0e4] px-3 py-1 text-sm"
                    style={{ animationDelay: `${index * 80 + 160 + itemIndex * 42}ms` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
