"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  ExternalLink,
  Menu,
  X,
  MessageSquare,
  Settings,
} from "lucide-react";

// Context to share open/close state between trigger and drawer
const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Skills", href: "/admin/skills", icon: Sparkles },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

/** The hamburger button to place inside the header */
export function SidebarTrigger() {
  const { setIsOpen } = useContext(SidebarContext);
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors shrink-0"
      aria-label="Open navigation menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}

/** The main Sidebar & Drawer Provider */
export default function AdminSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  const NavigationContent = () => (
    <div className="flex flex-col justify-between h-full p-5 bg-[#07070a] backdrop-blur-md">
      <div>
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm shrink-0">
            BA
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white tracking-tight truncate">Admin Console</h2>
            <p className="text-[11px] text-zinc-500 truncate">Portfolio Studio</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-zinc-800/80 text-white shadow-sm border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-purple-400" : "text-zinc-500"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-zinc-800/60 space-y-1">
        <Link
          href="/"
          target="_blank"
          onClick={closeSidebar}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 transition-all"
        >
          <span>Live Portfolio</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        </Link>
      </div>
    </div>
  );

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {/* ─── DESKTOP STATIC SIDEBAR (≥ lg) ─── */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 border-r border-zinc-800/80">
        <NavigationContent />
      </aside>

      {/* ─── MOBILE DRAWER (< lg) ─── */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] bg-[#07070a] border-r border-zinc-800 flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 border-b border-zinc-800/80">
          <button
            onClick={closeSidebar}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavigationContent />
        </div>
      </div>

      {/* Render children (Header + Main content) */}
      {children}
    </SidebarContext.Provider>
  );
}