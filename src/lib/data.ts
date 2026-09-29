export const profile = {
  name: "Satyam Patil",
  callsign: "SATYAM PATIL",
  role: "AI & Systems Engineer",
  tagline: "I build multi-agent AI systems and secure Android internals.",
  location: "Maharashtra, India",
  email: "satyam.content@gmail.com",
  phone: "+91 9370162911",
  links: {
    github: "https://github.com/Satyampatil513",
    linkedin: "https://linkedin.com/in/satyam-patil-045771223",
    resume: "/resume.pdf",
  },
  about: [
    "I'm a Research Engineer at Samsung Research working at the intersection of AI automation and low-level Android security, building pipelines that debug systems faster than humans can and hardening SELinux policy across production builds.",
    "Alongside that, I co-founded Rankit, an AI-powered JEE prep platform now live and in use. My path ran through IIT Mandi (B.Tech CSE) and a semester at TU Dresden, with detours into on-device ML, full-stack products, and satellites that actually flew. I like problems where the AI layer and the systems layer meet.",
  ],
};

/** The hero split. One frame, read two ways: dithered down to a machine's view
 * on the left, left alone on the right. */
export const splitPortrait = {
  src: "/images/portrait.jpg",
  alt: "Satyam Patil standing above the Danube in Budapest, with the Hungarian Parliament behind him",
};

export const fieldPhoto = {
  src: "/images/summit-2400.jpg",
  mobileSrc: "/images/summit-mobile.jpg",
  alt: "Satyam Patil standing on a snow-covered ridge in Himachal Pradesh, arms outstretched, with Himalayan peaks in the background",
};

export const cansatMission = {
  title: "CanSat 2023",
  subtitle: "Team 1072 STACSAT, NASA & AAS International Competition",
  image: "/images/cansat-payload-cad.jpg",
  imageCaption: "Payload physical layout, CDR 2023, CAD by Team STACSAT",
  description:
    "A can-sized satellite launched to ~725 m, descending under a two-stage parachute system before releasing an autonomous payload that self-stabilizes, deploys a landing gear, and raises a flag on touchdown. I led electrical power subsystem design and built the Ground Control System that received live telemetry over a 2 km radio link.",
  specs: [
    { label: "Global Rank", value: "Top 21" },
    { label: "Descent Rate (final)", value: "5 m/s" },
    { label: "Telemetry Range", value: "2000 m" },
    { label: "GCS Response", value: "1 s" },
  ],
  href: "https://github.com/BlackDevil559/CANSAT__GCS__Application",
};

export type Telemetry = { label: string; value: string; unit?: string };

export const telemetry: Telemetry[] = [
  { label: "Debug Automated", value: "80", unit: "%" },
  { label: "Experience", value: "2", unit: "+ yrs" },
  { label: "Global CANSAT Rank", value: "21", unit: "TOP" },
  { label: "Hackathon Wins", value: "3", unit: "×1st" },
];

export type Experience = {
  org: string;
  role: string;
  location: string;
  start: string;
  end: string;
  stack: string[];
  bullets: string[];
  status: "active" | "past";
  image?: string;
};

