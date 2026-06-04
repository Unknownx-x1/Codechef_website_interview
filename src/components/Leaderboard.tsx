import { leaderboard } from "@/data/club";
import { SectionHeading } from "@/components/SectionHeading";

export function Leaderboard() {
  return (
    <section id="leaderboard" className="section-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="// leaderboard"
        title="Campus ranklist, terminal first."
        copy="Handles are anonymized-style examples, but the table behaves like a real chapter scoreboard: rank, CodeChef handle, rating, and stars."
      />
      <div className="terminal-panel overflow-hidden">
        <div className="relative z-10 grid grid-cols-[64px_1fr_96px_70px] border-b border-[var(--border)] px-4 py-3 font-mono text-[11px] uppercase text-[var(--muted)] md:grid-cols-[90px_1fr_140px_90px]">
          <span>rank</span>
          <span>handle</span>
          <span>rating</span>
          <span>stars</span>
        </div>
        <div className="relative z-10">
          {leaderboard.map((coder) => (
            <div
              key={coder.handle}
              className="group grid grid-cols-[64px_1fr_96px_70px] border-b border-[var(--border)] px-4 py-4 font-mono text-sm last:border-b-0 hover:bg-acid hover:text-[var(--background)] md:grid-cols-[90px_1fr_140px_90px]"
            >
              <span>#{coder.rank}</span>
              <span className="truncate">{coder.handle}</span>
              <span>{coder.rating}</span>
              <span>{coder.stars}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
