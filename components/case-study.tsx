import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Tilt } from "@/components/motion";
import { ProjectMock } from "@/components/project-mocks";
import { getProject } from "@/lib/profile";

export function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-[1680px] px-4 py-16 sm:px-6">
      <Link href="/#work" className="text-sm text-accent">
        ← Selected work
      </Link>
      <p className="mt-8 font-mono text-sm text-accent">{project.index}</p>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-faint">{project.category}</p>
      <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">{project.name}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.description}</p>

      <Reveal className="shot mt-10 overflow-hidden rounded-3xl">
        <Tilt>
          <ProjectMock slug={project.slug} />
        </Tilt>
      </Reveal>

      <dl className="mt-10 grid gap-6 border-y border-ink/10 py-6 sm:grid-cols-4">
        {[
          ["Role", project.role],
          ["Duration", project.duration],
          ["Source", project.source],
          ["Stack", project.stack.join(" · ")],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-faint">{label}</dt>
            <dd className="mt-2 text-sm leading-6">{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 font-display text-3xl">What I owned</h2>
      <ol className="mt-6 max-w-3xl space-y-4">
        {project.responsibilities.map((item, index) => (
          <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-2 text-sm leading-6 text-muted">
            <span className="font-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
