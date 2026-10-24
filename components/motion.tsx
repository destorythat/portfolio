"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      className={`transition duration-700 ease-out ${className} ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function splitStat(value: string) {
  let index = 0;
  while (index < value.length && value.charCodeAt(index) >= 48 && value.charCodeAt(index) <= 57) index += 1;
  return { end: index > 0 ? Number(value.slice(0, index)) : 0, tail: value.slice(index), numeric: index > 0 };
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const { end, tail, numeric } = splitStat(value);
    if (!numeric) {
      setCurrent(value);
      return;
    }
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }
    let frame = 0;
    let start = 0;
    const run = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / 900, 1);
      setCurrent(`${Math.round(end * (1 - Math.pow(1 - progress, 3)))}${tail}`);
      if (progress < 1) frame = window.requestAnimationFrame(run);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      frame = window.requestAnimationFrame(run);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{current}</span>;
}

export function ThisYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}

export function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
  }

  function leave() {
    const node = ref.current;
    if (node) node.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div className="[perspective:1100px]" onPointerMove={move} onPointerLeave={leave}>
      <div
        ref={ref}
        className="transition-transform duration-300 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
