"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn, ABOUT_CARDS } from "@/data/portfolio";

export default function AboutPage() {
  return (
    <div className="py-20 px-6 sm:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 mb-2">
            Background & Mindset
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl font-light">
            A practical look into how I design, develop, and deliver digital products across the entire stack.
          </p>
        </motion.div>

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-7 space-y-5 text-zinc-700 dark:text-zinc-300 font-light text-base leading-relaxed"
          >
            <motion.p variants={fadeInUp}>
              I am a <strong className="text-zinc-900 dark:text-white font-semibold">Full Stack Developer</strong> with over 4 years of hands-on experience designing, developing, and deploying modern web applications. I combine software engineering principles with battle-tested production practices—building responsive frontends in Next.js and React, backed by scalable backend services in Node.js and NestJS.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Over the course of my career, I’ve delivered production code across interactive client interfaces, real-time dashboards, and multi-tenant applications. I take an end-to-end approach to engineering: ensuring clean UI architecture, well-structured relational databases, and dependable API contracts.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Whether building an application from scratch, modernizing legacy codebases, or tuning database query profiles, I prioritize developer ergonomics, strict type safety, and fast performance across every viewport.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <motion.div variants={scaleIn} className="p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col justify-between">
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">4+</span>
              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Years Experience</div>
                <div className="text-[11px] text-zinc-500 font-light mt-1">Full-stack web engineering</div>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col justify-between">
              <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">Full-Stack</span>
              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Production Ready</div>
                <div className="text-[11px] text-zinc-500 font-light mt-1">Design specs to deployment</div>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col justify-between col-span-2">
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3">
                Core Engineering Values
              </div>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Fluid, accessible, component-driven user interfaces in React & Next.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Scalable REST APIs and microservices built on Node.js and NestJS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Reliable database schema design, migration strategies, and indexing</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Engineering Pillars */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
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
                  className="p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/40 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{card.title}</h2>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}