"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";

export function ContactLinks() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const linkedinReady = /linkedin\.com\/in\/[^/]+/i.test(profile.linkedin);
  const rowClass =
    "flex items-center gap-3 rounded-2xl border border-ink/10 bg-surface px-4 py-3.5 transition hover:border-ink/25";

  const linkedinRow = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e7eadc] text-moss">
        <LinkedInIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">LinkedIn</span>
        <span className="mt-0.5 block text-sm font-medium">Connect with me</span>
      </span>
      <ArrowIcon />
    </>
  );

  return (
    <div className="space-y-3">
      {linkedinReady ? (
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className={rowClass}>
          {linkedinRow}
        </a>
      ) : (
        <div className={rowClass}>{linkedinRow}</div>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-surface px-4 py-3.5">
        <a href={`mailto:${profile.email}`} className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e7eadc] text-moss">
            <MailIcon />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Email</span>
            <span className="mt-0.5 block truncate text-sm font-medium">{profile.email}</span>
          </span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="shrink-0 rounded-full border border-ink/10 px-3 py-1 text-xs text-muted transition hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9.5H4V20h2.5V9.5ZM5.2 4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20 20h-2.5v-5.6c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1.1V20H11V9.5h2.4v1.4c.4-.7 1.3-1.7 3.2-1.7 2.3 0 4 1.5 4 4.8V20Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-faint" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
