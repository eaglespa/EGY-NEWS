"use client";

export function ThemeToggle() {
  function toggle() {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "light" ? "dark" : "light";
    el.setAttribute("data-theme", next);
    try {
      localStorage.setItem("egy-theme", next);
    } catch {
      /* noop */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid size-10 place-items-center rounded-full border border-line bg-panel text-ink2 transition-all hover:border-gold hover:text-gold"
    >
      <span className="sun" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
    </button>
  );
}
