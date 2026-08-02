"use client";

import { useRef, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function apply(e: { clientX: number; clientY: number }) {
    const w = wrap.current;
    const c = card.current;
    if (!w || !c) return;
    const r = w.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `rotateY(${(px * max).toFixed(2)}deg) rotateX(${(-py * max).toFixed(2)}deg)`;
    c.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    c.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  }

  function onMove(e: React.MouseEvent) {
    if (reduced()) return;
    apply(e);
  }

  function onTouch(e: React.TouchEvent) {
    if (reduced()) return;
    const t = e.touches[0];
    if (t) apply(t);
  }

  function onLeave() {
    const c = card.current;
    if (!c) return;
    c.style.transform = "";
    c.style.removeProperty("--mx");
    c.style.removeProperty("--my");
  }

  return (
    <div
      ref={wrap}
      className={`tilt-wrap ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchMove={onTouch}
      onTouchEnd={onLeave}
      onTouchCancel={onLeave}
    >
      <div ref={card} className="tilt-card h-full">
        {children}
      </div>
    </div>
  );
}
