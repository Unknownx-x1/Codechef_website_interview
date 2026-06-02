import { clubFacts, contributorPods } from "@/data/club";
import { SectionHeading } from "@/components/SectionHeading";

export function ClubInfo() {
  return (
    <section id="club" className="section-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="// club docs"
        title="A chapter for students who like the hard parts."
        copy="We run contests, write editorials, mentor first-time programmers, and build internal tools that make campus coding culture sharper."
      />
      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="border border-[var(--border)] bg-[var(--surface)] p-6">
          <pre className="font-mono text-5xl font-bold leading-tight text-acid" aria-label="ASCII CodeChef mark">
{`> _ CC
  VITC`}
          </pre>
          <div className="mt-8 grid gap-2 font-mono text-sm text-[var(--muted)]">
            {clubFacts.map((fact) => (
              <p key={fact}>{fact}</p>
            ))}
          </div>
        </div>
        <div className="border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-3 font-mono text-xs uppercase">
            <span>contributor/dashboard</span>
            <span>{contributorPods.length} pods</span>
          </div>
          <div className="grid gap-3">
            {contributorPods.map((pod) => (
              <div key={pod.name} className="group grid gap-3 border border-[var(--border)] p-4 hover:-translate-y-1 hover:border-acid md:grid-cols-[150px_1fr_90px] md:items-center">
                <div>
                  <p className="font-mono text-sm text-acid">{pod.name}</p>
                  <p className="font-mono text-[11px] text-[var(--muted)]">{pod.handle}</p>
                </div>
                <p className="font-mono text-xs leading-5 text-[var(--muted)] group-hover:text-[var(--foreground)]">{pod.signal}</p>
                <div className="border border-[var(--border)] px-3 py-2 text-center font-mono text-xs uppercase">{pod.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
