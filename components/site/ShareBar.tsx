"use client";

import { useState } from "react";
import type { ShareDict } from "@/lib/i18n-wire";
import { SITE } from "@/lib/site";

interface ShareTarget {
  id: string;
  label: string;
  href: (url: string, text: string) => string;
  color: string;
  icon: React.ReactNode;
}

const ICON_SIZE = 15;

const TARGETS: ShareTarget[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    color: "#3ddc97",
    icon: (
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-1.5-.6c-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4-.1.6.4l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.2.2-.4.4-.2.7.2.3 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.3.2.6.1.8-.1l.6-.8c.2-.3.5-.3.7-.2l2 .9c.3.1.5.2.5.3 0 .2 0 .7-.1 1.1Z" />
      </svg>
    ),
  },
  {
    id: "x",
    label: "X",
    href: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    color: "#e2e8f0",
    icon: (
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 2H22l-6.9 7.9L23 22h-6.4l-5-6.6L6 22H2.9l7.4-8.5L1.5 2h6.6l4.5 6 5.3-6Zm-1.1 18h1.7L7.8 3.9H6L17.8 20Z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "#3ab6d9",
    icon: (
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    id: "telegram",
    label: "Telegram",
    href: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    color: "#3ab6d9",
    icon: (
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.9 4.4 18.9 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L7.2 12.9l-4.6-1.4c-1-.3-1-1 .2-1.5L20.5 3c.8-.3 1.6.2 1.4 1.4Z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: "#3ab6d9",
    icon: (
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.5 8.5H3V21h3.5V8.5ZM4.8 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM21 12.6c0-3.2-1.7-4.7-4-4.7-1.8 0-2.7 1-3.2 1.8V8.5H10V21h3.5v-6.2c0-1.6.6-2.6 2-2.6 1.3 0 1.8.9 1.8 2.6V21H21v-8.4Z" />
      </svg>
    ),
  },
];

export function ShareBar({
  title,
  url,
  labels,
}: {
  title: string;
  url: string;
  labels: ShareDict;
}) {
  const [copied, setCopied] = useState(false);
  const shareText = `${title}\n\n${SITE.brand} — ${SITE.tagline}\n${url}`;
  const shortText = `${title} · ${SITE.brand}`;

  const handleNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url });
      } catch {
        /* user dismissed */
      }
    } else {
      void copyLink();
    }
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const el = document.createElement("textarea");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        el.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className="me-1 font-mono text-[10px] font-semibold tracking-[0.24em] text-ink3 uppercase">
        {labels.title}:
      </span>

      <a
        href={TARGETS[0].href(url, shortText)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={TARGETS[0].label}
        className="grid size-9 place-items-center rounded-full border border-good/40 bg-good/10 text-good transition-all hover:bg-good hover:text-black"
      >
        {TARGETS[0].icon}
      </a>

      {TARGETS.slice(1).map((t) => (
        <a
          key={t.id}
          href={t.href(url, shortText)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.label}
          className="grid size-9 place-items-center rounded-full border border-line bg-panel text-ink2 transition-all hover:border-gold hover:text-gold"
        >
          {t.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={() => void handleNative()}
        aria-label="Share"
        className="grid size-9 place-items-center rounded-full border border-line bg-panel text-ink2 transition-all hover:border-gold hover:text-gold"
      >
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 10.7 6.8-4M8.6 13.3l6.8 4" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => void copyLink()}
        className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink2 transition-all hover:border-gold hover:text-gold"
      >
        {copied ? (
          <span className="text-good">{labels.copied}</span>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {labels.copy}
          </>
        )}
      </button>
    </div>
  );
}
