import type { ReactNode } from "react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ContactLinks } from "@/components/contact-links";
import { CountUp, Reveal, ThisYear, Tilt } from "@/components/motion";
import { RoleLine } from "@/components/role-line";
import { ScrollStory } from "@/components/scroll-story";
import { WorkBoard } from "@/components/work-board";
import {
  facts,
  industries,
  marqueeA,
  marqueeB,
  principles,
  profile,
  projects,
  results,
  services,
  skillGroups,
  steps,
} from "@/lib/profile";

const meshNodes: [number, number][] = [
  [48, 42], [118, 28], [196, 54], [274, 24], [348, 62], [420, 36],
  [28, 128], [104, 112], [186, 138], [268, 108], [352, 132], [446, 118],
  [58, 214], [146, 196], [236, 220], [324, 188], [412, 214],
  [36, 300], [124, 286], [214, 312], [304, 274], [392, 308], [470, 286],
  [72, 386], [164, 368], [256, 396], [348, 362], [440, 390],
];

const meshEdges = meshNodes.flatMap((point, index) =>
  meshNodes
    .map((other, otherIndex) => ({
      otherIndex,
      dist: Math.hypot(point[0] - other[0], point[1] - other[1]),
    }))
    .filter((item) => item.otherIndex > index && item.dist < 118)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 2)
    .map((item) => [index, item.otherIndex] as const),
);

