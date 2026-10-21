import Link from "next/link";
import { nav, profile } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl text-foreground">{profile.name}</p>
          <p className="mt-2 text-sm text-olive">
            {profile.role}
            <span className="italic"> — 5+ years</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-olive">Menu</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-olive">Focus</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-foreground/80">
            MERN, NestJS, Next.js, authentication, payments, and generative AI
            wired into products that ship.
          </p>
          <Link href="/contact" className="mt-4 inline-block text-sm underline">
            Let&apos;s talk
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pb-8 text-xs text-olive sm:px-8">
        <p>© 2026 {profile.name}</p>
        <a href="#top" className="hover:underline">
          Back to top
        </a>
      </div>
    </footer>
  );
}
