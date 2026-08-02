"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  toggleSaved,
} from "@/lib/bookmarks";

export function BookmarkButton({ slug, label }: { slug: string; label: string }) {
  const saved = useSyncExternalStore(
    subscribe,
    () => getSnapshot().includes(slug),
    () => false,
  );

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(slug);
      }}
      aria-label={label}
      aria-pressed={saved}
      className={`press absolute top-3 end-3 z-30 grid size-9 place-items-center rounded-full border backdrop-blur-md transition-colors ${
        saved
          ? "border-gold/60 bg-gold/25 text-gold"
          : "border-white/20 bg-black/40 text-white hover:border-gold/60 hover:text-gold"
      }`}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 21C12 21 3 15.5 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12z" />
      </svg>
    </button>
  );
}
