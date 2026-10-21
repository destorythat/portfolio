import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";

export const metadata: Metadata = {
  title: "Work Sphere",
  description: "SaaS productivity platform with task workflows, RBAC, and Stripe billing.",
};

export default function Page() {
  return <CaseStudy slug="work-sphere" />;
}
