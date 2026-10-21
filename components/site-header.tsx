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
    <header className="sticky top-0 z-40 px-3 py-2 sm:px-5">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-ink/10 bg-paper/85 px-2 shadow-[0_18px_40px_-28px_rgba(44,51,40,0.85)] backdrop-blur-md sm:px-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 pl-1" onClick={() => setOpen(false)}>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-moss font-serif text-xs text-paper">
            {profile.initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-[0.95rem] leading-none text-foreground">
              {profile.name}
            </span>
            <span className="mt-1 hidden text-[11px] tracking-wide text-olive sm:block">{profile.role}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-[#e4e6d4] text-foreground"
                    : "text-olive hover:bg-[#eef0e4] hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 pr-0.5">
          <Link
            href="/contact"
            className="rounded-full bg-moss px-3.5 py-2 text-sm text-paper transition-colors hover:bg-olive"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full text-lg text-moss lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="mx-auto mt-2 max-w-6xl rounded-[1.4rem] border border-ink/10 bg-paper/95 px-4 py-2 shadow-[0_18px_40px_-28px_rgba(44,51,40,0.85)] backdrop-blur-md lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-3 py-3 font-serif text-lg ${
                      active ? "bg-[#e4e6d4]" : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
