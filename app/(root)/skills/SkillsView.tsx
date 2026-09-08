"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/data/portfolio";

export type SkillSection = "frontend" | "backend" | "database" | "tools";

export interface SkillCategoryItem {
  id: string;
  name: string;
  section: SkillSection;
  description: string;
  proficiency?: string;
  skills: string[];
}

const SECTION_CONFIG: Record<
  SkillSection,
  { label: string; icon: React.ElementType; color: string }
> = {
  frontend: { label: "Frontend", icon: Layout, color: "text-sky-400" },
  backend: { label: "Backend", icon: Server, color: "text-emerald-400" },
  database: { label: "Database", icon: Database, color: "text-amber-400" },
  tools: { label: "DevOps & Tools", icon: Wrench, color: "text-purple-400" },
};

const SECTION_ORDER: SkillSection[] = ["frontend", "backend", "database", "tools"];

export default function SkillsView({ categories }: { categories: SkillCategoryItem[] }) {
  const hasAny = categories.length > 0;

  return (
    <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 selection:bg-purple-900/40">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Skills</h1>
        <p className="text-zinc-400 text-sm font-light">
          Primary production tools, frameworks, and technologies grouped by domain.
        </p>
      </motion.div>

      {!hasAny ? (
        <div className="text-center py-16 text-zinc-500 text-sm font-light">No skills listed yet.</div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-12">
          {SECTION_ORDER.map((sectionKey) => {
            const items = categories.filter((c) => c.section === sectionKey);
            if (items.length === 0) return null;

            const config = SECTION_CONFIG[sectionKey];
            const Icon = config.icon;

            return (
              <div key={sectionKey} className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">{config.label}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-sm font-bold text-white">{item.name}</h3>
                          {item.proficiency && (
                            <span className="shrink-0 px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                              {item.proficiency}
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed font-light mb-6">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-zinc-800/70">
                        <div className="flex flex-wrap gap-1.5">
                          {item.skills.map((skill) => (
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
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
