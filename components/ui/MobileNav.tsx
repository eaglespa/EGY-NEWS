"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface NavItem {
  href: string;
  label: string;
}

export function MobileNav({ items, menuLabel }: { items: NavItem[]; menuLabel: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        className="grid size-10 place-items-center rounded-full border border-line bg-panel text-ink2 transition-colors hover:border-gold hover:text-gold"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-bg/95 backdrop-blur-2xl">
          <div className="container-x flex items-center justify-between py-4">
            <span className="font-display text-xl font-black tracking-widest gold-text-static">EGY NEWS</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-line text-ink2 hover:border-alert hover:text-alert"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="container-x flex flex-1 flex-col gap-1 overflow-y-auto py-6">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="animate-fade-up flex items-center gap-4 rounded-2xl px-4 py-4 text-2xl font-semibold text-ink transition-colors hover:bg-panel hover:text-gold"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <span className="font-mono text-xs text-ink3">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="container-x pb-8 pt-4 text-xs text-ink3">30 languages · Romero&apos;s Studios</div>
        </div>
      )}
    </div>
  );
}
