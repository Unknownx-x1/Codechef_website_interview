import { EventFilters } from "@/components/EventFilters";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { getEvents } from "@/lib/api";

export const metadata = {
  title: "Events | CodeChef VIT Chennai",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageTransition>
      <section className="section-shell py-12 md:py-16">
        <SectionHeading
          eyebrow="// events"
          title="A newspaper-style board for contests, labs, and talks."
          copy="Filter by track, search like a terminal, then jump into the event dossier for registration details."
        />
        <EventFilters events={events} />
      </section>
    </PageTransition>
  );
}
