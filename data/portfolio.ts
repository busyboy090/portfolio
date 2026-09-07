import {
  Layout,
  Server,
  Wrench,
  Code2,
  Database,
  Rocket,
} from "lucide-react";
import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const TECH_CATEGORIES = [
  {
    category: "Frontend Development",
    icon: Layout,
    description: "Component architecture, design systems, and responsive pixel-perfect interfaces.",
    skills: ["Figma", "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "CSS3 / HTML5"],
  },
  {
    category: "Backend & APIs",
    icon: Server,
    description: "Robust REST & GraphQL APIs, microservices, and database design.",
    skills: ["Node.js", "NestJS", "Express", "Laravel", "PHP", "PostgreSQL", "MySQL", "Redis", "TypeScript", "JavaScript"],
  },
  {
    category: "DevOps & Cloud",
    icon: Wrench,
    description: "Automated CI/CD pipelines, containerization, and cloud infrastructure.",
    skills: ["Git", "GitHub", "Docker", "Vercel", "AWS", "Render", "Netlify", "Linux"],
  },
];

export const ABOUT_CARDS = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Crafting fluid, accessible, and high-performance client applications using Next.js, React, TypeScript, and modern CSS.",
  },
  {
    icon: Database,
    title: "Backend & Architecture",
    description: "Architecting scalable RESTful APIs and microservices with Node.js and NestJS, backed by optimized PostgreSQL and Redis instances.",
  },
  {
    icon: Rocket,
    title: "DevOps & Cloud Delivery",
    description: "Deploying and managing reliable cloud environments using Docker, CI/CD automation, and cloud platforms for maximum uptime.",
  },
];

export const SKILL_MODULES = [
  {
    title: "Next.js & React 19",
    metric: "100/100 Web Vitals",
    category: "Frontend Infrastructure",
    description: "Server Actions, Streaming SSR, Parallel Routes, and granular React Server Component architecture.",
    tags: ["App Router", "RSC", "Turbopack", "Hydration Fixes"],
  },
  {
    title: "TypeScript & Tooling",
    metric: "Strict Type Safety",
    category: "Type Architecture",
    description: "Reusable generic utilities, Zod schema validation, and end-to-end typed API contracts.",
    tags: ["Zod", "Generics", "Type Narrowing", "Branded Types"],
  },
  {
    title: "NestJS & Node Services",
    metric: "High-Throughput APIs",
    category: "Backend Runtimes",
    description: "Modular microservices, queue processing with Redis, event drivers, and clean RESTful design.",
    tags: ["Microservices", "Event-Driven", "REST APIs", "Redis Queues"],
  },
  {
    title: "PostgreSQL & Database Design",
    metric: "Optimized Queries",
    category: "Data Systems",
    description: "Schema modeling, indexing strategies, migrations, and ORMs like Prisma and Kysely.",
    tags: ["Partitioning", "Connection Pool", "RLS", "ACID Compliant"],
  },
];

export const PROJECTS = [
  {
    id: "01",
    title: "Fintech Analytics Dashboard",
    category: "Real-Time Systems",
    description: "A real-time market data platform processing sub-millisecond WebSocket ticks with custom Canvas chart layers and multi-tenant ledger isolation.",
    tags: ["Figma", "Next.js", "PostgreSQL", "WebSocket", "Redis"],
    stats: "120k Events/sec",
    type: "wave",
  },
  {
    id: "02",
    title: "Boutique Commerce Engine",
    category: "Full Stack Storefront",
    description: "Global edge-distributed storefront orchestrating instant edge caches, Stripe webhooks, and distributed inventory reconciliation.",
    tags: ["Figma", "React 19", "NestJS", "Edge Cache", "Docker"],
    stats: "45ms TTFB Global",
    type: "grid",
  },
  {
    id: "03",
    title: "Microservices Mesh & Gateway",
    category: "Infrastructure",
    description: "High-throughput API gateway utilizing gRPC channels, distributed token bucket rate-limiting, and OpenTelemetry instrumentation.",
    tags: ["Node.js", "Redis", "gRPC", "Docker"],
    stats: "99.99% SLA",
    type: "nodes",
  },
];

export const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "TechNova Solutions",
    period: "2022 — PRESENT",
    description: "Building and maintaining production-grade web applications. Modernizing core APIs using NestJS and Node.js, prototyping interfaces in Figma, and delivering responsive Next.js client dashboards with reduced query latency.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Figma", "Docker", "AWS"],
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Frontier",
    period: "2020 — 2022",
    description: "Engineered full-stack features from conception to release. Designed relational schemas, created clean REST APIs in Express/Node.js, and converted UI specs into responsive interfaces with React and Tailwind CSS.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Figma", "CI/CD"],
  },
];

export const EDUCATION = [
  {
    degree: "B.Sc. in Software Engineering",
    institution: "Admiralty University of Nigeria",
    period: "2022 — 2026",
    details: "Specialized in software design architectures, distributed systems, algorithms, and database management.",
  },
];

export const CERTIFICATIONS = [
  {
    name: "Frontend Development Certification",
    issuer: "Schoolville",
    year: "2024",
    credentialId: "SCH-FED-2024",
    description: "Hands-on engineering focusing on modern JavaScript/TypeScript, responsive component architecture, and UI/UX implementation.",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2023",
    credentialId: "AWS-PSA-84920",
    description: "Cloud infrastructure design, multi-tier architectures, and high availability systems.",
  },
];