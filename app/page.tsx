"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import {
  ExternalLink,
  Copy,
  Check,
  Mail,
  GraduationCap,
  Award,
  ArrowRight,
  FileText,
  ShieldCheck,
  Code2,
  Database,
  Rocket,
  Layout,
  Server,
  Wrench,
  CheckCircle2,
} from "lucide-react";

// ==========================================
// MOTION ANIMATION VARIANTS
// ==========================================

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function Github({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ==========================================
// DATA DEFINITIONS
// ==========================================

const TECH_CATEGORIES = [
  {
    category: "Frontend & UI Design",
    icon: Layout,
    description: "Component architecture, design systems, and responsive pixel-perfect interfaces.",
    skills: [
      "Figma",
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
      "CSS3 / HTML5",
    ],
  },
  {
    category: "Backend & APIs",
    icon: Server,
    description: "Robust REST & GraphQL APIs, microservices, and database design.",
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: Wrench,
    description: "Automated CI/CD pipelines, containerization, and cloud infrastructure.",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
      "AWS",
      "Render",
      "Netlify",
      "Linux",
    ],
  },
];

const ABOUT_CARDS = [
  {
    icon: Code2,
    title: "UI Design to Code",
    description: "Translating wireframes and interactive Figma prototypes directly into fluid, pixel-perfect Next.js and React components.",
  },
  {
    icon: Database,
    title: "Backend & System Design",
    description: "Developing robust APIs in Node.js/NestJS, optimizing relational query speeds in PostgreSQL, and configuring fast Redis caches.",
  },
  {
    icon: Rocket,
    title: "Production Lifecycle",
    description: "Taking full ownership of products—from database schema definitions to continuous deployment, automated tests, and cloud monitoring.",
  },
];

const SKILL_MODULES = [
  {
    title: "Next.js & React 19",
    metric: "100/100 Web Vitals",
    category: "Frontend Infrastructure",
    description:
      "Server Actions, Streaming SSR, Parallel Routes, and granular React Server Component architecture.",
    tags: ["App Router", "RSC", "Turbopack", "Hydration Fixes"],
  },
  {
    title: "Figma & UI Systems",
    metric: "Pixel-Perfect Sync",
    category: "Product & UI/UX Design",
    description:
      "Creating accessible design tokens, component libraries, and interactive wireframes that convert smoothly into code.",
    tags: ["Auto-Layout", "Design Tokens", "Wireframing", "Prototypes"],
  },
  {
    title: "NestJS & Node Services",
    metric: "High-Throughput APIs",
    category: "Backend Runtimes",
    description:
      "Modular microservices, queue processing with Redis, event drivers, and clean RESTful design.",
    tags: ["Microservices", "Event-Driven", "REST APIs", "Redis Queues"],
  },
  {
    title: "PostgreSQL & Database Design",
    metric: "Optimized Queries",
    category: "Data Systems",
    description:
      "Schema modeling, indexing strategies, migrations, and ORMs like Prisma and Kysely.",
    tags: ["Partitioning", "Connection Pool", "RLS", "ACID Compliant"],
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "Fintech Analytics Dashboard",
    category: "Real-Time Systems",
    description:
      "A real-time market data platform processing sub-millisecond WebSocket ticks with custom Canvas chart layers and multi-tenant ledger isolation.",
    tags: ["Figma", "Next.js", "PostgreSQL", "WebSocket", "Redis"],
    stats: "120k Events/sec",
    type: "wave",
  },
  {
    id: "02",
    title: "Boutique Commerce Engine",
    category: "Full Stack Storefront",
    description:
      "Global edge-distributed storefront orchestrating instant edge caches, Stripe webhooks, and distributed inventory reconciliation.",
    tags: ["Figma", "React 19", "NestJS", "Edge Cache", "Docker"],
    stats: "45ms TTFB Global",
    type: "grid",
  },
  {
    id: "03",
    title: "Microservices Mesh & Gateway",
    category: "Infrastructure",
    description:
      "High-throughput API gateway utilizing gRPC channels, distributed token bucket rate-limiting, and OpenTelemetry instrumentation.",
    tags: ["Node.js", "Redis", "gRPC", "Docker"],
    stats: "99.99% SLA",
    type: "nodes",
  },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "TechNova Solutions",
    period: "2022 — PRESENT",
    description:
      "Building and maintaining production-grade web applications. Modernizing core APIs using NestJS and Node.js, prototyping interfaces in Figma, and delivering responsive Next.js client dashboards.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Figma", "Docker", "AWS"],
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Frontier",
    period: "2020 — 2022",
    description:
      "Engineered full-stack features from conception to release. Designed relational schemas, created clean REST APIs in Express/Node.js, and converted Figma UI specs into responsive interfaces with React and Tailwind CSS.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Figma", "CI/CD"],
  },
];

