export const profile = {
  name: "Gokula Krishnan N",
  shortName: "Gokula Krishnan",
  initials: "GK",
  email: "krish.naren63@gmail.com",
  linkedin: "https://www.linkedin.com/in/gokul-krishnan-a14484261/",
  role: "Full Stack Developer",
  years: "3+",
  summary:
    "Full Stack Developer with 3+ years of experience building scalable, high-performance web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js), NestJS, and Next.js. Experienced in secure RESTful APIs, authentication and authorization (Keycloak, Auth0, Clerk), and cloud-native deployments on AWS. Skilled in integrating third-party services including Stripe, Razorpay, Meta Graph APIs, Google Ads API, and generative AI (Gemini, MCP tool calling). Strong focus on performance optimization, clean architecture, and reliable backend systems.",
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
  { href: "/#about", id: "about", label: "About" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#stack", id: "stack", label: "Stack" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export const heroRoles = [
  "MERN & NestJS engineer",
  "Next.js product builder",
  "SaaS & API developer",
  "AI integration specialist",
];

export const heroText =
  "I build SaaS platforms, secure APIs, and product dashboards. NestJS and Node.js on the backend; React and Next.js on the front; Gemini, Mem0, and MCP when the assistant has to save, approve, and publish. Three years of shipping full-stack systems.";

export const facts = [
  { label: "Experience", value: "3+ years" },
  { label: "Focus", value: "MERN, NestJS, Next.js" },
  { label: "Access", value: "Keycloak, Auth0, Clerk" },
  { label: "Cloud", value: "AWS · EC2, S3" },
  { label: "Payments", value: "Stripe, Razorpay" },
  { label: "AI", value: "Gemini, Mem0, MCP" },
];

export const industries = [
  { title: "Marketing & brands", detail: "On-brand posts, images, publishing" },
  { title: "Compliance & fraud", detail: "Case handling and analytics" },
  { title: "Human resources", detail: "National HRD reporting" },
  { title: "Productivity SaaS", detail: "Tasks, billing, and access" },
  { title: "E-commerce", detail: "Parts, orders, vendor inventory" },
];

export const principles = [
  {
    title: "Product systems",
    copy: "Multi-tenant SaaS, dashboards, and workflows — from the first draft to publish, or from a report to a closed case.",
  },
  {
    title: "Auth, billing, cloud",
    copy: "Keycloak, Auth0, and Clerk for access. Stripe and Razorpay for payments. AWS for storage, compute, and monitoring.",
  },
  {
    title: "AI in the product",
    copy: "Gemini for on-brand writing, Mem0 for long-term brand memory, and MCP tool calling so the assistant can act.",
  },
  {
    title: "Clean architecture",
    copy: "Secure APIs, clear data boundaries, and code the next developer can pick up.",
  },
];

export const services = [
  {
    title: "SaaS & multi-tenant platforms",
    copy: "Workspaces, roles, and the workflows a product runs on — brand content, tasks, or billing in one system.",
    tags: ["Multi-tenant", "Auth0", "Dashboards"],
  },
  {
    title: "Node.js & NestJS APIs",
    copy: "REST APIs, service boundaries, and the backend workflows that keep a product reliable under real use.",
    tags: ["NestJS", "Node.js", "REST"],
  },
  {
    title: "React & Next.js interfaces",
    copy: "Dashboards and product UI wired to those APIs, with Redux where the client state needs a single source.",
    tags: ["React", "Next.js", "Redux"],
  },
  {
    title: "AI inside the workflow",
    copy: "Assistants that write in a brand’s voice, remember that brand, and call tools to save, approve, and publish.",
    tags: ["Gemini", "Mem0", "MCP"],
  },
  {
    title: "Auth, billing & integrations",
    copy: "Organization login, subscriptions, and OAuth connections to Instagram, Facebook Pages, and Google Ads.",
    tags: ["Keycloak", "Stripe", "OAuth"],
  },
  {
    title: "Commerce & real-time",
    copy: "Search, vendor inventory, live order tracking, and media stored and watched on AWS.",
    tags: ["Socket.io", "MongoDB", "AWS"],
  },
];

export const results = [
  {
    value: "35%",
    copy: "faster fraud-detection processing on Scam Detect, from tighter backend workflows.",
    tag: "Compliance",
  },
  {
    value: "40%",
    copy: "less time spent on manual analysis, with React dashboards on the same platform.",
    tag: "Analytics",
  },
  {
    value: "5",
    copy: "products across SaaS, compliance, national HRD, productivity, and commerce.",
    tag: "Shipped work",
  },
  {
    value: "1.5 yrs",
    copy: "on Unidigify, from multi-tenant login through AI drafts to publishing.",
    tag: "AI marketing",
  },
];

export const steps = [
  {
    title: "Scope the product",
    copy: "What the user does, what the system must remember, and which path ships first.",
  },
  {
    title: "Shape the system",
    copy: "Data model, API contracts, auth, and where AI, payments, or realtime belong.",
  },
  {
    title: "Build in slices",
    copy: "A working path at each step: draft then publish, or report, assign, and close.",
  },
  {
    title: "Ship and hand over",
    copy: "Deploy, watch the edges, and leave code the next person can read.",
  },
];

export const projectTypes = [
  "New web app or SaaS",
  "NestJS / Node.js API",
  "React / Next.js product",
  "AI assistant in a product",
  "Auth, billing, or third-party APIs",
  "Bug fixing and maintenance",
  "Something else",
];

export const marqueeA = [
  "NestJS",
  "Node.js",
  "Express",
  "React",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "TypeORM",
];

export const marqueeB = [
  "Auth0",
  "Keycloak",
  "Clerk",
  "Stripe",
  "Razorpay",
  "Gemini",
  "MCP",
  "AWS",
  "Docker",
  "Socket.io",
  "Tailwind CSS",
  "Playwright",
];

export const workFilters = ["All", "SaaS", "AI", "APIs", "E-commerce"] as const;

export function projectMatches(project: Project, filter: (typeof workFilters)[number]) {
  if (filter === "All") return true;
  if (filter === "SaaS") return project.slug === "unidigify" || project.slug === "work-sphere";
  if (filter === "AI") return project.slug === "unidigify";
  if (filter === "E-commerce") return project.slug === "sparewares";
  return project.stack.includes("NestJS");
}
