"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectMock } from "@/components/project-mocks";
import { projects } from "@/lib/profile";

export function FeaturedWork() {
  const [active, setActive] = useState(projects[0]?.slug ?? "");
  const current = projects.find((project) => project.slug === active) ?? projects[0];

  return (
    <div
      className="lg:grid lg:grid-cols-[1fr_22rem] lg:gap-10"
      onMouseLeave={() => setActive(projects[0]?.slug ?? "")}
    >
      <ol>
        {projects.map((project) => (
          <li key={project.slug} className="border-t border-ink/15">
            <Link
              href={`/work/${project.slug}`}
              className="group block py-7 sm:py-9"
              onMouseEnter={() => setActive(project.slug)}
              onFocus={() => setActive(project.slug)}
            >
              <span className="flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                <span>{project.index}</span>
                <span>{project.category}</span>
              </span>
              <span
                className={`mt-3 block font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.88] tracking-tight transition-transform duration-300 ${
                  active === project.slug ? "translate-x-2" : ""
                }`}
              >
                {project.name}
              </span>
              <span className="mt-4 block max-w-xl text-sm leading-6 text-muted">{project.lede}</span>
            </Link>
          </li>
        ))}
        <li className="border-t border-ink/15">
          <Link href="/#contact" className="flex items-end justify-between gap-6 py-8">
            <span className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">Start a project</span>
            <span className="text-sm text-muted">Contact →</span>
          </Link>
        </li>
      </ol>
      <div className="sticky top-24 hidden self-start lg:block">
        <div className="shot">
          <ProjectMock slug={current.slug} />
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{current.duration}</p>
      </div>
    </div>
  );
}
