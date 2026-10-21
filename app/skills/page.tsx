import type { Metadata } from "next";
import { SkillsBoard } from "@/components/skills-board";

export const metadata: Metadata = {
  title: "Skills",
  description: "Languages, frameworks, and integrations used by Gokula Krishnan N.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm text-olive">(04) Skills</p>
      <h1 className="rise mt-6 max-w-3xl font-serif text-5xl leading-[0.95] sm:text-7xl">
        Skills <span className="italic">profile</span>
      </h1>
      <p className="rise rise-late mt-6 max-w-xl text-lg leading-8 text-foreground/80">
        Languages, frameworks, and the services behind the products. One group comes forward, then the rest stays in reach.
      </p>
      <SkillsBoard />
    </div>
  );
}
