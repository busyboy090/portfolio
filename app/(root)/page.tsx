"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

// ==========================================
// SOCIAL ICONS
// ==========================================

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XTwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com", icon: GithubIcon },
  { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { name: "X / Twitter", href: "https://x.com", icon: XTwitterIcon },
];

// ==========================================
// TERMINAL DATA
// ==========================================

const TERMINAL_SPECS = [
  { label: "OS", val: "DevOS v4.2.0-lts" },
  { label: "Role", val: "Full Stack Dev (4+ Yrs)" },
  { label: "Education", val: "B.Sc Soft. Eng ('26)" },
  { label: "Frontend", val: "Next.js, React, TS" },
  { label: "Backend", val: "Node.js, NestJS, PHP" },
  { label: "Databases", val: "Postgres, MySQL, Redis" },
  { label: "Cloud", val: "Docker, AWS, CI/CD" },
];

const CODE_LINES = [
  { parts: [{ text: "import", cls: "text-purple-400" }, { text: " React ", cls: "text-zinc-200" }, { text: "from", cls: "text-purple-400" }, { text: " 'react';", cls: "text-emerald-300" }] },
  { parts: [] },
  { parts: [{ text: "const", cls: "text-purple-400" }, { text: " DevWorkspace", cls: "text-blue-400" }, { text: " = () => {", cls: "text-zinc-300" }] },
  { parts: [{ text: "  const", cls: "text-purple-400" }, { text: " [active, setActive] = React.", cls: "text-zinc-200" }, { text: "useState", cls: "text-blue-300" }, { text: "(", cls: "text-zinc-300" }, { text: "true", cls: "text-amber-400" }, { text: ");", cls: "text-zinc-300" }] },
  { parts: [] },
  { parts: [{ text: "  return", cls: "text-purple-400" }, { text: " (", cls: "text-zinc-300" }] },
  { parts: [{ text: '    <div className="workspace">', cls: "text-zinc-300" }] },
  { parts: [{ text: "      <ProductionEngine ready={active} />", cls: "text-zinc-300" }] },
  { parts: [{ text: "    </div>", cls: "text-zinc-300" }] },
  { parts: [{ text: "  );", cls: "text-zinc-300" }] },
  { parts: [{ text: "};", cls: "text-zinc-300" }] },
];

