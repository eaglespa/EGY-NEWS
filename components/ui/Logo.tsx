export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle cx="32" cy="8.5" r="4" fill="var(--gold-2, #ecc878)" />
      <path d="M32 17 L9 55 L55 55 Z" fill="var(--gold-deep, #7c5f1c)" />
      <path d="M32 17 L32 55 L55 55 Z" fill="var(--gold, #d4a94e)" />
      <rect x="14" y="49.5" width="36" height="2.6" rx="1.3" fill="var(--nile, #3ab6d9)" />
      <rect x="19" y="44.5" width="10" height="2.4" rx="1.2" fill="var(--ink, #f2efe9)" opacity="0.9" />
      <rect x="35" y="44.5" width="12" height="2.4" rx="1.2" fill="var(--ink, #f2efe9)" opacity="0.55" />
    </svg>
  );
}

export function Logo({
  className = "",
  showTagline = false,
  tagline = "",
}: {
  className?: string;
  showTagline?: boolean;
  tagline?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-black tracking-[0.08em] text-ink">
          EGY&nbsp;
          <span className="font-italic text-gold">NEWS</span>
        </span>
        {showTagline && tagline && (
          <span className="mt-1 font-mono text-[9px] tracking-[0.34em] text-ink3 uppercase">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
