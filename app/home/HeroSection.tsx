"use client";

import { useState } from "react";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC0mo8p6Xio6BEqrg3LGSn_RwblMQZkTgxs4ZxV2b18IFZ0fOw03-nU_MeaVS9hXULw2-w9wAobBCGW6bq1itkj5wvhMmZw3ZAIt0JebreOtV-_gjx8Ro4vsjzCKURY5VrP23bwWoa8q87Ss6pzQshRFhCSIeZZgCUOHz9Q1HezxYCIsQnnp0MjGDYrl7wvNNi8cr7KiWjuzE-eYwTaj7T3LoDZ78HH4KzCtVY1cjCJdKFcB4GDwrL8";

// Radius (in px) of the clear "spotlight" circle around the cursor.
const SPOTLIGHT_RADIUS = 180;

export default function HeroSection() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  return (
    <section
      className="relative min-h-[921px] flex items-center justify-center overflow-hidden py-32 px-margin-mobile md:px-margin-desktop"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="absolute inset-0 z-0">
        {/* Base layer: dimmed + blurred, always visible */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />

        {/* Spotlight layer: clear, unblurred image, revealed only near the cursor */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ease-out"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            opacity: active ? 1 : 0,
            WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`,
          }}
        />
      </div>
      <div className="absolute inset-0 bg-grid opacity-20 z-0" />

      <div className="relative z-10 max-w-container-max mx-auto text-center flex flex-col items-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-on-surface-variant font-label-mono text-label-mono">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for new opportunities
        </div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-6 max-w-4xl tracking-tight">
          Hi, I&apos;m Josiah.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Full-Stack Web Developer.
          </span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
          I engineer high-performance web applications with precision and scale in mind.
          Specializing in modern JavaScript ecosystems and robust backend architectures.
        </p>
        <div className="flex gap-4">
          <a
            className="bg-[#6366F1] hover:bg-[#4f51d8] text-white px-8 py-4 rounded-lg font-body-md text-body-md transition-colors inline-flex items-center gap-2"
            href="#work"
          >
            View Projects
            <span className="material-symbols-outlined text-sm">arrow_downward</span>
          </a>
          <a
            className="bg-transparent border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-body-md text-body-md transition-all"
            href="#contact"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}