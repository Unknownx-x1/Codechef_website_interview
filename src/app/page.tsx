import { ClubInfo } from "@/components/ClubInfo";
import { ChapterMetrics } from "@/components/ChapterMetrics";
import { Contact } from "@/components/Contact";
import { ContestTimeline } from "@/components/ContestTimeline";
import { EventsPreview } from "@/components/EventsPreview";
import { Hero } from "@/components/Hero";
import { Leaderboard } from "@/components/Leaderboard";
import { PageTransition } from "@/components/PageTransition";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { StatsTicker } from "@/components/StatsTicker";
import { getEvents } from "@/lib/api";

export default async function Home() {
  const events = await getEvents();

  return (
    <PageTransition>
      <Hero />
      <StatsTicker />
      <ChapterMetrics />
      <Leaderboard />
      <EventsPreview events={events} />
      <ClubInfo />
      <ContestTimeline />
      <section id="register" className="section-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="// registration"
          title="Reserve a seat before the leaderboard fills up."
          copy="The mock registration endpoint is shaped for a FastAPI backend, so the frontend contract can survive a real service swap."
        />
        <RegistrationForm events={events} />
      </section>
      <Contact />
    </PageTransition>
  );
}
