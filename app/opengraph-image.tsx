import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.brand} — ${SITE.tagline}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(1200px 600px at 80% -10%, #2a2414 0%, rgba(42,36,20,0) 55%), linear-gradient(135deg, #0a0a0f 0%, #12141a 60%, #0a0a0f 100%)",
          color: "#f5f1e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#d4af37",
              boxShadow: "0 0 24px rgba(212,175,55,0.8)",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 4, color: "#d4af37" }}>
            {SITE.brand}
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3,
              color: "rgba(245,241,232,0.55)",
              textTransform: "uppercase",
            }}
          >
            Live Wire
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "rgba(212,175,55,0.85)",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            {SITE.tagline}
          </div>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2 }}>
            EGY&nbsp;NEWS
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              flex: 1,
              height: 2,
              background: "linear-gradient(90deg, #d4af37, rgba(212,175,55,0))",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(245,241,232,0.6)",
              letterSpacing: 2,
            }}
          >
            {`${SITE.brand} . ${SITE.founded}`}
          </div>
        </div>
      </div>
    ),
    size
  );
}
