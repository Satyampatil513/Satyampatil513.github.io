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
    resume: "/resume.html",
  },
  about: [
    "I'm a Research Engineer at Samsung Research working at the intersection of AI automation and low-level Android security — building pipelines that debug systems faster than humans can, and hardening SELinux policy across production builds.",
    "Alongside that, I co-founded Rankit, an AI-powered JEE prep platform now live and in use. My path ran through IIT Mandi (B.Tech CSE) and a semester at TU Dresden, with detours into on-device ML, full-stack products, and satellites that actually flew. I like problems where the AI layer and the systems layer meet.",
  ],
};

export const fieldPhoto = {
  src: "/images/summit-2400.jpg",
  alt: "Satyam Patil standing on a snow-covered ridge in Himachal Pradesh, arms outstretched, with Himalayan peaks in the background",
};

export const cansatMission = {
  title: "CanSat 2023",
  subtitle: "Team 1072 STACSAT — NASA & AAS International Competition",
  image: "/images/cansat-payload-cad.jpg",
  imageCaption: "Payload physical layout, CDR 2023 — CAD by Team STACSAT",
  description:
    "A can-sized satellite launched to ~725 m, descending under a two-stage parachute system before releasing an autonomous payload that self-stabilizes, deploys a landing gear, and raises a flag on touchdown. I led electrical power subsystem design and built the Ground Control System that received live telemetry over a 2 km radio link.",
  specs: [
    { label: "Global Rank", value: "Top 21" },
    { label: "Descent Rate (final)", value: "5 m/s" },
    { label: "Telemetry Range", value: "2000 m" },
    { label: "GCS Response", value: "1 s" },
  ],
  href: "https://github.com/BlackDevil513/CANSAT__GCS__Application",
};

export type Telemetry = { label: string; value: string; unit?: string };

export const telemetry: Telemetry[] = [
  { label: "Debug Automated", value: "80", unit: "%" },
  { label: "Security Issues Resolved", value: "100", unit: "+" },
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
};

