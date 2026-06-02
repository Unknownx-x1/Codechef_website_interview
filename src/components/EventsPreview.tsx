import type { ClubEvent } from "@/types";
import { EventTile } from "@/components/EventTile";
import { SectionHeading } from "@/components/SectionHeading";

export function EventsPreview({ events }: { events: ClubEvent[] }) {
  const [featured, ...rest] = events;

  return (
    <section id="events" className="section-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="// upcoming"
        title="Contest calendars should read like dispatches, not product cards."
        copy="Every CodeChef VITC event ships with a clear constraint, a leaderboard pulse, and a reason to show up prepared."
      />
      {featured ? <EventTile event={featured} featured /> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.slice(0, 4).map((event, index) => (
          <div key={event.id} className={index === 2 ? "md:col-span-2" : undefined}>
            <EventTile event={event} />
          </div>
        ))}
      </div>
    </section>
  );
}
