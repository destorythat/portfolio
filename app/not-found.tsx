import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1680px] px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-4 font-display text-5xl">This page is not on the site.</h1>
      <Link href="/#work" className="mt-6 inline-block text-sm text-accent">
        Back to selected work
      </Link>
    </div>
  );
}
