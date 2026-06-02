import { achievements, chapterMetrics } from "@/data/club";
import { CountUpNumber } from "@/components/CountUpNumber";
import { SectionHeading } from "@/components/SectionHeading";

export function ChapterMetrics() {
  return (
    <section id="metrics" className="section-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="// competitive programming metrics"
        title="The chapter is measured by accepted submissions, not applause."
        copy="We track the signals that matter for a campus CP community: authored problems, rating growth, contest participation, and ICPC preparation."
      />
      <div className="grid gap-3 md:grid-cols-5">
        {chapterMetrics.map((metric) => (
          <div key={metric.label} className="border border-[var(--border)] bg-[var(--surface)] p-4 hover:-translate-y-1 hover:border-acid">
            <p className="mb-6 min-h-10 font-mono text-[11px] uppercase text-[var(--muted)]">{metric.label}</p>
            <p className="font-mono text-3xl font-bold text-acid">
              <CountUpNumber value={metric.value} suffix={metric.suffix} />
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {achievements.map((achievement) => (
          <div key={achievement} className="border border-[var(--border)] bg-[var(--background)] p-4 font-mono text-sm leading-6">
            <span className="text-acid">&gt;</span> {achievement}
          </div>
        ))}
      </div>
    </section>
  );
}