const EDUCATION = [
  {
    degree: "B.Sc. in Software Engineering",
    institution: "Admiralty University of Nigeria",
    period: "2022 — 2026",
    details: "Specialized in software design architectures, distributed systems, algorithms, and database management.",
  },
];

const CERTIFICATIONS = [
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

// ==========================================
// CODE-DRAWN SCHEMATICS
// ==========================================

function ProjectSchematic({ type }: { type: string }) {
  if (type === "wave") {
    return (
      <svg className="w-full h-full text-zinc-600/40 group-hover:text-zinc-400/60 transition-colors duration-500" viewBox="0 0 300 160" fill="none">
        <path d="M0 80 Q 40 20, 80 80 T 160 80 T 240 80 T 320 80" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0 95 Q 45 40, 90 95 T 180 95 T 270 95 T 360 95" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.6" />
        <path d="M0 65 Q 35 10, 70 65 T 140 65 T 210 65 T 280 65" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
      </svg>
    );
  }

  if (type === "grid") {
    return (
      <svg className="w-full h-full text-zinc-600/40 group-hover:text-zinc-400/60 transition-colors duration-500" viewBox="0 0 300 160" fill="none">
        <rect x="25" y="25" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="120" y="25" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="215" y="25" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="70" y="95" width="70" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="165" y="95" width="70" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <line x1="55" y1="70" x2="105" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="150" y1="70" x2="105" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="245" y1="70" x2="200" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    );
  }

  return (
    <svg className="w-full h-full text-zinc-600/40 group-hover:text-zinc-400/60 transition-colors duration-500" viewBox="0 0 300 160" fill="none">
      <circle cx="150" cy="80" r="28" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="250" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="120" r="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="250" cy="120" r="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="66" y1="48" x2="124" y2="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="234" y1="48" x2="176" y2="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="66" y1="112" x2="124" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="234" y1="112" x2="176" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

// ==========================================
// DUAL TERMINAL WORKSPACE
// ==========================================

const TERMINAL_SPECS = [
  { label: "OS", val: "DevOS v4.2.0-lts" },
  { label: "Role", val: "Full Stack Developer (4+ Years)" },
  { label: "Education", val: "B.Sc Software Eng (Admiralty Uni '26)" },
  { label: "Design", val: "Figma (UI/UX, Wireframes, Tokens)" },
  { label: "Frontend", val: "Next.js, React, TypeScript, Tailwind" },
  { label: "Backend", val: "Node.js, NestJS, Express, PHP" },
  { label: "Databases", val: "PostgreSQL, MySQL, Redis" },
  { label: "Cloud & Ops", val: "Docker, AWS, Linux, CI/CD" },
];

const CODE_LINES = [
  { parts: [{ text: "import", cls: "text-purple-400" }, { text: " React ", cls: "text-zinc-200" }, { text: "from", cls: "text-purple-400" }, { text: " 'react';", cls: "text-emerald-300" }] },
  { parts: [] },
  { parts: [{ text: "const", cls: "text-purple-400" }, { text: " DevWorkspace", cls: "text-blue-400" }, { text: " = () => {", cls: "text-zinc-300" }] },
  { parts: [{ text: "  const", cls: "text-purple-400" }, { text: " [isLoading, setIsLoading] = React.", cls: "text-zinc-200" }, { text: "useState", cls: "text-blue-300" }, { text: "(", cls: "text-zinc-300" }, { text: "true", cls: "text-amber-400" }, { text: ");", cls: "text-zinc-300" }] },
  { parts: [] },
  { parts: [{ text: "  React.", cls: "text-zinc-300" }, { text: "useEffect", cls: "text-blue-300" }, { text: "(() => {", cls: "text-zinc-300" }] },
  { parts: [{ text: "    const", cls: "text-purple-400" }, { text: " timer = setTimeout(() => {", cls: "text-zinc-300" }] },
  { parts: [{ text: "      setIsLoading(", cls: "text-zinc-300" }, { text: "false", cls: "text-amber-400" }, { text: ");", cls: "text-zinc-300" }] },
  { parts: [{ text: "    }, ", cls: "text-zinc-300" }, { text: "2000", cls: "text-amber-400" }, { text: ");", cls: "text-zinc-300" }] },
  { parts: [{ text: "    return", cls: "text-purple-400" }, { text: " () => clearTimeout(timer);", cls: "text-zinc-300" }] },
  { parts: [{ text: "  }, []);", cls: "text-zinc-300" }] },
  { parts: [] },
  { parts: [{ text: "  return", cls: "text-purple-400" }, { text: " (", cls: "text-zinc-300" }] },
  { parts: [{ text: '    <div className="workspace">', cls: "text-zinc-300" }] },
  { parts: [{ text: "      {isLoading ? <LoadingScreen /> : <App />}", cls: "text-zinc-300" }] },
  { parts: [{ text: "    </div>", cls: "text-zinc-300" }] },
  { parts: [{ text: "  );", cls: "text-zinc-300" }] },
  { parts: [{ text: "};", cls: "text-zinc-300" }] },
];

function DevWorkspaceSnapshot() {
  const [specCount, setSpecCount] = useState(0);
  const [codeLineIdx, setCodeLineIdx] = useState(0);

  useEffect(() => {
    if (specCount < TERMINAL_SPECS.length) {
      const timeout = setTimeout(() => {
        setSpecCount((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setSpecCount(0);
      }, 9000);
      return () => clearTimeout(reset);
    }
  }, [specCount]);

  useEffect(() => {
    if (codeLineIdx < CODE_LINES.length) {
      const timeout = setTimeout(() => {
        setCodeLineIdx((prev) => prev + 1);
      }, 130);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setCodeLineIdx(0);
      }, 9000);
      return () => clearTimeout(reset);
    }
  }, [codeLineIdx]);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 mb-6 font-mono select-none">
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-blue-600/30 rounded-3xl blur-3xl -z-10 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-xl border border-zinc-800/90 bg-[#07070a]/90 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d12]/90 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          </div>
          <span className="text-xs text-zinc-400 font-medium tracking-wide">
            busayo@dev-workspace
          </span>
          <div className="w-12" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start text-left min-h-[320px] pb-28 sm:pb-32">
          <pre className="text-zinc-400 text-xs sm:text-sm font-mono leading-tight tracking-wider select-none">
{`   /  \\
| ( ) |
 \\ ^ /
 |||||
 |||||`}
          </pre>

          <div className="text-xs sm:text-sm space-y-2 leading-relaxed flex-1">
            <div className="text-amber-200 font-bold text-sm sm:text-base">
              busayo@dev-workspace
            </div>
            <div className="text-zinc-600 text-xs tracking-widest pb-1 mb-2">
              ------------------------
            </div>

            {TERMINAL_SPECS.slice(0, specCount).map((item) => (
              <div key={item.label} className="flex gap-2">
                <span className="text-purple-400 font-semibold w-24 sm:w-28 flex-shrink-0">
                  {item.label}:
                </span>
                <span className="text-zinc-300 font-normal">{item.val}</span>
              </div>
            ))}

            {specCount < TERMINAL_SPECS.length && (
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="inline-block w-2 h-3.5 bg-purple-400 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.7, delay: 0.4 },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.02 }}
        className="absolute right-0 sm:right-4 -bottom-8 sm:-bottom-12 w-[95%] sm:w-[500px] rounded-xl border border-zinc-700/80 bg-[#0d0d14]/95 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.98)] overflow-hidden z-20"
      >
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#12121c] border-b border-zinc-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          </div>
          <span className="text-[11px] text-zinc-400">DevWorkspace.tsx</span>
          <div className="w-8" />
        </div>

        <div className="p-3.5 sm:p-4 text-[11px] sm:text-[11.5px] leading-tight font-mono text-zinc-300 overflow-hidden">
          {CODE_LINES.slice(0, codeLineIdx).map((line, idx) => (
            <div key={idx} className="min-h-[16px] whitespace-pre flex">
              {line.parts.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                line.parts.map((p, i) => (
                  <span key={i} className={p.cls}>
                    {p.text}
                  </span>
                ))
              )}
            </div>
          ))}
          {codeLineIdx < CODE_LINES.length && (
            <span className="inline-block w-1.5 h-3 bg-zinc-300 ml-1 translate-y-0.5 animate-pulse" />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// UNIFIED NAVBAR & HERO SECTION COMPONENT
// ==========================================

function UnifiedHeroNav() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 20 });

  const tiltRotateX = useTransform(smoothY, [-500, 500], [2, -2]);
  const tiltRotateY = useTransform(smoothX, [-600, 600], [-3, 3]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const cols = 38;
    const rows = 28;
    let time = 0;
    let isHovering = false;
    const targetMouse = { x: width / 2, y: height / 2 };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
      isHovering = true;
      mouseX.set(e.clientX - rect.left - width / 2);
      mouseY.set(e.clientY - rect.top - height / 2);
    };

    const onPointerLeave = () => {
      isHovering = false;
      mouseX.set(0);
      mouseY.set(0);
    };

    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseleave", onPointerLeave);

    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      const cellX = width / cols;
      const cellY = height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellX + cellX / 2;
          const y = j * cellY + cellY / 2;

          const dx = targetMouse.x - x;
          const dy = targetMouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 260;

          let angle = Math.sin(x * 0.005 + time * 1.2) + Math.cos(y * 0.005 + time);
          let length = 10 + Math.sin(x * 0.01 + y * 0.01 + time) * 3;
          let alpha = 0.18 + Math.sin(x * 0.005 + time) * 0.07;
          let strokeColor = `rgba(161, 161, 170, ${alpha})`;

          if (isHovering && dist < influenceRadius) {
            const factor = Math.pow(1 - dist / influenceRadius, 2);
            const repelAngle = Math.atan2(dy, dx);
            angle = angle * (1 - factor) + (repelAngle + Math.PI) * factor;
            length += factor * 14;

            const r = Math.round(168 * factor + 161 * (1 - factor));
            const g = Math.round(85 * factor + 161 * (1 - factor));
            const b = Math.round(247 * factor + 170 * (1 - factor));
            const boostedAlpha = Math.min(0.9, alpha + factor * 0.7);
            strokeColor = `rgba(${r}, ${g}, ${b}, ${boostedAlpha})`;
          }

          const endX = x + Math.cos(angle) * length;
          const endY = y + Math.sin(angle) * length;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = strokeColor;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#030305] text-zinc-100"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#030305_100%)] pointer-events-none z-[1]" />

      {/* Static, transparent navbar */}
      <nav className="relative z-20 w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center h-20">
          <a href="#" className="flex items-center group">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Busayo Ale
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#technologies" className="hover:text-white transition-colors">Technologies</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#skills" className="hover:text-white transition-colors">Expertise</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#credentials" className="hover:text-white transition-colors">Credentials</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <a
            href="#contact"
            className="px-5 py-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800/80 text-xs font-medium text-zinc-200 transition-all duration-200 active:scale-95"
          >
            Connect
          </a>
        </div>
      </nav>

      {/* Tilt Layer (Hero Content Only) */}
      <motion.div
        style={{ rotateX: tiltRotateX, rotateY: tiltRotateY, transformPerspective: 1200 }}
        className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 sm:px-12 py-12"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl font-mono text-zinc-400 font-medium mb-2 tracking-tight"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 mb-3 leading-[1.05]"
          >
            Busayo Ale.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-zinc-400 mb-6 leading-tight"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 font-light leading-relaxed"
          >
            With 4+ years of building full-stack applications, I bridge user-focused Figma designs with clean, reliable backend architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-6"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-white/10"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-300 font-medium text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2"
            >
              <span>Get in Touch</span>
            </motion.a>
          </motion.div>

          <DevWorkspaceSnapshot />
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// ABOUT ME SECTION
// ==========================================

function AboutSection() {
  return (
    <section className="py-28 px-6 sm:px-12 border-t border-zinc-800/60 bg-[#030305]" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">
            Background & Mindset
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            About Me
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl font-light">
            A practical look into how I design, develop, and deliver digital products across the entire stack.
          </p>
        </motion.div>

        {/* Top Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-5 text-zinc-300 font-light text-base leading-relaxed"
          >
            <motion.p variants={fadeInUp}>
              I am a <strong className="text-white font-semibold">Full Stack Developer</strong> with over 4 years of hands-on experience designing, developing, and deploying web applications. I combine academic software engineering principles with modern production practices—bridging intuitive design in <strong className="text-zinc-100 font-semibold">Figma</strong> with Next.js/React frontend engineering and performant Node.js/NestJS backend services.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Over the course of my career, I’ve worked on everything from component systems and real-time dashboards to multi-tenant e-commerce platforms and relational databases. Because I design in Figma and code across the stack, I eliminate the friction between concept and execution—ensuring responsive layouts, accessibility, and smooth user interactions.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Whether prototyping a fresh interface, optimizing database queries, or deploying microservices, I prioritize clean code architecture, type safety, and fast load times across every device.
            </motion.p>
          </motion.div>

          {/* Quick Stats / Highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <motion.div
              variants={scaleIn}
              className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/50 flex flex-col justify-between"
            >
              <span className="text-3xl font-extrabold text-white">4+</span>
              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Years Experience</div>
                <div className="text-[11px] text-zinc-500 font-light mt-1">Full-stack web & UI engineering</div>
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/50 flex flex-col justify-between"
            >
              <span className="text-3xl font-extrabold text-purple-400">Design + Dev</span>
              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Figma to Code</div>
                <div className="text-[11px] text-zinc-500 font-light mt-1">Design systems & clean components</div>
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/50 flex flex-col justify-between col-span-2"
            >
              <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                Core Engineering Values
              </div>
              <ul className="space-y-2 text-xs text-zinc-400 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Interactive Figma prototypes translated cleanly into React/Next.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Modular REST APIs & microservices built on Node.js/NestJS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Efficient relational database schema design & indexing in PostgreSQL</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* 3 Core Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {ABOUT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-purple-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// TECHNOLOGIES & TOOLS SECTION
// ==========================================

function TechnologiesSection() {
  return (
    <section className="py-28 px-6 sm:px-12 border-t border-zinc-800/60 bg-[#050508]" id="technologies">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">
            Toolchain & Languages
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Technologies & Stack
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl font-light">
            Core production competencies across UI design, frontend frameworks, backend runtimes, and cloud platforms.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {TECH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.category}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed font-light mb-8">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/60">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN COMBINED PAGE COMPONENT
// ==========================================

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("busayo.ale@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Hero with clean static navbar */}
      <UnifiedHeroNav />

      {/* Expanded About Me */}
      <AboutSection />

      {/* Technologies & Tools */}
      <TechnologiesSection />

      {/* Featured Work */}
      <section className="py-28 px-6 sm:px-12 border-t border-zinc-800/60" id="work">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-800/60 gap-6"
          >
            <div>
              <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">
                Portfolio
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Selected Work
              </h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-md font-light">
              Full-stack applications built from Figma prototypes to reliable backends, real-time pipelines, and clean user interfaces.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-700 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="h-56 relative bg-gradient-to-b from-zinc-900/40 to-black/60 border-b border-zinc-800/60 flex items-center justify-center p-6 overflow-hidden">
                  <ProjectSchematic type={project.type} />
                  <div className="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded bg-zinc-900/80 border border-zinc-700/80 text-zinc-300">
                    {project.stats}
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-zinc-300">{project.id}</span>
                      <span className="text-zinc-600 text-xs">—</span>
                      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{project.category}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>View Specifications</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-28 px-6 sm:px-12 border-t border-zinc-800/60" id="skills">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">
              Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Engineered Competencies
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl font-light">
              Engineering standards applied to production systems for performance, reliability, and developer experience.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {SKILL_MODULES.map((skill) => (
              <motion.div
                key={skill.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700/80 transition-colors duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      {skill.category}
                    </span>
                    <span className="text-xs font-medium text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                      {skill.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {skill.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                    {skill.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
                  {skill.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- CAREER CHRONOLOGY (LEFT-ALIGNED) ---------------- */}
      <section className="py-28 px-6 sm:px-12 border-t border-zinc-800/60" id="experience">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">
              Career Path
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Work Experience
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl font-light">
              Designing, delivering, and scaling web applications across the full stack.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {EXPERIENCE.map((item) => (
              <motion.div
                key={item.role}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700/80 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">
                    {item.role} <span className="text-zinc-400 font-normal">at {item.company}</span>
                  </h3>
                  <span className="text-xs font-medium text-zinc-500 tracking-wider">
                    {item.period}
                  </span>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-4xl">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- CREDENTIALS & EDUCATION (LEFT-ALIGNED) ---------------- */}
      <section className="py-28 px-6 sm:px-12 border-t border-zinc-800/60" id="credentials">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">
              Credentials
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Education & Certifications
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl font-light">
              Formal computer science & software engineering training paired with industry-standard development credentials.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Education */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-300 pb-2 border-b border-zinc-800">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>ACADEMIC DEGREES</span>
              </div>
              {EDUCATION.map((edu) => (
                <motion.div
                  key={edu.degree}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700/80 transition-all"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                    <span className="text-xs text-zinc-500 font-medium">{edu.period}</span>
                  </div>
                  <div className="text-zinc-300 text-sm mb-3 font-medium">{edu.institution}</div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">{edu.details}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-300 pb-2 border-b border-zinc-800">
                <Award className="w-4 h-4 text-purple-400" />
                <span>PROFESSIONAL CERTIFICATIONS</span>
              </div>
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.name}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700/80 transition-all"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-white text-sm">{cert.name}</h3>
                    <span className="text-xs text-zinc-500 font-medium">{cert.year}</span>
                  </div>
                  <div className="text-zinc-300 text-xs mb-2 font-medium">{cert.issuer}</div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed mb-3">
                    {cert.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-28 px-6 sm:px-12 border-t border-zinc-800/60" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="p-10 sm:p-16 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-md"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 uppercase tracking-wider mb-6">
              Open to Opportunities
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Let&apos;s build something great.
            </h2>

            <p className="text-zinc-400 text-base max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Available for full-time full-stack engineering roles, freelance contracts, and technical consulting.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:busayo.ale@example.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Start Direct Discussion</span>
              </motion.a>

              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-xs font-medium text-zinc-300 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-zinc-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard" : "Copy Email Address"}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeInUp}
        className="w-full py-12 px-6 sm:px-12 border-t border-zinc-800/80 text-xs text-zinc-500"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-bold uppercase text-sm">Busayo Ale</span>
            <span>— Full Stack Developer</span>
          </div>

          <div className="flex gap-6 text-zinc-400 items-center font-medium">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          <div className="text-zinc-600">
            © {new Date().getFullYear()} Busayo Ale. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
}