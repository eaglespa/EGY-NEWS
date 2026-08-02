import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  linkHref,
  linkLabel,
  index,
}: {
  eyebrow: string;
  title: string;
  linkHref?: string;
  linkLabel?: string;
  index?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="relative">
        {index && (
          <span
            aria-hidden
            className="pointer-events-none absolute -top-8 -start-3 font-display text-7xl leading-none font-black text-ink/[0.06] select-none sm:text-8xl"
          >
            {index}
          </span>
        )}
        <p className="relative mb-1.5 font-mono text-[10px] font-semibold tracking-[0.3em] text-gold uppercase">
          {eyebrow}
        </p>
        <h2 className="relative font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        <span aria-hidden className="relative mt-3 block h-px w-16 bg-gradient-to-r from-gold/80 to-transparent" />
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="press group flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink2 transition-all hover:border-gold hover:text-gold"
        >
          {linkLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
