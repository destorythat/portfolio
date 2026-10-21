"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, profile } from "@/lib/profile";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-moss/25 font-serif text-sm text-moss">
            {profile.initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium leading-tight text-foreground">
              {profile.name}
            </span>
            <span className="hidden text-xs text-olive sm:block">{profile.role}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(pathname, item.href)
                  ? "text-foreground underline decoration-moss/50 underline-offset-4"
                  : "text-olive hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="rounded-full bg-moss px-4 py-2 text-sm text-paper transition-colors hover:bg-olive"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-moss/20 text-sm lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-ink/10 bg-paper px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-lg font-serif"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
