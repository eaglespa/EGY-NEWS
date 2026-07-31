"use client";

import { useEffect, useState } from "react";

export function LiveClock({ locale }: { locale: string }) {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    const tick = () => {
      try {
        setNow(
          new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setNow(new Date().toLocaleTimeString());
      }
    };
    tick();
    timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [locale]);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-ink2">
      <span className="live-dot size-1.5 rounded-full bg-alert" aria-hidden />
      {now || "--:--:--"}
    </span>
  );
}
