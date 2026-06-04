"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { achievements, staticClubFacts, contestTimeline, leadershipDirectory, leaderboard } from "@/data/club";
import { RegistrationForm } from "@/components/RegistrationForm";
import { useTypewriter } from "@/hooks/useTypewriter";
import type { ClubEvent } from "@/types";

type ModuleId = "dashboard" | "events" | "chapter" | "leaderboard" | "timeline" | "register" | "contact";

const modules: { id: ModuleId; label: string; command: string }[] = [
  { id: "dashboard", label: "Dashboard", command: "boot" },
  { id: "events", label: "Events", command: "rounds" },
  { id: "chapter", label: "Chapter", command: "org" },
  { id: "leaderboard", label: "Leaderboard", command: "rank" },
  { id: "timeline", label: "Timeline", command: "cron" },
  { id: "register", label: "Register", command: "join" },
  { id: "contact", label: "Contact", command: "ping" },
];

const terminalLines = [
  "ranklist synced: CodeChef Starters room opens at 19:45",
  "editorial queue: DP workshop notes published",
  "mentor signal: ICPC prep teams forming this week",
  "campus update: 847 active solvers online",
];

export function CodeChefOS({ events }: { events: ClubEvent[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedModule = searchParams.get("module") as ModuleId | null;
  const activeModule = modules.some((item) => item.id === requestedModule) ? requestedModule! : "dashboard";
  const activeIndex = modules.findIndex((item) => item.id === activeModule);

  const now = new Date();
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const activeEvent = upcomingEvents[0];
  const terminalText = useTypewriter(terminalLines, 22, 1800, true);

  function openModule(id: ModuleId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("module", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <main className="min-h-screen overflow-auto px-3 py-3 lg:overflow-hidden lg:px-4 lg:py-4">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1500px] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 lg:h-[calc(100vh-32px)] lg:min-h-0">
        <header className="terminal-panel relative z-10 flex min-h-12 items-center justify-between gap-3 px-4 font-mono text-xs uppercase">
          <div className="flex items-center gap-3">
            <span className="text-acid">CC_VITC_OS</span>
            <span className="hidden text-[var(--muted)] sm:inline">Official CodeChef Chapter at VIT Chennai</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <span className="hidden sm:inline">workspace/{activeModule}</span>
            <span className="text-acid">online</span>
          </div>
        </header>

        <div className="grid min-h-0 gap-3 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          <aside className="terminal-panel relative z-10 min-h-0 overflow-auto p-3">
            <div className="mb-3 border-b border-[var(--border)] pb-3 font-mono text-[11px] uppercase text-[var(--muted)]">
              /modules
            </div>
            <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {modules.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openModule(item.id)}
                  className={`group flex items-center justify-between border px-3 py-3 text-left font-mono text-xs uppercase transition ${
                    activeModule === item.id
                      ? "border-acid bg-acid text-[var(--background)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={activeModule === item.id ? "text-[var(--background)]" : "text-acid"}>{index + 1}</span>
                </button>
              ))}
            </nav>
          </aside>

          <section className="terminal-panel relative z-10 grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 font-mono text-xs uppercase">
              <div className="flex items-center gap-3">
                <span className="text-acid">window</span>
                <span className="text-[var(--muted)]">/{activeModule}</span>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <span className="border border-[var(--border)] px-2 py-1 text-[10px] text-[var(--muted)]">tab {activeIndex + 1}</span>
                <span className="border border-acid px-2 py-1 text-[10px] text-acid">active</span>
              </div>
            </div>
            <div className="min-h-0 overflow-auto p-4 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="min-h-full"
                >
                  <ModuleWindow
                    activeModule={activeModule}
                    events={events}
                    upcomingEvents={upcomingEvents}
                    pastEvents={pastEvents}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <aside className="terminal-panel relative z-10 hidden min-h-0 overflow-auto p-4 lg:block">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3 font-mono text-xs uppercase">
              <span>live/chapter</span>
              <span className="text-acid">synced</span>
            </div>
            <div className="grid gap-3">
              <InfoBlock label="upcoming contest" value={activeEvent?.title ?? "Contest room loading"} detail={activeEvent?.venue ?? "TBA"} />
              <InfoBlock label="member count" value="847 active solvers" detail="campus handles tracked" />
              <InfoBlock label="next module" value={activeEvent ? formatDate(activeEvent.date) : "TBA"} detail="ranklist and editorial room" />
            </div>
            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <p className="mb-3 font-mono text-xs uppercase text-[var(--muted)]">recent achievements</p>
              <div className="grid gap-3">
                {achievements.slice(0, 3).map((item) => (
                  <p key={item} className="border border-[var(--border)] p-3 font-mono text-xs leading-relaxed text-[var(--foreground)]">
                    &gt; {item}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <footer className="terminal-panel relative z-10 min-h-20 px-4 py-3 font-mono text-xs">
          <div className="mb-2 flex items-center justify-between uppercase text-[var(--muted)]">
            <span>bottom-terminal</span>
            <span className="text-acid">announcements</span>
          </div>
          <p className="text-[var(--foreground)]">
            <span className="text-acid">cc-vitc@workspace:~$ </span>
            {terminalText}
            <span className="animate-cursor text-acid">_</span>
          </p>
        </footer>
      </div>
    </main>
  );
}

function ModuleWindow({
  activeModule,
  events,
  upcomingEvents,
  pastEvents,
}: {
  activeModule: ModuleId;
  events: ClubEvent[];
  upcomingEvents: ClubEvent[];
  pastEvents: ClubEvent[];
}) {
  if (activeModule === "dashboard") {
    return (
      <div className="grid gap-5">
        <WindowIntro eyebrow="// boot sequence" title="SOLVE. COMPETE. REPEAT." copy="A chapter workspace for contests, DSA workshops, editorials, mentorship, and ICPC preparation." />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {staticClubFacts.slice(0, 4).map((fact, index) => (
            <MetricCell key={fact} label={`system/identity_0${index + 1}`} value={fact.replace("// ", "").toUpperCase()} />
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel title="today.focus">
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </Panel>
          <Panel title="chapter.identity">
            <div className="grid gap-2">
              {staticClubFacts.map((fact) => (
                <p key={fact} className="font-mono text-sm text-[var(--foreground)]">{fact}</p>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  if (activeModule === "events") {
    return (
      <div className="grid gap-5">
        <WindowIntro eyebrow="// contest calendar" title="Events run like contest rooms." copy="Each session is built around pressure, feedback, editorials, and upsolving." />
        
        {upcomingEvents.length > 0 && (
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase text-acid tracking-wider">{"// ACTIVE OPPORTUNITIES"}</div>
            <div className="grid gap-3">
              {upcomingEvents.map((event) => (
                <EventRow key={event.id} event={event} expanded />
              ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div className={upcomingEvents.length > 0 ? "mt-6" : ""}>
            <div className="mb-3 font-mono text-[11px] uppercase text-[var(--muted)] tracking-wider">{"// HISTORICAL RECORDS"}</div>
            <div className="grid gap-3">
              {pastEvents.map((event) => (
                <EventRow key={event.id} event={event} expanded />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeModule === "chapter") {
    return (
      <div className="grid gap-5">
        <WindowIntro eyebrow="// chapter database" title="Personnel & Officers Registry" copy="A read-only log of current leadership roles, duties, and active campus handles." />
        <div className="grid gap-3 md:grid-cols-2">
          {leadershipDirectory.map((role) => (
            <Panel key={role.code} title={role.code}>
              <p className="font-display text-lg font-black uppercase text-acid">{role.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{role.description}</p>
              <div className="mt-4 border-t border-[var(--border)] pt-3 font-mono text-xs">
                <span className="text-[var(--muted)]">LOGGED: </span>
                <span className="font-bold text-[var(--foreground)]">
                  {role.members.map((m) => m.name).join(" / ")}
                </span>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    );
  }

  if (activeModule === "leaderboard") {
    return (
      <div className="grid gap-5">
        <WindowIntro eyebrow="// ranklist" title="Campus scoreboard, terminal first." copy="Handles, ratings, stars, and the competitive pulse of the chapter." />
        <div className="overflow-hidden border border-[var(--border)]">
          <div className="grid grid-cols-[64px_1fr_96px_70px] border-b border-[var(--border)] px-4 py-3 font-mono text-[11px] uppercase text-[var(--muted)] md:grid-cols-[90px_1fr_140px_90px]">
            <span>rank</span>
            <span>handle</span>
            <span>rating</span>
            <span>stars</span>
          </div>
          {leaderboard.map((coder) => (
            <div key={coder.handle} className="grid grid-cols-[64px_1fr_96px_70px] border-b border-[var(--border)] px-4 py-4 font-mono text-sm last:border-b-0 hover:bg-acid hover:text-[var(--background)] md:grid-cols-[90px_1fr_140px_90px]">
              <span>#{coder.rank}</span>
              <span className="truncate">{coder.handle}</span>
              <span>{coder.rating}</span>
              <span>{coder.stars}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeModule === "timeline") {
    return (
      <div className="grid gap-5">
        <WindowIntro eyebrow="// chapter cron" title="A weekly loop for deliberate practice." copy="Contest, review, upsolve, workshop, repeat." />
        <div className="grid gap-3">
          {contestTimeline.map((item) => (
            <div key={item.title} className="grid gap-3 border border-[var(--border)] p-4 md:grid-cols-[140px_1fr]">
              <p className="font-mono text-xs uppercase text-acid">{item.cadence}</p>
              <div>
                <p className="font-display text-xl font-black">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeModule === "register") {
    return (
      <div className="grid gap-5">
        <WindowIntro eyebrow="// registration shell" title="Reserve a seat in the next room." copy="Pick a contest, workshop, or prep camp and join the chapter queue." />
        <RegistrationForm events={events} />
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <WindowIntro eyebrow="// contact" title="Ping the chapter desk." copy="For contests, editorial rooms, collaborations, and campus competitive programming support." />
      <div className="grid gap-3 md:grid-cols-3">
        <InfoBlock label="email" value="codechef@vitchennai.ac.in" detail="chapter operations" />
        <InfoBlock label="room" value="SJT-617" detail="contest nights" />
        <InfoBlock label="status" value="mentor queue open" detail="weekly office hours" />
      </div>
    </div>
  );
}

function WindowIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="border-b border-[var(--border)] pb-5">
      <p className="font-mono text-xs uppercase text-acid">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{copy}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--background)]/60">
      <div className="border-b border-[var(--border)] px-4 py-3 font-mono text-xs uppercase text-[var(--muted)]">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function MetricCell({ label, value }: { label: string; value: string }) {
  const isLong = value.length > 15;
  return (
    <div className="border border-[var(--border)] p-4">
      <p className="font-mono text-[11px] uppercase text-[var(--muted)]">{label}</p>
      <p className={`mt-3 font-mono font-bold text-[var(--foreground)] ${isLong ? "text-[11px] leading-normal text-acid" : "text-3xl"}`}>{value}</p>
    </div>
  );
}

function EventRow({ event, expanded = false }: { event: ClubEvent; expanded?: boolean }) {
  const isPast = new Date(event.date) < new Date();
  return (
    <div className={`border border-[var(--border)] p-4 transition-colors ${isPast ? "opacity-60 hover:border-[var(--muted)]" : "hover:border-acid"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase text-acid">
            {event.track} / {event.format} {isPast && <span className="text-[var(--muted)] ml-2">[COMPLETED]</span>}
          </p>
          <h2 className="mt-2 font-display text-2xl font-black">{event.title}</h2>
        </div>
        <p className="font-mono text-xs uppercase text-[var(--muted)]">{formatDate(event.date)}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{expanded ? event.description : event.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] uppercase">
        <span className="border border-[var(--border)] px-2 py-1">{event.venue}</span>
        <span className="border border-[var(--border)] px-2 py-1">{event.mode}</span>
        <span className="border border-[var(--border)] px-2 py-1">{event.duration}</span>
      </div>
    </div>
  );
}

function InfoBlock({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-[var(--border)] p-3">
      <p className="font-mono text-[10px] uppercase text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-mono text-sm font-bold text-[var(--foreground)]">{value}</p>
      <p className="mt-1 font-mono text-[11px] uppercase text-acid">{detail}</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
