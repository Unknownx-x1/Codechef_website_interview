const stats = ["847 members", "12 events", "6 years running", "3 active contests", "42 editorials", "19 campus setters"];

export function StatsTicker() {
  const track = [...stats, ...stats, ...stats];

  return (
    <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--background)] py-3 font-mono text-sm uppercase">
      <div className="flex w-max animate-marquee gap-8">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="text-[var(--muted)]">
            {item} <span className="ml-8 text-[var(--foreground)]">.</span>
          </span>
        ))}
      </div>
    </section>
  );
}
