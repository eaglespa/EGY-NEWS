"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function HeaderSearch({
  lang,
  label,
  placeholder,
}: {
  lang: string;
  label: string;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    router.push(`/${lang}/search?q=${encodeURIComponent(term)}`);
    setOpen(false);
    setQ("");
  }

  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        className="press grid size-10 place-items-center rounded-full border border-line bg-panel text-ink2 transition-colors hover:border-gold hover:text-gold"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </button>

      {open && (
        <form
          onSubmit={submit}
          role="search"
          className="glass-strong animate-ticker-in absolute end-0 top-full z-50 mt-2 flex w-[min(19rem,calc(100vw-2.5rem))] items-center gap-2 rounded-2xl p-2 shadow-xl shadow-black/20"
        >
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="w-full bg-transparent px-2 py-2 text-sm text-ink placeholder:text-ink3 focus:outline-none"
          />
          <button
            type="submit"
            aria-label={label}
            className="press rounded-xl bg-gold px-3 py-2 text-black transition-colors hover:bg-gold-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="rtl:rotate-180">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="press rounded-full px-1.5 py-1 text-ink3 transition-colors hover:text-gold"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
