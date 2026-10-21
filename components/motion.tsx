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
      className={`transition duration-700 ease-out ${className} ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
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
