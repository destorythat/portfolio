import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Experience",
  description: "Career profile and product work by Gokula Krishnan N.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm text-olive">(03) Experience</p>
      <h1 className="mt-6 font-serif text-5xl leading-[0.95] sm:text-7xl">
        Career <span className="italic">profile</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/80">
        Five products. Full stack on each one — interface, APIs, auth, and the integrations that make them useful.
      </p>

      <ol className="mt-14 space-y-12">
        {projects.map((project) => (
          <li key={project.slug} className="grid gap-4 border-t border-ink/10 pt-8 md:grid-cols-[8rem_1fr]">
            <p className="text-sm text-olive">
              {project.index}
              <span className="mt-1 block">{project.duration}</span>
            </p>
            <div>
              <h2 className="font-serif text-4xl">{project.name}</h2>
              <p className="mt-1 text-sm text-olive">{project.category}</p>
              <p className="mt-4 max-w-2xl text-sm leading-6">{project.description}</p>
              <ul className="mt-4 max-w-2xl space-y-2">
                {project.responsibilities.slice(0, 3).map((item) => (
                  <li key={item} className="text-sm leading-6 text-foreground/85">
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/work/${project.slug}`} className="mt-4 inline-block text-sm underline">
                Case study
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
