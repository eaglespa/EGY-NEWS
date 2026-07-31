"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/lib/locales";

export function LocaleSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentInfo = LOCALES.find((l) => l.code === current) ?? LOCALES[0];

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const switchTo = useCallback(
    (code: string) => {
      setOpen(false);
      const rest = pathname.replace(/^\/[^/]+/, "");
      router.push(`/${code}${rest}`);
    },
    [pathname, router],
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-2 text-xs font-medium text-ink2 transition-all hover:border-gold hover:text-gold"
      >
        <span aria-hidden>{currentInfo.flag}</span>
        <span>{currentInfo.code.toUpperCase()}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6" className="transition-transform" style={{ transform: open ? "rotate(180deg)" : undefined }}>
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute end-0 top-[calc(100%+10px)] z-50 max-h-[70vh] w-64 overflow-y-auto rounded-2xl border border-line bg-bg2 p-2 shadow-2xl shadow-black/40"
        >
          <div className="sticky top-0 z-10 -m-2 mb-1 flex items-center justify-between bg-bg2 px-3 py-2 text-[10px] font-semibold tracking-[0.2em] text-ink3">
            <span>30 LANGUAGES</span>
            <span className="animate-caret text-gold">|</span>
          </div>
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === current}
              onClick={() => switchTo(l.code)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                l.code === current
                  ? "bg-gold/15 text-gold"
                  : "text-ink2 hover:bg-panel hover:text-ink"
              }`}
            >
              <span className="text-base" aria-hidden>
                {l.flag}
              </span>
              <span className="flex-1 truncate">{l.native}</span>
              <span className="font-mono text-[10px] text-ink3">{l.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
