"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function initTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem("egy-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* noop */
  }
  return "dark";
}

let themeCache: Theme = initTheme();

function subscribe(cb: () => void): () => void {
  window.addEventListener("egy-theme", cb);
  return () => window.removeEventListener("egy-theme", cb);
}

function getSnapshot(): Theme {
  return themeCache;
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLight = theme === "light";

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    themeCache = next;
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("egy-theme", next);
    } catch {
      /* noop */
    }
    window.dispatchEvent(new Event("egy-theme"));
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className="press grid size-10 place-items-center rounded-full border border-line bg-panel text-ink2 transition-colors hover:border-gold hover:text-gold"
    >
      <span className="theme-icon" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
    </button>
  );
}