export const experience: Experience[] = [
  {
    org: "Samsung Research",
    role: "Research Engineer",
    location: "Noida, India",
    start: "Jun 2025",
    end: "Present",
    status: "active",
    stack: ["LLM Agents", "RAG", "SEAndroid", "Android Security"],
    image: "/images/samsung-noida.jpg",
    bullets: [
      "Built AX_Agent, a ReAct-loop agentic system that runs entirely on internal infrastructure. It exposes Samsung's own security and porting scripts as tools, so engineers drive multi-step porting and policy work in plain language, against a confidential codebase no external model is allowed anywhere near.",
      "Built CoreBrain, a RAG system over internal JIRA, the project lifecycle around it, and the commits that actually closed each issue. Every case is distilled to a problem/solution pair, so a freshly filed bug arrives already carrying its closest prior fixes and a route to resolution.",
      "Engineered an LLM-driven SEAndroid pipeline that triages incoming policy issues, drafts and validates candidate SELinux rules, and prepares the change lists, taking roughly 80% of policy debugging off engineers' hands.",
      "Resolved 100+ SEAndroid and security-module issues (policy misconfigurations, access violations, syscall denials) and owned the ICCC module bridging the TEE and Rich OS, on both the trusted app and its Android-side client.",
    ],
  },
  {
    org: "Brainwave Science",
    role: "Full Stack Developer Intern",
    location: "Remote",
    start: "Feb 2024",
    end: "Dec 2024",
    status: "past",
    stack: ["VueJS", "PostgreSQL", "Fastify", "PsychoPy", "React Native", "iOS"],
    bullets: [
      "Built a unified full-stack platform: a VueJS web frame for PsychoPy browser experiments, an RTSP-based IP-camera streaming system, and a cross-platform educational app (Android/iOS) serving 500+ users.",
    ],
  },
  {
    org: "LASR Lab, TU Dresden",
    role: "Application Development Intern",
    location: "Dresden, Germany",
    start: "Oct 2023",
    end: "Jan 2024",
    status: "past",
    stack: ["Kotlin", "Gradle", "Machine Learning", "Computer Vision"],
    bullets: [
      "Designed an Android application for the DIGIT tactile sensor (+40% efficiency) with real-time object detection using on-device ML, reducing false-detection rates by 30%.",
    ],
  },
];

/** Which environment renders behind a project. Each one is bespoke. */
export type StageKind =
  | "atlas" | "terminal" | "clusters" | "descent"
  | "motion" | "browser" | "chain" | "rewrite" | "scan";

export type ProjectLink = { label: string; href: string };

