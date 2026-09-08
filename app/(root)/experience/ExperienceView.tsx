"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, ShieldCheck } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/data/portfolio";

export interface WorkRecord {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface EducationRecord {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface CertificationRecord {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
  description: string;
}

export default function ExperienceView({
  work,
  education,
  certifications,
}: {
  work: WorkRecord[];
  education: EducationRecord[];
  certifications: CertificationRecord[];
}) {
  const hasWork = Array.isArray(work) && work.length > 0;
  const hasEducation = Array.isArray(education) && education.length > 0;
  const hasCertifications = Array.isArray(certifications) && certifications.length > 0;

  return (
    <div className="py-20 px-6 sm:px-12 space-y-24 bg-background transition-colors">
      {/* Work Experience Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 mb-2">
            Career Chronology
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Work Experience
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl font-light">
            Designing, delivering, and scaling web applications across the full stack.
          </p>
        </motion.div>

        {!hasWork ? (
          <div className="text-center py-16 text-zinc-500 text-sm font-light">
            No work experience listed yet.
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            {work.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="p-8 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {item.role} <span className="text-zinc-600 dark:text-zinc-400 font-normal">at {item.company}</span>
                  </h2>
                  <span className="text-xs font-medium text-zinc-500 tracking-wider">{item.period}</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-4xl">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Education & Certifications Section */}
      <div className="max-w-7xl mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60 pt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 mb-2">
            Qualifications
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Education & Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Degrees */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>ACADEMIC DEGREES</span>
            </div>
            {!hasEducation ? (
              <div className="text-zinc-500 text-sm font-light py-4">No degrees listed yet.</div>
            ) : (
              education.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={fadeInUp}
                  className="p-8 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 shadow-sm"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-zinc-900 dark:text-white text-base">{edu.degree}</h3>
                    <span className="text-xs text-zinc-500 font-medium">{edu.period}</span>
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300 text-sm mb-3 font-medium">{edu.institution}</div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs font-light leading-relaxed">{edu.details}</p>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Professional Certifications */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>PROFESSIONAL CERTIFICATIONS</span>
            </div>
            {!hasCertifications ? (
              <div className="text-zinc-500 text-sm font-light py-4">No certifications listed yet.</div>
            ) : (
              certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={fadeInUp}
                  className="p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 shadow-sm"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{cert.name}</h3>
                    <span className="text-xs text-zinc-500 font-medium">{cert.year}</span>
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300 text-xs mb-2 font-medium">{cert.issuer}</div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs font-light leading-relaxed mb-3">{cert.description}</p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}