export interface LeaderMember {
  name: string;
  handle: string;
  avatar?: string;
  github?: string;
  linkedin?: string;
  codechef?: string;
  email?: string;
}

export interface LeadershipRole {
  role: string;
  code: string;
  category: "faculty" | "executive" | "leads";
  prominence: "special" | "high" | "standard" | "lead";
  description: string;
  responsibilities: string[];
  members: LeaderMember[];
}

export const staticClubFacts = [
  "// established in 2019",
  "// official CodeChef VITC Chapter",
  "// active campus practice room",
  "// VIT Chennai institution",
];

export const leadershipDirectory: LeadershipRole[] = [
  {
    role: "Faculty Coordinator",
    code: "SYS_FAC_COORD",
    category: "faculty",
    prominence: "special",
    description: "Guides the chapter's academic alignment, university relations, and institutional approvals.",
    responsibilities: [
      "Oversee club activities and align with university guidelines.",
      "Facilitate campus lab and seminar hall allocations for mock rounds.",
      "Approve official certification and campus leaderboard merits."
    ],
    members: [
      {
        name: "Dr. Shridevi S",
        handle: "shridevi_s",
        avatar: "/avatars/faculty.jpg",
        email: "shridevi.s@vitchennai.ac.in",
        linkedin: "https://linkedin.com"
      }
    ]
  },
  {
    role: "Chairperson",
    code: "SYS_EXEC_CHAIR",
    category: "executive",
    prominence: "high",
    description: "Directs overall strategy, handles external collaborations, and maintains chapter integrity.",
    responsibilities: [
      "Manage coordination between technical, event, and outreach teams.",
      "Plan the seasonal contest roadmap and schedule Starters room locks.",
      "Liaise with CodeChef India coordinators for official chapter rating perks."
    ],
    members: [
      {
        name: "Dharshini",
        handle: "dharshini",
        avatar: "/avatars/chairperson.jpg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/dharshini"
      }
    ]
  },
  {
    role: "Vice Chairperson",
    code: "SYS_EXEC_VCHAIR",
    category: "executive",
    prominence: "high",
    description: "Supports chapter operations, oversees core deliverables, and runs internal audits.",
    responsibilities: [
      "Coordinate weekly operation updates across design and technical pods.",
      "Supervise upsolve editorial pipelines and verify validation heatmaps.",
      "Manage chapter resources and review semester timeline checkpoints."
    ],
    members: [
      {
        name: "Sarvesh R",
        handle: "sarvesh_r",
        avatar: "/avatars/vice_chairperson.jpg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/sarvesh_r"
      }
    ]
  },
  {
    role: "Secretary",
    code: "SYS_EXEC_SEC",
    category: "executive",
    prominence: "standard",
    description: "Maintains official archives, handles internal paperwork, and schedules sync rooms.",
    responsibilities: [
      "Log weekly agendas and handle rating delta snapshot reviews.",
      "Handle registration lists and secure slot distribution matrices.",
      "Coordinate office hours and campus communications."
    ],
    members: [
      {
        name: "Anush V",
        handle: "anush_v",
        avatar: "/avatars/secretary.jpg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/anush_v"
      }
    ]
  },
  {
    role: "Co-Secretary",
    code: "SYS_EXEC_COSEC",
    category: "executive",
    prominence: "standard",
    description: "Assists in official logging, logistics, and resource tracking.",
    responsibilities: [
      "Document feedback from mock round editorials and upsolve sheets.",
      "Maintain active lists of handles and ratings on the leaderboard.",
      "Assist in coordinating registration desk and help queue tickets."
    ],
    members: [
      {
        name: "Ayushi Tewari",
        handle: "ayushi_t",
        avatar: "/avatars/co_secretary.jpg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/ayushi_t"
      }
    ]
  },
  {
    role: "Technical Leads",
    code: "SYS_LEAD_TECH",
    category: "leads",
    prominence: "lead",
    description: "Runs custom judge setups, constructs round tests, and designs problem constraints.",
    responsibilities: [
      "Set up custom online judge scripts and local relay rooms.",
      "Verify test cases and generate robust datasets for contests.",
      "Maintain the campus leaderboard system and handle sync routines."
    ],
    members: [
      {
        name: "Nandu",
        handle: "nandu",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/nandu"
      },
      {
        name: "Sreeman",
        handle: "sreeman",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/sreeman"
      },
      {
        name: "Ariza",
        handle: "ariza",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/ariza"
      }
    ]
  },
  {
    role: "Project Leads",
    code: "SYS_LEAD_PROJ",
    category: "leads",
    prominence: "lead",
    description: "Coordinates internal software tools, web setups, and coding dashboards.",
    responsibilities: [
      "Manage development of internal chapter tools and mock judges.",
      "Coordinate pull requests for editorials and editorial repositories.",
      "Design data pipelines for tracking student rating histories."
    ],
    members: [
      {
        name: "Ishani",
        handle: "ishani",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/ishani"
      },
      {
        name: "Divya",
        handle: "divya",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/divya"
      },
      {
        name: "Manmay Chakraborty",
        handle: "manmay_c",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        codechef: "https://codechef.com/users/manmay_c"
      }
    ]
  },
  {
    role: "Event Management Leads",
    code: "SYS_LEAD_EVENTS",
    category: "leads",
    prominence: "lead",
    description: "Schedules rooms, arranges offline desk setups, and runs operation logs.",
    responsibilities: [
      "Manage check-in lists and physical lab setups for watch parties.",
      "Ensure robust power and network access during weekend mocks.",
      "Plan offline session timeline logistics and handle announcements."
    ],
    members: [
      {
        name: "Shauryavardhan Singh Tomar",
        handle: "shaurya_s_t",
        linkedin: "https://linkedin.com"
      },
      {
        name: "R Rilda",
        handle: "r_rilda",
        linkedin: "https://linkedin.com"
      }
    ]
  },
  {
    role: "Outreach Leads",
    code: "SYS_LEAD_OUTREACH",
    category: "leads",
    prominence: "lead",
    description: "Bridges the chapter with freshers, handles handle registrations, and runs mentorship rooms.",
    responsibilities: [
      "Onboard first-year students to the online practice queues.",
      "Manage weekly help desks and coordinate basic syntax study circles.",
      "Promote contest participation across active hostel blocks."
    ],
    members: [
      {
        name: "Karan Gandhi",
        handle: "karan_g",
        linkedin: "https://linkedin.com"
      },
      {
        name: "Sankari S",
        handle: "sankari_s",
        linkedin: "https://linkedin.com"
      }
    ]
  },
  {
    role: "Design Leads",
    code: "SYS_LEAD_DESIGN",
    category: "leads",
    prominence: "lead",
    description: "Crafts cybersecurity/CP-inspired web graphics, dossiers, and layout systems.",
    responsibilities: [
      "Develop graphic guidelines matching the terminal OS aesthetics.",
      "Design layouts for contest editorials, cheatsheets, and posters.",
      "Audit interface aesthetics of official chapter websites."
    ],
    members: [
      {
        name: "Gayatri Pavani Amara",
        handle: "gayatri_p_a",
        github: "https://github.com",
        linkedin: "https://linkedin.com"
      }
    ]
  },
  {
    role: "Social Media & Content Leads",
    code: "SYS_LEAD_CONTENT",
    category: "leads",
    prominence: "lead",
    description: "Writes editorials intros, handles campus rating announcements, and publishes post-round notes.",
    responsibilities: [
      "Draft rating snapshot updates and publish campus leaderboard badges.",
      "Manage announcements across official outreach networks.",
      "Author post-contest breakdowns and coordinate interview logs."
    ],
    members: [
      {
        name: "Siranjeevi K",
        handle: "siranjeevi_k",
        linkedin: "https://linkedin.com"
      }
    ]
  }
];