export type Project = {
  /** Anchor id, also the command-palette target. */
  slug: string;
  stage: StageKind;
  /** Real numbers from the work, shown beside it as evidence. */
  metrics?: { label: string; value: string }[];
  name: string;
  blurb: string;
  detail: string;
  tech: string[];
  href?: string;
  hrefLabel?: string;
  /** For a project made of more than one repo/artifact; renders alongside href/pdfHref. */
  links?: ProjectLink[];
  tag: string;
  image?: string;
  imageSize?: { w: number; h: number };
  imageLayout?: "full" | "inline";
  video?: string;
  /** Portrait clips sit beside the copy; a 16:9 demo spans the card instead. */
  videoLayout?: "portrait" | "full";
  pdfHref?: string;
  pdfLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "human-atlas",
    stage: "atlas",
    metrics: [{ label: "Selectable meshes", value: "2,234" }, { label: "Catalogue reduced", value: "47%" }, { label: "Invented ids rendered", value: "0" }],
    name: "Human Atlas Assistant",
    tag: "Open Source · 3D + LLM",
    blurb: "Ask a 3D human body a question and watch it answer.",
    detail:
      "A grounded question layer for an open-source anatomy explorer of 2,234 individually selectable meshes. Plain-language questions fly the camera to the structures involved, recede everything else, and tag them on the model. Every identifier the model returns is checked against the atlas before it renders: invented ids are dropped, near-misses are repaired to the id the name actually belongs to, and structures the atlas genuinely lacks are reported as missing rather than swapped for something close.",
    tech: ["TypeScript", "Three.js", "GLSL", "Gemma"],
    href: "https://github.com/ashemag/human-atlas/pull/3",
    hrefLabel: "Pull request",
    video: "/videos/human-atlas-demo.mp4",
    videoLayout: "full",
  },
  {
    slug: "clai",
    stage: "terminal",
    name: "CLAI",
    tag: "CLI AI Assistant",
    blurb: "A terminal agent that turns plain English into shell commands, and remembers.",
    detail:
      "Persistent long-term memory over past commands, folders and workflows (SQLite for the record, FAISS and FastEmbed for retrieval), so it carries context between sessions instead of starting cold every time. A confirmation gate stands in front of anything destructive, because an agent with shell access should have to ask.",
    tech: ["Python", "SQLite", "FAISS", "Gemini API"],
    href: "https://github.com/Satyampatil513/CLAI",
    image: "/images/clai-terminal.jpg",
    imageSize: { w: 1048, h: 572 },
    imageLayout: "inline",
  },
  {
    slug: "pair-trading",
    stage: "clusters",
    metrics: [{ label: "Years of BSE data", value: "10" }, { label: "Usable clusters", value: "13" }],
    name: "Pair Trading Research",
    tag: "Quant Research",
    blurb: "Clustering-based statistical arbitrage over 10 years of BSE data.",
    detail:
      "Compared DBSCAN, OPTICS, and agglomerative clustering on PCA'd fundamentals; OPTICS won with 13 usable clusters. Every pair inside a cluster is Engle-Granger tested and screened by Hurst exponent for mean-reversion.",
    tech: ["Python", "pandas", "scikit-learn", "statsmodels"],
    image: "/images/mtp2-clustering.jpg",
    imageSize: { w: 1400, h: 375 },
    imageLayout: "full",
  },
  {
    slug: "khoj",
    stage: "motion",
    name: "Khoj",
    tag: "Motion Design",
    blurb: "A code-first animation library for a poetic, minimal video series.",
    detail:
      "Built a Motion Canvas-based animation pipeline to replace After Effects for the Khoj visual-storytelling series. Scenes are written in TypeScript, tweened declaratively, and rendered straight to video.",
    tech: ["TypeScript", "Motion Canvas", "Vite", "FFmpeg"],
    video: "/videos/khoj-demo.mp4",
  },
  {
    slug: "rankit",
    stage: "browser",
    metrics: [{ label: "Status", value: "Live" }, { label: "Stack owned", value: "Full" }],
    name: "Rankit",
    tag: "Co-founder · Live Product",
    blurb: "A live JEE mock-test platform, used by real students.",
    detail:
      "Co-founded and own the full stack. A multi-agent analysis backend routes queries, decomposes tasks and picks tools: post-test SQL aggregates feed an LLM that pinpoints weak topics and writes personalised practice sets, sitting on a knowledge graph of topics as nodes and prerequisites as edges, so it traces the root-cause gap rather than matching topics that merely look similar. A vision-LLM pipeline classifies scanned questions into a deduplicated taxonomy and parses past papers, Word equations included.",
    tech: ["FastAPI", "PostgreSQL", "LangGraph", "FAISS"],
    href: "https://www.rankit.in",
    hrefLabel: "Live site",
    image: "/images/rankit-analytics.jpg",
    imageSize: { w: 1882, h: 443 },
    imageLayout: "full",
  },
  {
    slug: "cansat-gcs",
    stage: "descent",
    metrics: [{ label: "Apogee", value: "725 m" }, { label: "Global rank", value: "Top 21" }, { label: "Telemetry link", value: "2 km" }],
    name: "CanSat Ground Control",
    tag: "Aerospace",
    blurb: "Ground station commanding a can-sized satellite over a 2 km link.",
    detail:
      "Real-time command transmission over 2000 m range with 1-second response time, improving operational efficiency by 35%. A dedicated producer process generates telemetry while a Qt timer polls it once a second to refresh the dashboard.",
    tech: ["C#", "DSA", "Microcontroller"],
    href: "https://github.com/BlackDevil559/CANSAT__GCS__Application",
    pdfHref: "/cansat-cdr.pdf",
    pdfLabel: "View CDR PDF",
  },
  {
    slug: "room-scan",
    stage: "scan",
    metrics: [{ label: "Detector precision", value: "96%" }, { label: "Training images", value: "2,000+" }],
    name: "Room-Scan Inventory Pipeline",
    tag: "Small-Object 3D Detection",
    blurb: "Localizing objects as small as a book spine inside a room-scale 3D scan.",
    detail:
      "The hard part is scale: a LiDAR walkthrough captures a room in meters, but the objects worth cataloguing are a few centimeters wide, packed edge to edge, and low-texture enough that generic detectors miss or merge them. A SwiftUI/ARKit app records synchronized RGB, depth, pose, and audio during the walkthrough, auto-triggering stills by shelf coverage and blurring faces on-device before anything is written. A Python backend reconstructs room geometry from the depth point cloud into a dimensioned floor plan, then narrows from room-scale geometry down to individual objects with SAM2 and a fine-tuned YOLOv8-OBB spine detector, identifies and prices each one through multi-model LLM arbitration and ISBN/price lookups, and surfaces everything in a human-in-the-loop review UI.",
    tech: ["Swift", "ARKit", "Python", "PyTorch", "SAM2", "YOLOv8-OBB", "FastAPI", "LLM Orchestration"],
    links: [
      { label: "Capture App", href: "https://github.com/Satyampatil513/library_app" },
      { label: "Processing Pipeline", href: "https://github.com/Satyampatil513/library-processor" },
      { label: "Floor Plan Sample", href: "/images/roomscan-floorplan.png" },
    ],
  },
  {
    slug: "consistify",
    stage: "chain",
    name: "Consistify",
    tag: "Blockchain",
    blurb: "On-chain habit tracker built on Flow with daily target verification.",
    detail:
      "Habit-tracking app on the Flow blockchain: Cadence contracts record a daily value against a target, and a reward mints only once every recorded entry across the streak clears the bar. Paired with a Chrome extension for daily check-ins.",
    tech: ["Cadence", "Flow Blockchain", "Chrome Extension", "JavaScript"],
    href: "https://github.com/Satyampatil513/consistency",
  },
  {
    slug: "resume-editor",
    stage: "rewrite",
    metrics: [{ label: "Status", value: "Live" }],
    name: "AI Resume Editor",
    tag: "Live Product",
    blurb: "Instant, targeted resume fixes powered by AI review.",
    detail:
      "Upload a LaTeX resume and a background worker compiles it via a Redis job queue; on a failed compile, Gemini patches the offending lines and triggers one guarded auto-recompile. Built on Next.js, Supabase, and Cloudflare Workers.",
    tech: ["Next.js", "TypeScript", "Supabase", "Cloudflare Workers"],
    href: "https://resume-editor-eta.vercel.app",
    hrefLabel: "Live demo",
  },
];

