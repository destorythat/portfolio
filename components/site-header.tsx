"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/profile";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
      const marker = window.scrollY + 120;
      let current = nav[0].id;
      for (const item of nav) {
        const node = document.getElementById(item.id);
        if (node && node.offsetTop <= marker) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="h-0.5 bg-ink/10" aria-hidden="true">
        <div
          className="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <div className="border-b border-ink/10 bg-[#f7f4ee]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/#top" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-semibold text-on-accent">
              {profile.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-sm leading-none">{profile.name}</span>
              <span className="mt-1 hidden text-[11px] text-faint sm:block">{profile.role}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  active === item.id ? "bg-ink/10 text-foreground" : "text-muted hover:text-foreground"
                }`}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent-2 px-3.5 py-2 text-sm font-medium text-on-accent"
            >
              Hire me
              <Arrow />
            </Link>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-ink/10 text-lg lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-ink/10 px-4 py-2 lg:hidden" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="block rounded-xl px-3 py-3 font-display text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
