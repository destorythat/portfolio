import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";

export const metadata: Metadata = {
  title: "HRDC",
  description: "Reporting and analytics platform for national human resource development.",
};

export default function Page() {
  return <CaseStudy slug="hrdc" />;
}