export type Achievement = { title: string; org: string; rank: string };

export const achievements: Achievement[] = [
  {
    title: "CANSAT 2023",
    org: "NASA & AAS, can-shaped satellite competition",
    rank: "WORLD TOP 21",
  },
  {
    title: "SIF Space Hackathon",
    org: "ISRO & IISF, national finalist",
    rank: "INDIA TOP 12",
  },
  {
    title: "Blockchain Hackathon, Cognizance'24",
    org: "IIT Roorkee, Inter-College",
    rank: "1st PLACE",
  },
  {
    title: "Best Blockchain Project, Frosthack'23",
    org: "IIT Mandi",
    rank: "WINNER",
  },
  {
    title: "Astrophysics Hackathon (Merope)",
    org: "IIT Mandi, Intra-College, Dec 2021",
    rank: "1st PLACE",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "Dart", "Swift"],
  },
  {
    group: "AI / ML",
    items: [
      "LangGraph",
      "LLM APIs (OpenAI, Anthropic)",
      "RAG",
      "FAISS",
      "FastEmbed",
      "Pandas",
      "NumPy",
      "scikit-learn",
    ],
  },
  {
    group: "Technologies",
    items: [
      "FastAPI",
      "Flask",
      "ReactJS",
      "React Native",
      "NodeJS",
      "VueJS",
      "Flutter",
      "PostgreSQL",
      "Git",
    ],
  },
];

export const education = [
  {
    org: "Indian Institute of Technology, Mandi",
    detail: "B.Tech, Computer Science & Engineering · CGPA 8.25",
    location: "Himachal Pradesh, India",
    period: "Nov 2021 – Jun 2025",
  },
  {
    org: "TU Dresden",
    detail: "Semester Exchange, Computer Science · SGPA 9.0",
    location: "Dresden, Germany",
    period: "Oct 2023 – Feb 2024",
  },
];

export const positions = [
  "Co-coordinator, Space Technology & Astronomy Cell (STAC, IIT Mandi): managed a 24-member club and its annual operations.",
  "Media & Outreach Head, Xpecto'23: led the media team for IIT Mandi's annual technical fest.",
  "Core Team Member, Entrepreneurship Cell IIT Mandi: built a stock-exchange simulation site.",
];
