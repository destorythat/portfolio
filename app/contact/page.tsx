import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a conversation with ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-sm text-olive">(05) Contact</p>
        <h1 className="mt-6 font-serif text-5xl leading-[0.95] sm:text-7xl">
          Let&apos;s <span className="italic">talk</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8">
          {profile.name}, {profile.role.toLowerCase()}. Tell me about the product, the team, or the system you want built.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
