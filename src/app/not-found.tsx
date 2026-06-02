import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell grid min-h-[70vh] place-items-center py-16">
      <div className="border border-[var(--border)] bg-[var(--surface)] p-8">
        <p className="font-mono text-sm text-warning">&gt; route not found</p>
        <h1 className="mt-4 font-display text-5xl font-black">404</h1>
        <Link href="/" className="mt-6 inline-block border border-acid bg-acid px-4 py-3 font-mono text-xs text-black">
          return home_
        </Link>
      </div>
    </main>
  );
}