export const chapterMetrics = [
  { label: "Hosted rounds", value: "Weekly", suffix: "" },
  { label: "Rating star tiers", value: "1* to 5*", suffix: "" },
  { label: "Active practice", value: "Continuous", suffix: "" },
  { label: "Upsolve tracking", value: "Active", suffix: "" }
];

export const leaderboard = [
  { rank: 1, handle: "vitc_memoize", rating: 2148, stars: "5*" },
  { rank: 2, handle: "segfault_sage", rating: 2076, stars: "5*" },
  { rank: 3, handle: "dp_daemon", rating: 1989, stars: "4*" },
  { rank: 4, handle: "graphsmith", rating: 1924, stars: "4*" },
  { rank: 5, handle: "binary_bard", rating: 1841, stars: "4*" },
  { rank: 6, handle: "prefix_ninja", rating: 1768, stars: "3*" },
];

export const achievements = [
  "Multiple students crossed 1600 rating this season",
  "Active teams in ICPC practice squads",
  "Deliberate practice tracked across campus members",
  "Collaborative solving sessions run weekly"
];

export const contestTimeline = [
  { cadence: "Every Wed", title: "Weekly contests", detail: "Starters room, live ranklist, and rapid editorial review" },
  { cadence: "Every Sat", title: "Workshops", detail: "Topic labs for DP, graphs, strings, math, and implementation" },
  { cadence: "Monthly", title: "Mock interviews", detail: "Pair debugging, problem explanation, and complexity defense" },
  { cadence: "Quarterly", title: "Hackathons", detail: "Algorithm-heavy product sprints with judged demos" },
];
