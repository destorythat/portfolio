import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";

export const metadata: Metadata = {
  title: "SpareWares",
  description: "E-commerce platform for spare parts with live order tracking.",
};

export default function Page() {
  return <CaseStudy slug="sparewares" />;
}