export const experience: Experience[] = [
  {
    org: "Samsung Research",
    role: "Research Engineer",
    location: "Noida, India",
    start: "Jun 2025",
    end: "Present",
    status: "active",
    stack: ["Android", "SELinux", "Security", "AI Automation"],
    bullets: [
      "Engineered AI-driven automation pipelines for anomaly signal generation, SEAndroid policy validation, and issue resolution — automating 80% of manual debugging tasks and accelerating issue detection across system builds.",
      "Resolved 100+ SEAndroid and security-module issues (policy misconfigurations, access violations, syscall denials), improving build stability, ICCC compliance, and debugging efficiency by 35%.",
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

export type Workflow = {
  steps: string[];
  loopFrom: number;
  loopTo: number;
  loopLabel: string;
};

export type Project = {
  name: string;
  blurb: string;
  detail: string;
  tech: string[];
  href?: string;
  hrefLabel?: string;
  tag: string;
  image?: string;
  workflow: Workflow;
};

export const projects: Project[] = [
  {
    name: "Rankit",
    tag: "Co-founder · Live Product",
    blurb: "AI-powered JEE prep platform — mock tests, DPPs, and live rank contests.",
    detail:
      "Co-founded and built the platform end-to-end: adaptive mock tests, an accuracy-tiered daily practice problem engine, weekly contests, and performance analytics across topic, time, and difficulty.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "React Native"],
    href: "https://ed-tech-lyart-pi.vercel.app",
    hrefLabel: "Live site",
    workflow: {
      steps: [
        "Check Existing DPP",
        "Subject Accuracy Lookup",
        "Accuracy → Tier",
        "Pick Topic (≥3 Qs)",
        "Pick Qs (fallback tiers)",
        "Score & Award XP",
      ],
      loopFrom: 5,
      loopTo: 0,
      loopLabel: "next session",
    },
  },
  {
    name: "CLAI",
    tag: "CLI AI Assistant",
    blurb: "A context-aware AI assistant for Windows with real long-term memory.",
    detail:
      "Short- and long-term memory via FAISS + FastEmbed gives persistent awareness of folders, past commands, and workflows; integrates Windows automation APIs for direct OS control, with a danger check gating any command before it runs.",
    tech: ["Python", "FAISS", "FastEmbed", "Windows Automation"],
    href: "https://github.com/Satyampatil513/CLAI",
    workflow: {
      steps: [
        "RAG Memory Search",
        "Gemini LLM Call",
        "Executable Check",
        "Danger Check",
        "Execute Command",
        "Update Memory",
      ],
      loopFrom: 4,
      loopTo: 1,
      loopLabel: "exec failed",
    },
  },
  {
    name: "CanSat Ground Control",
    tag: "Aerospace",
    blurb: "Ground station commanding a can-sized satellite over a 2 km link.",
    detail:
      "Real-time command transmission over 2000 m range with 1-second response time, improving operational efficiency by 35%. A dedicated producer process generates telemetry while a Qt timer polls it once a second to refresh the dashboard.",
    tech: ["C#", "DSA", "Microcontroller"],
    href: "https://github.com/BlackDevil559/CANSAT__GCS__Application",
    workflow: {
      steps: ["Generate Telemetry", "Push to Queue", "Timer Tick (1s)", "Pull from Queue", "Update Dashboard"],
      loopFrom: 4,
      loopTo: 0,
      loopLabel: "every 1s",
    },
  },
  {
    name: "Consistify",
    tag: "Blockchain",
    blurb: "On-chain habit tracker built on Flow with daily target verification.",
    detail:
      "Habit-tracking app on the Flow blockchain: Cadence contracts record a daily value against a target, and a reward mints only once every recorded entry across the streak clears the bar — paired with a Chrome extension for daily check-ins.",
    tech: ["Cadence", "Flow Blockchain", "Chrome Extension", "JavaScript"],
    href: "https://github.com/Satyampatil513/consistency",
    workflow: {
      steps: ["Wallet Login (FCL)", "Create On-chain Record", "Submit Daily Value", "Contract Checks Target", "Display Progress"],
      loopFrom: 3,
      loopTo: 2,
      loopLabel: "next day",
    },
  },
  {
    name: "AI Resume Editor",
    tag: "Live Product",
    blurb: "Instant, targeted resume fixes powered by AI review.",
    detail:
      "Upload a LaTeX resume and a background worker compiles it via a Redis job queue; on a failed compile, Gemini patches the offending lines and triggers one guarded auto-recompile — built on Next.js, Supabase, and Cloudflare Workers.",
    tech: ["Next.js", "TypeScript", "Supabase", "Cloudflare Workers"],
    href: "https://resume-editor-eta.vercel.app",
    hrefLabel: "Live demo",
    workflow: {
      steps: [
        "Upload LaTeX Zip",
        "Queue Compile Job",
        "Poll Job Result",
        "Worker Compiles (pdflatex)",
        "AI Auto-Fix (Gemini)",
        "Recompile (guarded)",
      ],
      loopFrom: 5,
      loopTo: 2,
      loopLabel: "auto-fix retry",
    },
  },
  {
    name: "Pair Trading Research",
    tag: "Quant Research",
    blurb: "Clustering-based statistical arbitrage over 10 years of NSE data.",
    detail:
      "Compared DBSCAN, OPTICS, and agglomerative clustering on PCA'd fundamentals — OPTICS won with 13 usable clusters. Every pair inside a cluster is Engle-Granger tested and screened by Hurst exponent for mean-reversion.",
    tech: ["Python", "pandas", "scikit-learn", "statsmodels"],
    image: "/images/mtp2-clustering.jpg",
    workflow: {
      steps: [
        "Filter Flat Stocks",
        "PCA on Fundamentals",
        "Cluster (OPTICS)",
        "Engle-Granger Cointegration",
        "Hedge Ratio + Hurst",
        "p<0.5 & Hurst<0.5 Filter",
      ],
      loopFrom: 5,
      loopTo: 3,
      loopLabel: "reject pair",
    },
  },
  {
    name: "Human Activity Detector",
    tag: "Machine Learning",
    blurb: "Two-tier classifier predicting human activity at 91% accuracy.",
    detail:
      "A tier-1 KNN sorts each reading into a coarse category (fall / active / ascend-descend), then hands off to one of three tier-2 Random Forest models for the specific activity label — 13 activities total, hyperparameter-tuned to 91% accuracy.",
    tech: ["Python", "Flask", "scikit-learn"],
    href: "https://github.com/Satyampatil513/Human_Activity_Detector",
    workflow: {
      steps: ["Sensor Params (8 floats)", "Feature Vector Reshape", "Tier-1 KNN Classify", "Branch to Tier-2 RF", "Render Prediction"],
      loopFrom: 4,
      loopTo: 0,
      loopLabel: "next sample",
    },
  },
];

export type Achievement = { title: string; org: string; rank: string };

export const achievements: Achievement[] = [
  {
    title: "CANSAT 2023",
    org: "NASA & AAS — can-shaped satellite competition",
    rank: "WORLD TOP 21",
  },
  {
    title: "SIF Space Hackathon",
    org: "ISRO & IISF — national finalist",
    rank: "INDIA TOP 12",
  },
  {
    title: "Blockchain Hackathon, Cognizance'24",
    org: "IIT Roorkee — Inter-College",
    rank: "1st PLACE",
  },
  {
    title: "Best Blockchain Project, Frosthack'23",
    org: "IIT Mandi",
    rank: "WINNER",
  },
  {
    title: "Astrophysics Hackathon (Merope)",
    org: "IIT Mandi — Intra-College, Dec 2021",
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
      "OpenAI API",
      "Anthropic API",
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
  "Co-coordinator, Space Technology & Astronomy Cell (STAC, IIT Mandi) — managed a 24-member club and its annual operations.",
  "Media & Outreach Head, Xpecto'23 — led the media team for IIT Mandi's annual technical fest.",
  "Core Team Member, Entrepreneurship Cell IIT Mandi — built a stock-exchange simulation site.",
];
