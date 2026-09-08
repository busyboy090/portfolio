"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/data/portfolio";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  stats: string;
  type: "wave" | "grid" | "nodes";
  imageUrl?: string;
}

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

export default function WorkGrid({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-24 text-zinc-500 text-sm font-light">
        No published projects yet — check back soon.
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={fadeInUp}
          whileHover={{ y: -6 }}
          className="group relative rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-700 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
        >
          <div className="relative aspect-video w-full bg-zinc-900 border-b border-zinc-800/60 overflow-hidden flex items-center justify-center">
            {project.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="p-6 w-full h-full flex items-center justify-center">
                <ProjectSchematic type={project.type} />
              </div>
            )}
          </div>

          <div className="p-7 flex flex-col grow justify-between">
            <div>
              <div className="mb-3">
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
  );
}