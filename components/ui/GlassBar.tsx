"use client";

import { useEffect, useState, type ReactNode } from "react";

export function GlassBar({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`border-b border-line transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 shadow-lg shadow-black/5 backdrop-blur-2xl"
          : "bg-bg/80 backdrop-blur-2xl"
      }`}
    >
      <div
        className={`container-x flex items-center gap-3 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
