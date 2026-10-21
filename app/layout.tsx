import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CursorWave } from "@/components/cursor-wave";
import { SageScene } from "@/components/sage-scene";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full">
        <SageScene />
        <CursorWave />
        <div className="relative z-10">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
