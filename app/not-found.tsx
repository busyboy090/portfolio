"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Compass, Terminal } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background text-zinc-900 dark:text-zinc-100 px-6 overflow-hidden select-none selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#030305_100%)] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-xl text-center flex flex-col items-center">
        {/* 404 Big Heading */}
        <div className="relative">
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-400 dark:from-white dark:via-zinc-200 dark:to-zinc-600 select-none">
            404
          </span>
          <div className="absolute -inset-4 bg-purple-500/10 blur-2xl -z-10 rounded-full" />
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mt-4 mb-3">
          Page Not Found
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-light max-w-md mb-10 leading-relaxed">
          The page or resource you requested doesn’t exist or has been moved. Please check the URL or return to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-950 dark:hover:bg-white text-zinc-50 dark:text-zinc-950 font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/5 dark:shadow-white/5 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </main>
  );
}
