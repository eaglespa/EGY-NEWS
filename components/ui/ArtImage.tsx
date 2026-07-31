import type { ReactNode } from "react";

const PALETTES = [
  { a: "#0d1322", b: "#1b2a4a", c: "#d4a94e", d: "#3ab6d9" },
  { a: "#140d16", b: "#3a1f2e", c: "#ecc878", d: "#ff7a59" },
  { a: "#08110d", b: "#14432f", c: "#3ddc97", d: "#d4a94e" },
  { a: "#101422", b: "#252e4a", c: "#8ab4ff", d: "#d4a94e" },
  { a: "#160f08", b: "#4a2c10", c: "#e8b45a", d: "#ff8c42" },
  { a: "#0b1420", b: "#123c52", c: "#37b6d9", d: "#f2efe9" },
  { a: "#120d1f", b: "#2b1f4d", c: "#c8a2ff", d: "#ecc878" },
  { a: "#0d0d0d", b: "#33210d", c: "#f0c05a", d: "#ff5d3a" },
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

type Pattern = "pyramids" | "waves" | "rings" | "grid" | "orbs" | "dunes" | "city" | "sunburst";

const PATTERNS: Pattern[] = [
  "pyramids", "waves", "rings", "grid", "orbs", "dunes", "city", "sunburst",
];

function pick(seed: string) {
  const h = hash(seed);
  return {
    palette: PALETTES[h % PALETTES.length],
    pattern: PATTERNS[h % PATTERNS.length],
    seedA: (h % 360).toFixed(1),
  };
}

function PatternLayer({ pattern }: { pattern: Pattern }) {
  switch (pattern) {
    case "pyramids":
      return (
        <g fill="currentColor" opacity="0.14">
          <polygon points="80,520 260,180 440,520" />
          <polygon points="300,520 520,120 740,520" />
          <polygon points="520,520 700,240 880,520" />
          <circle cx="560" cy="90" r="46" fill="currentColor" opacity="0.9" />
          <path d="M0 520h800v80H0z" fill="currentColor" opacity="0.5" />
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke="currentColor" opacity="0.3" strokeWidth="2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <path
              key={i}
              d={`M0 ${280 + i * 42} C 140 ${240 + i * 42}, 260 ${340 + i * 42}, 420 ${280 + i * 42} S 700 ${240 + i * 42}, 800 ${290 + i * 42}`}
              transform={`translate(${Math.sin(i * 1.3) * 14} 0)`}
            />
          ))}
        </g>
      );
    case "rings":
      return (
        <g fill="none" stroke="currentColor" opacity="0.22" strokeWidth="1.5">
          {[70, 120, 170, 220, 270, 320, 380, 440].map((r, i) => (
            <circle key={r} cx="380" cy="330" r={r} opacity={i < 4 ? 1 : 0.6} />
          ))}
          <circle cx="380" cy="330" r="8" fill="currentColor" stroke="none" opacity="0.9" />
        </g>
      );
    case "grid":
      return (
        <g stroke="currentColor" opacity="0.16">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 62} y1="0" x2={i * 62 + 120} y2="620" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 64} x2="820" y2={i * 64 - 90} />
          ))}
          <rect x="330" y="220" width="140" height="90" strokeWidth="2" opacity="0.9" />
        </g>
      );
    case "orbs":
      return (
        <g fill="currentColor">
          <circle cx="180" cy="180" r="90" opacity="0.25" />
          <circle cx="620" cy="150" r="60" opacity="0.2" />
          <circle cx="480" cy="430" r="110" opacity="0.18" />
          <circle cx="120" cy="500" r="50" opacity="0.22" />
          <circle cx="700" cy="460" r="34" opacity="0.3" />
        </g>
      );
    case "dunes":
      return (
        <g fill="currentColor" opacity="0.18">
          <path d="M0 520 C 180 420, 340 560, 520 460 S 760 380, 800 470 V 620 H 0 Z" />
          <path d="M0 560 C 200 470, 400 620, 600 520 S 780 470, 800 520 V 620 H 0 Z" opacity="0.8" />
          <circle cx="560" cy="170" r="34" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
        </g>
      );
    case "city":
      return (
        <g fill="currentColor" opacity="0.16">
          {[
            { x: 40, w: 70, h: 220 }, { x: 130, w: 90, h: 300 }, { x: 240, w: 60, h: 180 },
            { x: 320, w: 110, h: 380 }, { x: 450, w: 70, h: 240 }, { x: 540, w: 100, h: 330 },
            { x: 660, w: 60, h: 200 }, { x: 730, w: 80, h: 260 },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={620 - b.h} width={b.w} height={b.h} />
          ))}
          <rect x="310" y="230" width="130" height="16" opacity="0.7" />
        </g>
      );
    case "sunburst":
      return (
        <g stroke="currentColor" opacity="0.2" strokeWidth="1.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="380" y1="330" x2="380" y2="20"
              transform={`rotate(${i * 15} 380 330)`}
            />
          ))}
          <circle cx="380" cy="330" r="70" fill="currentColor" fillOpacity="0.9" stroke="none" />
        </g>
      );
  }
}

export function ArtImage({
  seed,
  className = "",
  children,
}: {
  seed: string;
  className?: string;
  children?: ReactNode;
}) {
  const { palette, pattern, seedA } = pick(seed);

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ color: palette.c }}
      >
        <defs>
          <linearGradient id={`bg-${seedA}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.a} />
            <stop offset="55%" stopColor={palette.b} />
            <stop offset="100%" stopColor={palette.a} />
          </linearGradient>
          <radialGradient id={`glow-${seedA}`} cx="70%" cy="22%" r="60%">
            <stop offset="0%" stopColor={palette.d} stopOpacity="0.5" />
            <stop offset="100%" stopColor={palette.d} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sheen-${seedA}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id={`noise-${seedA}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.06" />
            </feComponentTransfer>
          </filter>
        </defs>

        <rect width="800" height="600" fill={`url(#bg-${seedA})`} />
        <rect width="800" height="600" fill={`url(#glow-${seedA})`} />
        <PatternLayer pattern={pattern} />
        <rect width="800" height="600" fill={`url(#sheen-${seedA})`} />
        <rect width="800" height="600" filter={`url(#noise-${seedA})`} />
        <rect width="800" height="600" fill="#000" opacity="0.16" />
      </svg>
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}
