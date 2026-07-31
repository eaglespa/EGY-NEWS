"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AGENT_INDEX, type AgentIndexItem } from "@/lib/db";
import { askAgent } from "@/lib/agent";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

interface Msg {
  role: "user" | "agent";
  text: string;
  articles?: AgentIndexItem[];
}

export function AgentChat({ lang, dict }: { lang: Locale; dict: Dict }) {
  const d = dict.agent;
  const [messages, setMessages] = useState<Msg[]>([{ role: "agent", text: d.greet }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  function send(q: string) {
    const text = q.trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      const reply = askAgent(text, AGENT_INDEX);
      setMessages((m) => [...m, { role: "agent", text: reply.text, articles: reply.articles }]);
      setBusy(false);
    }, 480 + Math.random() * 420);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="fixed bottom-5 end-5 z-[70] flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-3xl border border-gold/30 bg-bg2/90 shadow-2xl shadow-black/50 backdrop-blur-2xl animate-fade-up">
          <div className="flex items-center gap-3 border-b border-line bg-gold/10 px-4 py-3">
            <span className="relative grid size-9 place-items-center" aria-hidden>
              <span className="animate-globe absolute size-8 rounded-full border border-gold/50" />
              <span className="relative text-xs text-gold">●</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">{d.title}</p>
              <p className="truncate font-mono text-[10px] text-ink3">{d.subtitle}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid size-8 place-items-center rounded-full text-ink3 transition-colors hover:bg-panel hover:text-alert"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "rounded-ee-md bg-gold text-black"
                      : "rounded-ss-md border border-line bg-panel text-ink"
                  }`}
                >
                  {m.text}
                  {m.articles && m.articles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {m.articles.map((a) => (
                        <Link
                          key={a.slug}
                          href={`/${lang}/article/${a.slug}`}
                          className="group block rounded-xl border border-line bg-bg/60 p-3 transition-colors hover:border-gold/50"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] tracking-widest text-gold uppercase">
                              {a.category}
                            </span>
                            {a.breaking && (
                              <span className="rounded bg-alert px-1.5 py-0.5 font-mono text-[8px] font-black tracking-widest text-black uppercase">
                                {dict.ticker.breaking}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[12px] leading-snug font-semibold text-ink group-hover:text-gold">
                            {a.title}
                          </p>
                          <p className="mt-1 font-mono text-[9px] text-ink3">{d.readArticle} →</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-ss-md border border-line bg-panel px-3.5 py-3">
                  <span className="size-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "0ms" }} />
                  <span className="size-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "140ms" }} />
                  <span className="size-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "280ms" }} />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
              {[d.s1, d.s2, d.s3].map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] text-ink2 transition-colors hover:border-gold hover:text-gold"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line bg-bg/60 p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={d.placeholder}
              aria-label={d.placeholder}
              className="flex-1 rounded-full border border-line bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink3 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={d.send}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-black transition-all hover:bg-gold-2 disabled:opacity-40"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="rtl:-scale-x-100">
                <path d="M3 11.5L21 3l-7.5 18-3-7.5L3 11.5z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) setTimeout(() => inputRef.current?.focus(), 200);
        }}
        aria-label={d.title}
        className="group relative grid size-14 place-items-center rounded-full border border-gold/50 bg-bg2/90 shadow-xl shadow-black/40 backdrop-blur-xl transition-transform hover:scale-105"
      >
        {!open && (
          <span className="live-dot absolute -top-0.5 -end-0.5 size-3 rounded-full bg-alert" aria-hidden />
        )}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold">
          <path d="M12 3c4.4 0 8 3.3 8 7.4 0 4-3.6 7.4-8 7.4a8.9 8.9 0 0 1-3.2-.6L5 18l1.2-3.2A7 7 0 0 1 4 10.4C4 6.3 7.6 3 12 3Z" />
          <path d="M9 10h.01M12 10h.01M15 10h.01" strokeLinecap="round" strokeWidth="2.4" />
        </svg>
        <span className="absolute -top-9 whitespace-nowrap rounded-full border border-line bg-bg2 px-3 py-1 font-mono text-[10px] tracking-widest text-ink2 opacity-0 transition-opacity group-hover:opacity-100">
          {d.title}
        </span>
      </button>
    </div>
  );
}
