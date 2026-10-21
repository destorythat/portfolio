import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";

export const metadata: Metadata = {
  title: "Unidigify",
  description:
    "Multi-tenant AI marketing platform for on-brand social posts, images, and publishing.",
};

export default function Page() {
  return <CaseStudy slug="unidigify" />;
}
