"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ value, duration = 500 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) {
      setDisplay(to);
      prev.current = to;
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else prev.current = to;
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      prev.current = to;
    };
  }, [value, duration]);

  return <>{display}</>;
}
