export function Orbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="animate-orb absolute -top-40 start-[8%] h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />
      <div className="animate-orb-rev absolute top-[30%] end-[-140px] h-[460px] w-[460px] rounded-full bg-nile/10 blur-3xl" />
      <div className="animate-orb absolute bottom-[-180px] start-[38%] h-[380px] w-[380px] rounded-full bg-gold/6 blur-3xl" style={{ animationDelay: "-6s" }} />
    </div>
  );
}