export function PortfolioHome() {
  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="hero-name">
        <div className="glow glow-a" aria-hidden="true" />
        <div className="glow glow-b" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              Full stack product work · MERN, NestJS, Next.js
            </p>
            <h1 id="hero-name" className="mt-6 font-display text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.9] tracking-tight">
              Gokula
              <span className="block">Krishnan.</span>
            </h1>
            <RoleLine />
            <p className="mt-6 max-w-xl text-base leading-7 text-muted">
              I build{" "}
              <strong className="font-medium text-foreground">SaaS platforms, secure APIs, and product dashboards</strong>.
              NestJS and Node.js on the backend; React and Next.js on the front; Gemini, Mem0, and MCP when the
              assistant has to save, approve, and publish. Three years of shipping full-stack systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent-2 px-5 py-2.5 text-sm font-medium text-on-accent"
              >
                See selected work
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center rounded-full border border-ink/15 px-5 py-2.5 text-sm text-foreground"
              >
                Start a project
              </Link>
            </div>
          </Reveal>

          <Tilt>
            <HeroMesh initials={profile.initials} />
          </Tilt>
        </div>

        <dl className="mx-auto grid max-w-[1680px] gap-3 px-4 pb-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            ["3+", "Years building for the web", "Full stack"],
            ["5", "Products in this profile", "SaaS to commerce"],
            ["35%", "Faster fraud workflows", "Scam Detect"],
            ["40%", "Less manual analysis", "Scam Detect"],
          ].map(([value, label, tag], index) => (
            <Reveal key={label} delay={index * 80}>
              <div className="h-full rounded-2xl border border-ink/10 bg-surface/80 p-4">
                <dt className="font-display text-4xl text-accent">
                  <CountUp value={value} />
                </dt>
                <dd className="mt-1 text-sm text-foreground">{label}</dd>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{tag}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <a href="#about" className="scroll-hint mx-auto mb-8 block w-fit text-xs tracking-[0.16em] text-faint uppercase">
          Scroll to explore
        </a>
      </section>

      <div className="space-y-3 border-y border-ink/10 bg-surface/50 py-4" aria-label="Technologies">
        <Marquee items={marqueeA} duration="46s" />
        <Marquee items={marqueeB} duration="54s" reverse />
      </div>

      <ScrollStory />

      <section id="about" className="scroll-mt-24 py-20">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow>About me</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
              Backend depth, product UI, and AI that sits inside the workflow.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted">{profile.summary}</p>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-ink/10 px-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{fact.label}</dt>
                  <dd className="mt-1 text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-ink/10 bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl">Industries I’ve built for</h3>
                <span className="font-mono text-xs text-faint">0{industries.length}</span>
              </div>
              <ul className="mt-4 space-y-3">
                {industries.map((item) => (
                  <li key={item.title} className="flex items-baseline justify-between gap-4 border-t border-ink/10 pt-3">
                    <span>{item.title}</span>
                    <span className="text-right text-sm text-muted">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {principles.map((item) => (
                <li key={item.title} className="rounded-2xl border border-ink/10 p-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-t border-ink/10 bg-surface/40 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6">
          <SectionHead
            eyebrow="Services"
            title="What I build"
            lead="New products, or an existing codebase that needs APIs, auth, billing, or an assistant that can finish the task."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 70} className="h-full">
              <article className="lift-card h-full rounded-3xl border border-ink/10 bg-surface p-5">
                <h3 className="font-display text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{service.copy}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-accent">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {results.map((result, index) => (
              <Reveal key={result.copy} delay={index * 70} className="h-full">
              <article className="lift-card h-full rounded-3xl border border-ink/10 p-5">
                <p className="font-display text-4xl text-accent">{result.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{result.copy}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{result.tag}</p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6">
          <SectionHead
            eyebrow="Experience"
            title="Five products, full stack on each"
            lead="Interface, APIs, auth, and the integrations that make them useful. Open a case study for the full list of what I owned."
          />
          <div className="mt-10 space-y-8">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
              <div className="grid gap-3 border-t border-ink/10 pt-8 md:grid-cols-[9rem_1fr]">
                <p className="font-mono text-sm text-accent">
                  {project.index}
                  <span className="mt-1 block text-faint">{project.duration}</span>
                </p>
                <div>
                  <h3 className="font-display text-3xl">
                    {project.name} <span className="text-base text-muted">{project.role}</span>
                  </h3>
                  <p className="mt-1 text-sm text-faint">{project.category}</p>
                  <ul className="mt-4 max-w-3xl space-y-2">
                    {project.responsibilities.slice(0, 3).map((item) => (
                      <li key={item} className="text-sm leading-6 text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/work/${project.slug}`} className="mt-4 inline-block text-sm text-accent">
                    Case study
                  </Link>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-t border-ink/10 bg-surface/40 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6">
          <SectionHead
            eyebrow="Selected work"
            title="Selected projects"
            lead="SaaS, compliance, reporting, productivity, and commerce. Open any project for the full case study."
          />
          <div className="mt-8">
            <WorkBoard />
          </div>
        </div>
      </section>

      <section id="stack" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6">
          <SectionHead
            eyebrow="Tech stack"
            title="Tools I reach for"
            lead="The stack behind the projects above, grouped the way I use it."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.label} delay={index * 70} className="h-full">
                <article className="stack-card h-full rounded-3xl border border-ink/10 bg-surface p-5">
                  <h3 className="flex items-baseline justify-between font-display text-xl">
                    {group.label}
                    <span className="font-mono text-xs text-faint">{String(group.items.length).padStart(2, "0")}</span>
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item, itemIndex) => (
                      <li
                        key={item}
                        className="stack-chip rounded-full border border-ink/10 px-2.5 py-1 text-sm text-muted"
                        style={{ animationDelay: `${itemIndex * 45}ms` }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-surface/40 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6">
          <SectionHead
            eyebrow="Process"
            title="How a build runs with me"
            lead="Four stages, the same on a focused feature or a product that takes a year."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80} className="h-full">
              <li className="lift-card h-full rounded-3xl border border-ink/10 p-5">
                <p className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.copy}</p>
              </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            Have a project in mind? <span className="text-accent">Let’s build it.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Tell me what you’re building. I take product work across SaaS, APIs, dashboards, and the integrations around them.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3">
              <ContactLinks />
              {[
                ["Role", profile.role],
                ["Experience", `${profile.years} years`],
                ["Systems", "SaaS, APIs, AI, commerce"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-ink/10 bg-surface px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{label}</p>
                  <p className="mt-1 font-display text-xl">{value}</p>
                </div>
              ))}
              <Link href="/#work" className="block rounded-2xl border border-ink/10 px-4 py-4 text-sm text-accent">
                See the five products →
              </Link>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-10">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6">
          <p className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-none text-ink/20">{profile.name}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-faint">
            <span>
              © <ThisYear /> {profile.name} · {profile.role}
              {" · "}
              <a href={`mailto:${profile.email}`} className="text-muted">
                {profile.email}
              </a>
            </span>
            <a href="#top" className="text-muted">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function HeroMesh({ initials }: { initials: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg className="hero-mesh absolute inset-0 h-full w-full" viewBox="0 0 480 420" aria-hidden="true">
        {meshEdges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            className="hero-line"
            x1={meshNodes[from][0]}
            y1={meshNodes[from][1]}
            x2={meshNodes[to][0]}
            y2={meshNodes[to][1]}
            stroke="#5c6648"
            strokeWidth="1.2"
          />
        ))}
        {meshNodes.map(([x, y], index) => (
          <circle
            key={index}
            className="hero-node"
            cx={x}
            cy={y}
            r={index % 5 === 0 ? 3.2 : 2}
            fill="#3e4634"
            style={{ animationDelay: `${index * 0.12}s` }}
          />
        ))}
        {meshEdges.slice(0, 9).map(([from, to], index) => (
          <circle key={`signal-${from}-${to}`} r="3.2" fill="#f7f4ee" stroke="#3e4634" strokeWidth="1.1">
            <animateMotion
              dur={`${5 + (index % 4)}s`}
              begin={`${index * 0.45}s`}
              repeatCount="indefinite"
              path={`M ${meshNodes[from][0]} ${meshNodes[from][1]} L ${meshNodes[to][0]} ${meshNodes[to][1]}`}
            />
          </circle>
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 sm:size-52">
        <div className="hero-radar size-full rounded-full border border-moss/50" />
        <div className="hero-radar hero-radar-late absolute inset-0 rounded-full border border-moss/30" />
      </div>
      <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 sm:size-56">
        <div className="hero-ring size-full rounded-full border border-dashed border-moss/40" />
      </div>
      <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 sm:size-64">
        <div className="hero-ring hero-ring-rev size-full rounded-full border border-moss/20" />
      </div>
      <div className="hero-core absolute left-1/2 top-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[6px] border-paper bg-gradient-to-br from-[#8ea084] to-[#5c6648] font-display text-4xl text-paper shadow-[0_24px_50px_-20px_rgba(62,70,52,0.55)] sm:size-44 sm:text-5xl">
        {initials}
      </div>
      <FloatCard className="left-[6%] top-[8%]" title="3+ years" detail="Full stack" delay="-0.4s" duration="5.6s" drift="10px">
        <ClockIcon />
      </FloatCard>
      <FloatCard className="right-[2%] top-[18%]" title="5 products" detail="SaaS to commerce" delay="-2.2s" duration="6.8s" drift="-12px">
        <LayersIcon />
      </FloatCard>
      <FloatCard className="bottom-[10%] left-[8%]" title="AI in the product" detail="Gemini · Mem0 · MCP" delay="-3.6s" duration="7.4s" drift="8px">
        <SparkIcon />
      </FloatCard>
      <Node className="right-[8%] bottom-[18%]" label="Nx" delay="-1s" duration="6.2s" drift="-8px" />
      <Node className="left-[18%] top-[42%]" label="Nj" delay="-2.8s" duration="5.4s" drift="12px" />
      <Node className="right-[16%] top-[46%]" label="Pg" delay="-4.1s" duration="7s" drift="-6px" />
    </div>
  );
}

function FloatCard({
  className,
  title,
  detail,
  delay,
  duration,
  drift,
  children,
}: {
  className: string;
  title: string;
  detail: string;
  delay: string;
  duration: string;
  drift: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`hero-float absolute z-10 flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-paper px-3 py-2 shadow-[0_16px_40px_-24px_rgba(44,51,40,0.45)] ${className}`}
      style={{ ["--float-delay" as string]: delay, ["--float-dur" as string]: duration, ["--float-x" as string]: drift }}
    >
      <span className="grid size-8 place-items-center rounded-xl bg-[#e7eadc] text-moss">{children}</span>
      <span>
        <span className="block text-sm font-medium leading-tight">{title}</span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-faint uppercase">{detail}</span>
      </span>
    </div>
  );
}

function Node({
  className,
  label,
  delay,
  duration,
  drift,
}: {
  className: string;
  label: string;
  delay: string;
  duration: string;
  drift: string;
}) {
  return (
    <span
      className={`hero-float absolute z-10 grid size-10 place-items-center rounded-2xl border border-ink/10 bg-paper font-mono text-[11px] text-moss shadow-[0_12px_30px_-18px_rgba(44,51,40,0.4)] ${className}`}
      style={{ ["--float-delay" as string]: delay, ["--float-dur" as string]: duration, ["--float-x" as string]: drift }}
    >
      {label}
    </span>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{children}</p>;
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      </div>
      <p className="text-sm leading-6 text-muted lg:text-right">{lead}</p>
    </div>
  );
}

function Marquee({ items, duration, reverse }: { items: string[]; duration: string; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden">
      <ul className={`marquee-track gap-3 px-2 ${reverse ? "marquee-rev" : ""}`} style={{ ["--dur" as string]: duration }}>
        {loop.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="rounded-full border border-ink/10 bg-surface px-4 py-2 text-sm text-muted"
            aria-hidden={index >= items.length}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
