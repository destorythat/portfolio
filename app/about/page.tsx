import type { Metadata } from "next";
import { profile, projects } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.summary,
};

const focuses = [
  {
    title: "Product systems",
    copy: "Multi-tenant SaaS, dashboards, and workflows — from the first draft to publish, or from a scam report to a closed case.",
  },
  {
    title: "Auth, billing, cloud",
    copy: "Keycloak, Auth0, and Clerk for access. Stripe and Razorpay for payments. AWS for storage, compute, and monitoring.",
  },
  {
    title: "AI in the product",
    copy: "Gemini for on-brand writing, Mem0 for long-term brand memory, and MCP tool calling so the assistant can save, approve, and publish.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm text-olive">(01) About</p>
      <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] sm:text-7xl">
        Full stack, <span className="italic">shipped</span>
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-8">{profile.summary}</p>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {focuses.map((item) => (
          <article key={item.title} className="rounded-[1.4rem] border border-ink/10 bg-paper p-6">
            <h2 className="font-serif text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/80">{item.copy}</p>
          </article>
        ))}
      </div>

      <p className="mt-14 max-w-xl text-sm leading-6 text-olive">
        {projects.length} products in the career profile, including Unidigify, Scam Detect,
        HRDC, Work Sphere, and SpareWares. Role on each: {profile.role}.
      </p>
    </div>
  );
}
