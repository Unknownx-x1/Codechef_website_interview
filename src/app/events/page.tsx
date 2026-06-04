import { EventFilters } from "@/components/EventFilters";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { getEvents } from "@/lib/api";

export const metadata = {
  title: "Events | CodeChef VIT Chennai",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageTransition>
      <section className="section-shell py-12 md:py-16">
        <SectionHeading
          eyebrow="// EVENT_INDEX"
          title="Campus competitive programming archive."
          copy="Filter by track, search like a terminal, then expand the event dossier for registration details."
        />
        <EventFilters events={events} />
      </section>
    </PageTransition>
  );
}
