"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, TECH_CATEGORIES, SKILL_MODULES } from "@/data/portfolio";

export default function ExpertisePage() {
  return (
    <div className="py-20 px-6 sm:px-12 space-y-24">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">Toolchain & Frameworks</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Technologies & Stack</h1>
          <p className="text-zinc-400 text-sm max-w-xl font-light">
            Production competencies across user interfaces, distributed backend runtimes, and deployment pipelines.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TECH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.category} variants={fadeInUp} whileHover={{ y: -4 }} className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{cat.category}</h2>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light mb-8">{cat.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/60">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-800/60 pt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">Production Standards</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">Engineered Competencies</h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_MODULES.map((skill) => (
            <motion.div key={skill.title} variants={fadeInUp} className="p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">{skill.category}</span>
                  <span className="text-xs font-medium text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">{skill.metric}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{skill.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">{skill.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
                {skill.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}