"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-[1.4rem] border border-ink/10 bg-paper p-8">
        <p className="font-serif text-3xl">Note saved.</p>
        <p className="mt-3 max-w-md text-sm leading-6 text-foreground/80">
          It stays in this browser for now. The resume does not list a public email, so nothing was sent out.
        </p>
        <button
          type="button"
          className="mt-6 text-sm underline"
          onClick={() => setSent(false)}
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-[1.4rem] border border-ink/10 bg-paper p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const note = {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        };
        window.localStorage.setItem("portfolio-note", JSON.stringify(note));
        setSent(true);
      }}
    >
      <div className="grid gap-4">
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-[0.16em] text-olive">Name</span>
          <input
            required
            name="name"
            className="mt-2 w-full rounded-xl border border-ink/15 bg-[#fbfaf6] px-3 py-3 outline-none focus:border-moss"
          />
        </label>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-[0.16em] text-olive">Email</span>
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full rounded-xl border border-ink/15 bg-[#fbfaf6] px-3 py-3 outline-none focus:border-moss"
          />
        </label>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-[0.16em] text-olive">Message</span>
          <textarea
            required
            name="message"
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-ink/15 bg-[#fbfaf6] px-3 py-3 outline-none focus:border-moss"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-fit rounded-full bg-moss px-5 py-2.5 text-sm text-paper hover:bg-olive"
        >
          Leave a note
        </button>
      </div>
    </form>
  );
}
