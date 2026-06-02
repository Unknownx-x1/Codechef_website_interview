export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-8 border-b border-[var(--border)] pb-5">
      <p className="mb-3 font-mono text-xs uppercase text-[var(--muted)]">{eyebrow}</p>
      <h2 className="max-w-3xl font-display text-3xl font-black leading-none md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">{copy}</p> : null}
    </div>
  );
}
