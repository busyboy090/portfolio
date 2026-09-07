"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo.png";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll completely when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#030305] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <Image src={Logo} alt="Busayo Ale" className="w-14 h-14 rounded-full text-white bg-white" width={100} height={100} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Connect Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-5 py-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800/80 text-xs font-medium text-zinc-200 transition-all duration-200 active:scale-95"
          >
            Connect
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          className="md:hidden p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Full-screen Opaque Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-20 bottom-0 h-[calc(100dvh-5rem)] w-full bg-[#030305] z-50 flex flex-col justify-between px-6 py-8 overflow-y-auto"
          >
            {/* Nav Items */}
            <div className="space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between p-4 rounded-xl text-base transition-colors ${
                      isActive
                        ? "bg-zinc-900 text-white font-semibold border border-zinc-800"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-purple-400" />}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Full-width Connect CTA */}
            <div className="pt-6 border-t border-zinc-800/80 mt-auto">
              <Link
                href="/contact"
                className="w-full py-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 active:scale-[0.98]"
              >
                <span>Connect</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}