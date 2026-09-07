"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { fadeInUp, staggerContainer, PROJECTS } from "@/data/portfolio";

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

export default function WorkPage() {
  return (
    <section className="py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-800/60 gap-6">
          <div>
            <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">Portfolio</div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Selected Work</h1>
          </div>
          <p className="text-zinc-400 text-sm max-w-md font-light">
            Full-stack applications built from Figma prototypes to reliable backends, real-time pipelines, and clean user interfaces.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
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
                  <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">{project.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors">
                    <span>Inquire About Architecture</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}