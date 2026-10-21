import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";

export const metadata: Metadata = {
  title: "Scam Detect",
  description: "Compliance and fraud reporting platform for scam case handling.",
};

export default function Page() {
  return <CaseStudy slug="scam-detect" />;
}
