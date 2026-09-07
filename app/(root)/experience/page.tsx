"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, ShieldCheck } from "lucide-react";
import { fadeInUp, staggerContainer, EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/data/portfolio";

export default function ExperiencePage() {
  return (
    <div className="py-20 px-6 sm:px-12 space-y-24">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">Career Chronology</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Work Experience</h1>
          <p className="text-zinc-400 text-sm max-w-xl font-light">
            Designing, delivering, and scaling web applications across the full stack.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
          {EXPERIENCE.map((item) => (
            <motion.div key={`${item.company}-${item.role}-${item.period}`} variants={fadeInUp} className="p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/40">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                <h2 className="text-lg font-bold text-white">
                  {item.role} <span className="text-zinc-400 font-normal">at {item.company}</span>
                </h2>
                <span className="text-xs font-medium text-zinc-500 tracking-wider">{item.period}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-4xl">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-800/60 pt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-400 mb-2">Qualifications</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">Education & Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-300 pb-2 border-b border-zinc-800">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>ACADEMIC DEGREES</span>
            </div>
            {EDUCATION.map((edu) => (
              <motion.div key={edu.institution} variants={fadeInUp} className="p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/40">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                  <span className="text-xs text-zinc-500 font-medium">{edu.period}</span>
                </div>
                <div className="text-zinc-300 text-sm mb-3 font-medium">{edu.institution}</div>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{edu.details}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-300 pb-2 border-b border-zinc-800">
              <Award className="w-4 h-4 text-purple-400" />
              <span>PROFESSIONAL CERTIFICATIONS</span>
            </div>
            {CERTIFICATIONS.map((cert) => (
              <motion.div key={cert.credentialId} variants={fadeInUp} className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/40">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-white text-sm">{cert.name}</h3>
                  <span className="text-xs text-zinc-500 font-medium">{cert.year}</span>
                </div>
                <div className="text-zinc-300 text-xs mb-2 font-medium">{cert.issuer}</div>
                <p className="text-zinc-400 text-xs font-light leading-relaxed mb-3">{cert.description}</p>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ID: {cert.credentialId}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}