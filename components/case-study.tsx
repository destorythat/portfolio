import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Tilt } from "@/components/motion";
import { ProjectMock } from "@/components/project-mocks";
import { getProject } from "@/lib/profile";

export function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Link href="/work" className="text-sm text-olive hover:text-foreground">
        ← Selected work
      </Link>
      <p className="mt-8 text-sm text-olive">{project.index}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-olive">{project.category}</p>
      <h1 className="rise mt-3 font-serif text-5xl leading-none sm:text-7xl">{project.name}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80">{project.description}</p>

      <Reveal className="mt-10">
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
          <div key={label} className={label === "Stack" ? "sm:col-span-1" : undefined}>
            <dt className="text-xs uppercase tracking-[0.16em] text-olive">{label}</dt>
            <dd className="mt-2 text-sm leading-6">{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 font-serif text-3xl">
        What I <span className="italic">owned</span>
      </h2>
      <ol className="mt-6 max-w-3xl space-y-4">
        {project.responsibilities.map((item, index) => (
          <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-2 text-sm leading-6">
            <span className="text-olive">{String(index + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
