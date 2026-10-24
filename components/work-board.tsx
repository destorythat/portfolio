"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectMock } from "@/components/project-mocks";
import { projectMatches, projects, workFilters } from "@/lib/profile";

export function WorkBoard() {
  const [filter, setFilter] = useState<(typeof workFilters)[number]>("All");
  const visible = projects.filter((project) => projectMatches(project, filter));

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {workFilters.map((item) => {
          const count =
            item === "All" ? projects.length : projects.filter((project) => projectMatches(project, item)).length;
          const selected = filter === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`rounded-full border px-3 py-1.5 text-sm transition duration-300 ${
                selected
                  ? "border-accent bg-accent text-on-accent"
                  : "border-ink/10 text-muted hover:text-foreground"
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
              <span className="ml-1.5 font-mono text-[11px]">{count}</span>
            </button>
          );
        })}
      </div>

      <div key={filter} className="mt-8 grid gap-5 md:grid-cols-2">
        {visible.map((project, index) => (
          <article
            key={project.slug}
            className="work-card lift-card group overflow-hidden rounded-3xl border border-ink/10 bg-surface"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="shot max-h-56 overflow-hidden border-b border-ink/10">
              <div className="origin-top transition duration-700 ease-out group-hover:scale-[1.045]">
                <ProjectMock slug={project.slug} />
              </div>
            </div>
            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{project.category}</p>
              <h3 className="mt-2 font-display text-3xl">{project.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{project.lede}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((item) => (
                  <li key={item} className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-muted">
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/work/${project.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm text-accent">
                View case study
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
