export const profile = {
  name: "Gokula Krishnan N",
  shortName: "Gokula Krishnan",
  initials: "GK",
  role: "Full Stack Developer",
  years: "5+",
  summary:
    "Full Stack Developer with 5+ years of experience building scalable, high-performance web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js), NestJS, and Next.js. Experienced in secure RESTful APIs, authentication and authorization (Keycloak, Auth0, Clerk), and cloud-native deployments on AWS. Skilled in integrating third-party services including Stripe, Razorpay, Meta Graph APIs, Google Ads API, and generative AI (Gemini, MCP tool calling). Strong focus on performance optimization, clean architecture, and reliable backend systems.",
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  lede: string;
  description: string;
  role: string;
  duration: string;
  source: string;
  stack: string[];
  responsibilities: string[];
};

export const projects: Project[] = [
  {
    slug: "unidigify",
    index: "01",
    name: "Unidigify",
    category: "AI Marketing & Brand Content",
    lede: "Multi-tenant SaaS for on-brand social content.",
    description:
      "Multi-tenant SaaS where agencies manage client brands, generate on-brand social posts and images with an AI chat assistant, and publish to Instagram, Facebook, and Google Ads from one dashboard.",
    role: "Full Stack Developer",
    duration: "1.5 years",
    source: "GitHub",
    stack: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "Redux",
      "Tailwind CSS",
      "Auth0",
      "Gemini AI",
      "Mem0",
    ],
    responsibilities: [
      "Built a multi-tenant architecture with Auth0 organization-based login and per-workspace data separation.",
      "Built an AI chat assistant (Gemini 2.5 Pro) that writes posts in each brand's voice, using brand profiles and long-term brand memory in Mem0.",
      "Added automatic AI image generation for every post, resized to 1080×1080 with sharp and served as public media for publishing.",
      "Implemented MCP tool calling so the assistant can save drafts, approve them, and publish posts from the chat.",
      "Integrated the Instagram Graph, Facebook Pages, and Google Ads APIs with OAuth 2.0 account connection and publishing, using paused Google Search campaigns so no spend happens without approval.",
      "Designed a draft → approve → publish workflow with a content dashboard, status tracking, and image previews.",
      "Started a performance analytics module to fetch likes, comments, reach, and saves for reporting and AI learning (in progress).",
      "Built a responsive Next.js dashboard with reusable table and stat components, Redux state management, and a consistent design system.",
    ],
  },
  {
    slug: "scam-detect",
    index: "02",
    name: "Scam Detect",
    category: "Compliance & Fraud Reporting",
    lede: "Faster case handling for scam reports.",
    description:
      "Scam Detect is a compliance and fraud reporting platform designed to process and analyze scam reports efficiently. The system improves fraud detection accuracy and reduces manual analysis through automation and analytics.",
    role: "Full Stack Developer",
    duration: "1.5 years",
    source: "GitHub",
    stack: ["NestJS", "MongoDB", "Redis", "React.js", "Keycloak"],
    responsibilities: [
      "Designed and developed microservices using NestJS and MongoDB.",
      "Improved fraud detection processing speed by 35% through optimized backend workflows.",
      "Built analytics dashboards in React, reducing manual analysis time by 40%.",
      "Implemented secure authentication and authorization using Keycloak.",
      "Designed round-robin and location-based workflows for efficient case handling.",
    ],
  },
  {
    slug: "hrdc",
    index: "03",
    name: "HRDC",
    category: "Human Resource Development",
    lede: "Reporting and analytics for national HRD programs.",
    description:
      "The HRDC platform is a large-scale digital solution developed to support national Human Resource Development initiatives. The system provides reporting, analytics, and collaboration tools to align with National Human Resource Development Strategy (NHRDS) objectives.",
    role: "Full Stack Developer",
    duration: "1 year",
    source: "GitHub",
    stack: ["React.js", "Redux", "Node.js", "NestJS", "MongoDB", "REST APIs", "AWS"],
    responsibilities: [
      "Developed reporting modules and analytics features to support HRD initiatives.",
      "Built interactive dashboards using React and Redux for real-time data visualization.",
      "Integrated backend REST APIs to deliver accurate, real-time analytics.",
      "Collaborated with cross-functional teams to align technical solutions with policy-driven requirements.",
    ],
  },
  {
    slug: "work-sphere",
    index: "04",
    name: "Work Sphere",
    category: "Unified Productivity",
    lede: "Jira-style work, billing, and access in one SaaS.",
    description:
      "Work Sphere is a SaaS-based productivity platform offering task management, workflows, and enterprise integrations similar to Jira, designed for scalable team collaboration.",
    role: "Full Stack Developer",
    duration: "1 year",
    source: "GitHub",
    stack: ["NestJS", "MongoDB", "Supabase", "React.js", "Stripe", "Keycloak"],
    responsibilities: [
      "Developed scalable microservices using NestJS and Supabase.",
      "Built Jira-like task management and workflow systems.",
      "Integrated Google and Microsoft APIs for enterprise productivity features.",
      "Implemented Keycloak-based RBAC for secure, role-based access.",
      "Integrated Stripe subscription billing, webhooks, and automated invoice processing.",
    ],
  },
  {
    slug: "sparewares",
    index: "05",
    name: "SpareWares",
    category: "E-commerce",
    lede: "Spare parts, live orders, and vendor inventory.",
    description:
      "SpareWares is an e-commerce platform for buying and selling spare parts with real-time order tracking, secure payments, and vendor management.",
    role: "Full Stack Developer",
    duration: "8 months",
    source: "GitHub",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "React.js",
      "Tailwind CSS",
      "AWS",
      "Socket.io",
    ],
    responsibilities: [
      "Implemented advanced product search and filtering functionality.",
      "Built real-time order tracking using Socket.io.",
      "Integrated AWS S3 for media storage and CloudWatch for monitoring.",
      "Developed secure backend APIs to support order and inventory workflows.",
    ],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Programming languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Redux", "Redux-saga", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "FastAPI", "TypeORM"],
  },
  {
    label: "Real-time",
    items: ["Socket.io"],
  },
  {
    label: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Supabase"],
  },
  {
    label: "AI and integrations",
    items: [
      "Gemini AI",
      "Mem0",
      "Model Context Protocol (MCP)",
      "Instagram Graph API",
      "Facebook Pages API",
      "Google Ads API",
      "Auth0",
    ],
  },
  {
    label: "API development",
    items: [
      "RESTful APIs",
      "OAuth 2.0",
      "Keycloak",
      "Auth0",
      "Clerk",
      "Stripe",
      "Razorpay",
      "Facebook Graph API",
      "Google Graph API",
      "VirusTotal API",
    ],
  },
  {
    label: "Cloud and DevOps",
    items: ["AWS (EC2, S3)", "Docker"],
  },
  {
    label: "Testing",
    items: ["Playwright"],
  },
  {
    label: "Version control",
    items: ["Git", "GitHub", "GitLab", "Bitbucket"],
  },
  {
    label: "Collaboration",
    items: ["Jira", "Slack", "Microsoft Teams"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];
