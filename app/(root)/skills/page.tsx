"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/data/portfolio";

const SKILL_SECTIONS = [
  {
    key: "frontend",
    title: "Frontend",
    icon: Layout,
    color: "text-sky-400",
    description: "Responsive interfaces, modern component states, and rendering performance.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
  },
  {
    key: "backend",
    title: "Backend",
    icon: Server,
    color: "text-emerald-400",
    description: "Distributed architectures, microservices, and secure API gateways.",
    skills: ["Node.js", "Express", "NestJS", "Go", "REST APIs", "GraphQL"],
  },
  {
    key: "database",
    title: "Database",
    icon: Database,
    color: "text-amber-400",
    description: "Schema design, query optimization, indexing, and low-latency cache layers.",
    skills: ["PostgreSQL", "MongoDB", "Prisma ORM", "Redis", "Supabase", "MySQL"],
  },
  {
    key: "tools",
    title: "DevOps & Tools",
    icon: Wrench,
    color: "text-purple-400",
    description: "Containerization pipelines, continuous delivery, and developer tooling.",
    skills: ["Docker", "AWS", "Git / GitHub", "CI/CD Actions", "Linux", "Vercel"],
  },
];

export default function SkillsPage() {
  return (
    <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 selection:bg-purple-900/40">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Skills</h1>
        <p className="text-zinc-400 text-sm font-light">
          Primary production tools, frameworks, and technologies grouped by domain.
        </p>
      </motion.div>

      {/* Side-by-Side Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {SKILL_SECTIONS.map((section) => {
          const Icon = section.icon;

          return (
            <motion.div
              key={section.key}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <Icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">{section.title}</h2>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-light mb-6">
                  {section.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/70">
                <div className="flex flex-wrap gap-1.5">
                  {section.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}