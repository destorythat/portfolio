"use client";

import { useEffect, useState } from "react";
import { heroRoles } from "@/lib/profile";

export function RoleLine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroRoles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="mt-4 font-display text-xl text-muted sm:text-2xl">
      Full Stack Developer,
      <br />
      <span key={heroRoles[index]} className="role-swap inline-block text-foreground">
        {heroRoles[index]}
      </span>
      <span className="caret ml-0.5 inline-block w-[2px] translate-y-0.5 bg-accent" aria-hidden="true">
        &nbsp;
      </span>
    </p>
  );
}
