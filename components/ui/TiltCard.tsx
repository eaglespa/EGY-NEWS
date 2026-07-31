"use client";

import { useRef, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = wrap.current;
    const c = card.current;
    if (!w || !c) return;
    const r = w.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
  }

  function onLeave() {
    if (card.current) card.current.style.transform = "";
  }

  return (
    <div ref={wrap} className={`tilt-wrap ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={card} className="tilt-card h-full">
        {children}
      </div>
    </div>
  );
}
