"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { fadeInUp } from "@/data/portfolio";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("busayo.ale@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6 sm:px-12">
      <div className="max-w-4xl w-full mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="p-10 sm:p-16 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-md"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 uppercase tracking-wider mb-6">
            Open to Opportunities
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            Let&apos;s build something great.
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Available for full-time full-stack engineering roles, freelance contracts, and technical consulting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:busayo.ale@example.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Start Direct Discussion</span>
            </motion.a>

            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-xs font-medium text-zinc-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-zinc-200" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to Clipboard" : "Copy Email Address"}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}