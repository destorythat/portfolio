"use client";

import Link from "next/link";
import { HeroName } from "@/components/hero-name";
import { ProjectMock } from "@/components/project-mocks";
import { profile, projects, skillGroups } from "@/lib/profile";

export function PortfolioPath() {
  return (
    <div className="portfolio-path">
      <section id="start" className="path-stop flex w-full flex-col justify-center px-6 sm:px-10 lg:px-16">
        <p className="text-sm text-olive">Stop 01 · {profile.role}</p>
        <HeroName className="rise relative z-10 mt-4 w-full cursor-none font-serif text-[clamp(4.5rem,8vw,8rem)] leading-[0.86] tracking-tight" />
        <p className="mt-6 max-w-lg font-serif text-2xl italic">Three years, five products, one path.</p>
        <a href="#story" className="mt-8 text-sm underline">
          Continue to the story
        </a>
      </section>

      <section id="story" className="path-stop flex w-full flex-col justify-center px-6 sm:px-10 lg:px-16">
        <p className="text-sm text-olive">Stop 02 · Story</p>
        <p className="mt-6 max-w-6xl font-serif text-3xl leading-snug sm:text-5xl">{profile.summary}</p>
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          {[
            [profile.years, "Years"],
            [String(projects.length), "Products"],
            ["MERN", "Core stack"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-serif text-4xl">{value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-olive">{label}</dd>
            </div>
          ))}
        </dl>
        <a href={`#${projects[0]?.slug}`} className="mt-8 text-sm underline">
          Continue to the work
        </a>
      </section>

      {projects.map((project, index) => {
        const following = projects[index + 1];
        return (
          <section
            key={project.slug}
            id={project.slug}
            className="path-stop grid w-full items-center gap-10 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16"
          >
            <div>
              <p className="text-sm text-olive">
                Stop {String(index + 3).padStart(2, "0")} · {project.duration}
              </p>
              <h2 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">{project.name}</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-olive">{project.category}</p>
              <p className="mt-5 max-w-md leading-7">{project.description}</p>
              <p className="mt-4 text-sm leading-6 text-olive">{project.stack.join(" · ")}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link href={`/work/${project.slug}`} className="underline">
                  Open this stop
                </Link>
                <a href={following ? `#${following.slug}` : "#skills"} className="underline">
                  {following ? `Continue to ${following.name}` : "Continue to skills"}
                </a>
              </div>
            </div>
            <ProjectMock slug={project.slug} />
          </section>
        );
      })}

      <section id="skills" className="path-stop flex w-full flex-col justify-center px-6 sm:px-10 lg:px-16">
        <p className="text-sm text-olive">Stop {String(projects.length + 3).padStart(2, "0")} · Skills</p>
        <h2 className="mt-4 font-serif text-5xl">What the path is built with</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {skillGroups.slice(0, 3).map((group) => (
            <article key={group.label} className="rounded-[1.4rem] border border-ink/10 bg-paper/80 p-5">
              <h3 className="text-xs uppercase tracking-[0.16em] text-olive">{group.label}</h3>
              <p className="mt-3 text-sm leading-6">{group.items.join(" · ")}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex gap-4 text-sm">
          <Link href="/skills" className="underline">
            All skills
          </Link>
          <a href="#arrive" className="underline">
            Continue to the end
          </a>
        </div>
      </section>

      <section id="arrive" className="path-stop flex w-full flex-col justify-center px-6 sm:px-10 lg:px-16">
        <p className="text-sm text-olive">Stop {String(projects.length + 4).padStart(2, "0")} · Arrive</p>
        <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
          This is where the journey <span className="italic">opens</span>
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-8">
          {profile.name}, {profile.role.toLowerCase()}. The work is above. The conversation starts here.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-full bg-moss px-5 py-2.5 text-sm text-paper">
            Let&apos;s talk
          </Link>
          <Link href="/work" className="rounded-full border border-moss/25 px-5 py-2.5 text-sm">
            Selected work
          </Link>
          <a href="#start" className="rounded-full border border-moss/25 px-5 py-2.5 text-sm">
            Back to the start
          </a>
        </div>
      </section>
    </div>
  );
}
