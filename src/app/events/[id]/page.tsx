import Link from "next/link";
import { notFound } from "next/navigation";
import { Countdown } from "@/components/Countdown";
import { PageTransition } from "@/components/PageTransition";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { getEventById, getEvents } from "@/lib/api";
import { categoryStyles, cx, formatEventDateLong } from "@/lib/utils";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  return {
    title: event ? `${event.title} | CodeChef VIT Chennai` : "Event | CodeChef VIT Chennai",
  };
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [event, events] = await Promise.all([getEventById(id), getEvents()]);

  if (!event) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="section-shell py-10 md:py-14">
        <Link href="/events" className="link-underline font-mono text-xs uppercase text-[var(--muted)]">
          &lt;- all events
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article>
            <div className="mb-5 flex flex-wrap gap-2 font-mono text-xs uppercase">
              <span>{formatEventDateLong(event.date)}</span>
              <span>|</span>
              <span>{event.venue}</span>
              <span>|</span>
              <span className={cx("border px-2 py-1", categoryStyles[event.category])}>{event.category}</span>
              <span>|</span>
              <span>
                {event.seatsFilled}/{event.seatsTotal} seats
              </span>
            </div>
            <h1 className="max-w-4xl font-display text-5xl font-black leading-none md:text-7xl">{event.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{event.summary}</p>
            <div className="mt-10 grid gap-10">
              <section>
                <SectionHeading eyebrow="// about this event" title="Built around constraints, speed, and taste." />
                <p className="max-w-3xl leading-7 text-[var(--muted)]">{event.description}</p>
              </section>
              <section>
                <SectionHeading eyebrow="// prizes" title={event.prize} />
              </section>
              <section>
                <SectionHeading eyebrow="// timeline" title="From check-in to final review." />
                <ol className="grid gap-3">
                  {event.timeline.map((item) => (
                    <li key={`${item.time}-${item.item}`} className="grid gap-3 border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm md:grid-cols-[90px_1fr]">
                      <span className="text-acid">{item.time}</span>
                      <span>{item.item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 border border-[var(--border)] bg-[var(--surface)] p-5 font-mono text-xs uppercase">
              <div className="flex justify-between gap-4 border-b border-[var(--border)] pb-3">
                <span className="text-[var(--muted)]">starts in</span>
                <Countdown target={event.date} />
              </div>
              <div className="mt-3 flex justify-between gap-4">
                <span className="text-[var(--muted)]">difficulty</span>
                <span>{event.difficulty}</span>
              </div>
            </div>
            <RegistrationForm events={events} selectedEventId={event.id} />
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
