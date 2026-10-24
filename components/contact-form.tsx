"use client";

import { useState } from "react";
import { profile, projectTypes } from "@/lib/profile";

const fieldClass =
  "mt-2 w-full rounded-xl border border-ink/10 bg-[#eef0e4] px-3 py-3 text-sm text-foreground outline-none focus:border-accent";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-surface p-6 sm:p-8">
        <h3 className="font-display text-3xl">Mail app opened.</h3>
        <p className="mt-3 text-sm leading-6 text-muted">
          The note is addressed to{" "}
          <a className="text-accent" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          . Send it from your mail app to deliver it.
        </p>
        <button type="button" className="mt-6 text-sm text-accent underline" onClick={() => setSent(false)}>
          Write another
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-ink/10 bg-surface p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") ?? "");
        const email = String(data.get("email") ?? "");
        const type = String(data.get("type") ?? "");
        const message = String(data.get("message") ?? "");
        const subject = `Project note from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <h3 className="font-display text-2xl">Start a conversation</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Your name</span>
          <input required name="name" autoComplete="name" className={fieldClass} placeholder="Your name" />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@company.com"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-muted">Project type</span>
          <select name="type" className={fieldClass}>
            {projectTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="text-muted">About the project</span>
        <textarea
          required
          name="message"
          rows={5}
          className={`${fieldClass} resize-y`}
          placeholder="What are you building, and where should I help?"
        />
      </label>
      <button
        type="submit"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent-2 px-5 py-2.5 text-sm font-medium text-on-accent"
      >
        Send by email
      </button>
      <p className="mt-3 text-xs leading-5 text-faint">
        This opens your mail app with the note addressed to {profile.email}.
      </p>
    </form>
  );
}
