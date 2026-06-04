import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.club.deleteMany();

  // Create Club
  const club = await prisma.club.create({
    data: {
      name: "CodeChef VIT Chennai",
      description: "Official CodeChef Chapter at VIT Chennai. Running weekly contests, workshops, editorials, and ICPC prep.",
      established: "2019",
    },
  });

  console.log("Created Club:", club.name);

  // Create Events
  const eventsData = [
    {
      id: "codechef-starters-watch-party",
      title: "CodeChef Starters Watch Party",
      category: "Contest",
      date: new Date("2026-06-14T19:45:00+05:30"),
      venue: "SJT-617",
      prize: "Post-contest editorial, rating delta analysis, and campus leaderboard badges.",
      summary: "Live Starters solving room with rank tracking, quick editorials, and focused post-contest debugging.",
      description: "A structured contest night for students who want the pressure of a live CodeChef Starters round with the support of peers and mentors. We track submissions, discuss hacks after the lock, and publish a short campus editorial the next morning.",
      track: "Competitive Programming",
      topics: ["Implementation", "Math", "Binary Search"],
      format: "Contest",
      duration: "3 Hours",
      mode: "Hybrid",
      clubId: club.id,
      image: "/events/starters-watch-party.jpg",
    },
    {
      id: "long-challenge-discussion",
      title: "Long Challenge Discussion",
      category: "Seminar",
      date: new Date("2026-06-18T17:30:00+05:30"),
      venue: "AB-2 Seminar Hall",
      prize: "Problem tags, curated upsolve sheet, and editorial notes.",
      summary: "A discussion circle for long-form problems, failed approaches, and converting partial ideas into accepted submissions.",
      description: "The session walks through long challenge problems using the actual campus submission timeline. We focus on why common wrong answers failed, how constraints shaped the solution, and which problems are worth upsolving first.",
      track: "Competitive Programming",
      topics: ["Data Structures", "Greedy", "Number Theory"],
      format: "Discussion",
      duration: "2 Hours",
      mode: "Offline",
      clubId: club.id,
      image: "/events/long-challenge.jpg",
    },
    {
      id: "icpc-preparation-camp",
      title: "ICPC Preparation Camp",
      category: "Workshop",
      date: new Date("2026-06-21T09:00:00+05:30"),
      venue: "LH-101",
      prize: "Team mock scorecards, topic ladders, and coach feedback.",
      summary: "A weekend camp for team strategy, implementation speed, graph routines, and ICPC-style problem selection.",
      description: "The camp simulates regional preparation with team roles, shared debugging habits, and five-hour contest rhythm. Each team leaves with a gap report and a topic-wise practice queue.",
      track: "ICPC Training",
      topics: ["Graphs", "Segment Trees", "String Algorithms"],
      format: "Camp",
      duration: "8 Hours",
      mode: "Offline",
      clubId: club.id,
      image: "/events/icpc-camp.jpg",
    },
    {
      id: "dynamic-programming-workshop",
      title: "Dynamic Programming Workshop",
      category: "Workshop",
      date: new Date("2026-06-24T16:00:00+05:30"),
      venue: "SJT-619",
      prize: "DP ladder unlocks and one-on-one review for top finishers.",
      summary: "Hands-on DP patterns: states, transitions, memo tables, knapsack, LIS variants, and bitmask basics.",
      description: "A workshop for coders who can solve greedy problems but freeze on DP. We build state definitions slowly, compare recursive and iterative formulations, then close with timed implementation drills.",
      track: "Topic Deep-Dive",
      topics: ["Dynamic Programming", "Bitmask", "Combinatorics"],
      format: "Workshop",
      duration: "2.5 Hours",
      mode: "Offline",
      clubId: club.id,
      image: "/events/dp-workshop.jpg",
    },
    {
      id: "graph-theory-sprint",
      title: "Graph Theory Sprint",
      category: "Contest",
      date: new Date("2026-06-27T18:30:00+05:30"),
      venue: "Online + Lab Relay",
      prize: "Graph topic badges and editorial contributor slots.",
      summary: "A fast graph practice sprint covering BFS, DFS, shortest paths, DSU, and topological order.",
      description: "A topic-focused contest for coders who know graph templates but want speed and reliability. Problems are ordered by implementation pressure, not just concept difficulty.",
      track: "Topic Sprint",
      topics: ["BFS/DFS", "Shortest Paths", "DSU", "Trees"],
      format: "Contest",
      duration: "3 Hours",
      mode: "Hybrid",
      clubId: club.id,
      image: "/events/graph-sprint.jpg",
    },
    {
      id: "mock-contest-night",
      title: "Mock Contest Night",
      category: "Contest",
      date: new Date("2026-07-04T20:00:00+05:30"),
      venue: "Online Judge Room",
      prize: "Campus ranklist, practice streak points, and mentor picks.",
      summary: "A full mock contest night with a private ranklist, penalties, editorials, and post-round upsolving.",
      description: "A private contest environment tuned for campus preparation. The round includes approachable A/B problems, one graph or DP mid-problem, and a hard problem designed for advanced teams.",
      track: "Competitive Programming",
      topics: ["Constructive Algorithms", "Math", "Graphs"],
      format: "Contest",
      duration: "2.5 Hours",
      mode: "Online",
      clubId: club.id,
      image: "/events/mock-contest.jpg",
    },
    {
      id: "math-royale",
      title: "Math Royale",
      category: "Contest",
      date: new Date("2026-04-04T19:00:00+05:30"),
      venue: "Online",
      summary: "A fast-paced logic game where mathematics and programming collide.",
      description: "Close the tabs, grab your friends, and hit the reset button. Math Royale is a fast-paced logic game to break the exam grind where math and coding collide. No expert knowledge needed—just bring your logic. Features a rapid-fire math round, progressive algorithmic coding rounds, and a structured knockout elimination format. Grab a partner (teams of 2-3) and climb the bracket.",
      track: "Competitive Programming",
      topics: ["Logic", "Mathematics", "Algorithms"],
      format: "Contest",
      duration: "3 Hours",
      mode: "Online",
      clubId: club.id,
      recapLink: "https://codechef.com",
      image: "/events/math-royale.jpg",
    },
    {
      id: "tetherx-pre-workshop",
      title: "Pre-Workshop for TetherX: Beyond The Code",
      category: "Workshop",
      date: new Date("2026-02-28T16:00:00+05:30"),
      venue: "Online",
      summary: "Focused prep session covering AI tools, prompting productivity, and professional documentation.",
      description: "A focused pre-workshop to help you build smarter and think strategically as part of the lead-up to TetherX. Session highlights include working with multi-format data (text, images, audio, video), practical AI guidelines, prompting and productivity with modern tools, professional collaboration, and strategic documentation.",
      track: "Hackathon Prep",
      topics: ["AI Tools", "Productivity", "Documentation", "Collaboration"],
      format: "Workshop",
      duration: "2 Hours",
      mode: "Online",
      clubId: club.id,
      archiveLink: "https://github.com",
      image: "/events/tetherx-workshop.jpg",
    },
    {
      id: "tetherx-hackathon",
      title: "TetherX: 24-Hour Industry Simulation Hackathon",
      category: "Hackathon",
      date: new Date("2026-03-06T10:00:00+05:30"),
      venue: "Netaji Auditorium, VIT Chennai",
      summary: "High-intensity hackathon mirroring real-world software product development under pressure.",
      description: "A carefully crafted, high-intensity hackathon that mirrors the dynamics of real-world product development. Participants will navigate evolving requirements, strategic decision-making, and collaborative execution within a competitive environment. Designed to test clarity of thought, adaptability, and technical depth under pressure. Teams of 3-4 members starting with an online submission and culminating in an offline showdown.",
      track: "Product Development",
      topics: ["Software Engineering", "Agile Development", "System Design"],
      format: "Hackathon",
      duration: "24 Hours",
      mode: "Offline",
      clubId: club.id,
      recapLink: "https://codechef.com",
      image: "/events/tetherx-hackathon.jpg",
    },
  ];

  for (const event of eventsData) {
    const createdEvent = await prisma.event.create({
      data: {
        id: event.id,
        title: event.title,
        category: event.category,
        date: event.date,
        venue: event.venue,
        prize: event.prize,
        summary: event.summary,
        description: event.description,
        track: event.track,
        topics: event.topics as any,
        format: event.format,
        duration: event.duration,
        mode: event.mode,
        clubId: event.clubId,
        recapLink: (event as any).recapLink,
        archiveLink: (event as any).archiveLink,
        image: (event as any).image,
      },
    });
    console.log("Created Event:", createdEvent.title);
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
