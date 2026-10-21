import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <p className="text-sm text-olive">404</p>
      <h1 className="mt-4 font-serif text-5xl">This page is not on the site.</h1>
      <Link href="/work" className="mt-6 inline-block text-sm underline">
        Back to selected work
      </Link>
    </div>
  );
}