function DevWorkspaceSnapshot() {
  const [specCount, setSpecCount] = useState(0);
  const [codeLineIdx, setCodeLineIdx] = useState(0);

  useEffect(() => {
    if (specCount < TERMINAL_SPECS.length) {
      const timeout = setTimeout(() => setSpecCount((prev) => prev + 1), 220);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => setSpecCount(0), 10000);
      return () => clearTimeout(reset);
    }
  }, [specCount]);

  useEffect(() => {
    if (codeLineIdx < CODE_LINES.length) {
      const timeout = setTimeout(() => setCodeLineIdx((prev) => prev + 1), 140);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => setCodeLineIdx(0), 10000);
      return () => clearTimeout(reset);
    }
  }, [codeLineIdx]);

  return (
    <div className="relative w-full font-mono select-none">
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-blue-600/30 rounded-3xl blur-3xl -z-10 pointer-events-none"
      />

      <div className="w-full rounded-xl border border-zinc-800/90 bg-[#07070a]/90 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d12]/90 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          </div>
          <span className="text-xs text-zinc-400 font-medium tracking-wide">busayo@dev-workspace</span>
          <div className="w-10" />
        </div>

        <div className="p-5 sm:p-6 text-left min-h-[300px] pb-24 sm:pb-28">
          <div className="text-amber-200 font-bold text-xs sm:text-sm">busayo@dev-workspace</div>
          <div className="text-zinc-600 text-xs tracking-widest pb-1 mb-3">------------------------</div>

          <div className="space-y-1.5 text-xs">
            {TERMINAL_SPECS.slice(0, specCount).map((item) => (
              <div key={item.label} className="flex gap-2">
                <span className="text-purple-400 font-semibold w-24 flex-shrink-0">{item.label}:</span>
                <span className="text-zinc-300 font-normal truncate">{item.val}</span>
              </div>
            ))}
            {specCount < TERMINAL_SPECS.length && (
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="inline-block w-2 h-3 bg-purple-400 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.3 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-2 sm:-right-4 -bottom-6 sm:-bottom-8 w-[92%] sm:w-[380px] rounded-xl border border-zinc-700/80 bg-[#0d0d14]/95 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.98)] overflow-hidden z-20"
      >
        <div className="flex items-center justify-between px-3 py-2 bg-[#12121c] border-b border-zinc-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          </div>
          <span className="text-[11px] text-zinc-400">DevWorkspace.tsx</span>
          <div className="w-6" />
        </div>
        <div className="p-3 text-[11px] leading-relaxed font-mono text-zinc-300 overflow-hidden">
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

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 20 });

  const tiltRotateX = useTransform(smoothY, [-500, 500], [1.5, -1.5]);
  const tiltRotateY = useTransform(smoothX, [-600, 600], [-2, 2]);

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
    <div
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-[#030305] text-zinc-100"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#030305_100%)] pointer-events-none z-[1]" />

      <motion.div
        style={{ rotateX: tiltRotateX, rotateY: tiltRotateY, transformPerspective: 1200 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-12 md:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Continuous Animated Name, CTAs, & Socials */}
          <div className="lg:col-span-7 text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg font-mono text-zinc-400 font-medium mb-2 tracking-tight"
            >
              Hi, my name is
            </motion.p>

            {/* Continuous Ripple-Animated Name Header */}
            <div className="relative inline-block mb-3 select-none">
              {/* Continuous Pulsing Backdrop Aura */}
              <motion.div
                animate={{
                  scale: [0.95, 1.12, 0.95],
                  opacity: [0.25, 0.55, 0.25],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-x-8 top-1/2 -translate-y-1/2 h-24 bg-gradient-to-r from-purple-600/30 via-cyan-500/25 to-blue-600/30 blur-3xl -z-10 pointer-events-none rounded-full"
              />

              <h1 className="flex flex-wrap items-baseline gap-x-4 leading-[1.05]">
                {["Busayo", "Ale."].map((word, wordIndex) => {
                  const baseCharIndex = wordIndex === 0 ? 0 : 6;
                  return (
                    <span key={wordIndex} className="inline-flex">
                      {word.split("").map((char, charIndex) => {
                        const totalIndex = baseCharIndex + charIndex;
                        return (
                          <motion.span
                            key={charIndex}
                            animate={{
                              y: [0, -7, 0],
                              filter: [
                                "hue-rotate(0deg) drop-shadow(0 0 0px rgba(168,85,247,0))",
                                "hue-rotate(35deg) drop-shadow(0 0 10px rgba(168,85,247,0.4))",
                                "hue-rotate(0deg) drop-shadow(0 0 0px rgba(168,85,247,0))",
                              ],
                            }}
                            transition={{
                              duration: 3.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: totalIndex * 0.14,
                            }}
                            className="inline-block text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-purple-300"
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  );
                })}
              </h1>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-400 mb-6 leading-tight"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg text-zinc-400 max-w-xl mb-8 font-light leading-relaxed"
            >
              Architecting modern web applications with clean, maintainable code. Specializing in responsive frontend experiences, high-throughput APIs, and reliable database systems.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8"
            >
              <Link
                href="/work"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-white/10 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Download CV */}
              <a
                href="/resume.pdf"
                download="Busayo_Ale_CV.pdf"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 group"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3 pt-2"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 mr-2">
                Connect:
              </span>
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.name}
                    className="p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800/70 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Dev Workspace Snapshot */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <DevWorkspaceSnapshot />
          </div>
        </div>
      </motion.div>
    </div>
  );
}