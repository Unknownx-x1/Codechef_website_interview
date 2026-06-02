import { contestTimeline } from "@/data/club";
import { SectionHeading } from "@/components/SectionHeading";

export function ContestTimeline() {
  return (
    <section id="timeline" className="section-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="// contest timeline"
        title="A repeatable practice loop, not one-off events."
      />
      <div className="grid gap-0 border border-[var(--border)] bg-[var(--surface)] md:grid-cols-4">
        {contestTimeline.map((item, index) => (
          <div key={item.title} className="group border-b border-[var(--border)] p-5 last:border-b-0 hover:bg-[var(--background)] md:border-b-0 md:border-r md:last:border-r-0">
            <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase">
              <span className="text-acid">0{index + 1}</span>
              <span className="text-[var(--muted)]">{item.cadence}</span>
            </div>
            <h3 className="font-display text-2xl font-black">{item.title}</h3>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)] group-hover:text-[var(--foreground)]">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
