import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Tilt } from "@/components/motion";
import { ProjectMock } from "@/components/project-mocks";
import { projects } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Products designed and built by Gokula Krishnan N.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm text-olive">(02) Work</p>
      <h1 className="rise mt-6 font-serif text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.9]">
        Selected <span className="italic">Work</span>
      </h1>

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28">
          <ol className="space-y-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={`#${project.slug}`} className="group grid grid-cols-[2rem_1fr] gap-2 text-sm">
                  <span className="text-olive">{project.index}</span>
                  <span>
                    <span className="block group-hover:underline">{project.name}</span>
                    <span className="block text-xs text-olive">{project.category}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-olive">{projects.length} projects</p>
          <p className="mt-8 font-serif text-2xl italic leading-snug">A few things I&apos;ve built.</p>
        </aside>

        <div className="space-y-24">
          {projects.map((project) => (
            <article key={project.slug} id={project.slug} className="scroll-mt-28">
              <Reveal>
                <Tilt>
                  <ProjectMock slug={project.slug} />
                </Tilt>
              <p className="mt-6 text-sm text-olive">{project.index}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-olive">{project.category}</p>
              <h2 className="mt-2 font-serif text-5xl leading-none sm:text-6xl">{project.name}</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/85">{project.description}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-olive">Role</dt>
                  <dd className="mt-1 text-sm">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-olive">Stack</dt>
                  <dd className="mt-1 text-sm leading-6">{project.stack.join(" · ")}</dd>
                </div>
              </dl>
              <Link
                href={`/work/${project.slug}`}
                className="mt-6 inline-block text-sm underline decoration-moss/40 underline-offset-4"
              >
                View case study: {project.name}
              </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
