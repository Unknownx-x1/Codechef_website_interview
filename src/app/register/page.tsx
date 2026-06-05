import { RegistrationForm } from "@/components/RegistrationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { getEvents } from "@/lib/api";
import { PageTransition } from "@/components/PageTransition";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const { event } = await searchParams;
  const events = await getEvents();

  return (
    <PageTransition>
      <div className="pt-24 min-h-screen">
        <section id="register" className="section-shell py-16 md:py-20">
          <SectionHeading
            eyebrow="// registration"
            title="Reserve a seat before the leaderboard fills up."
            copy="Fill out the form below to secure your spot in our upcoming contests and events."
          />
          <RegistrationForm events={events} selectedEventId={event} />
        </section>
      </div>
    </PageTransition>
  );
}
