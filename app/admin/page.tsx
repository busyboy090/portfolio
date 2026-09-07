import { getCurrentUser } from "@/hooks/get-current-user";
import { FolderKanban, Briefcase, Sparkles, Layers } from "lucide-react";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  const STATS = [
    { label: "Active Projects", value: "3", icon: FolderKanban, detail: "Across WebSockets & Next.js" },
    { label: "Work Timeline", value: "2 Roles", icon: Briefcase, detail: "4+ years engineering history" },
    { label: "Tech Stack Modules", value: "18", icon: Sparkles, detail: "Frontend, Backend, DevOps" },
    { label: "Total Visits", value: "1.2k", icon: Layers, detail: "Last 30 days" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Workspace Overview
        </h1>
        <p className="text-sm text-zinc-400 mt-1 font-light">
          Welcome back. Select a module from the sidebar or manage your portfolio highlights below.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-400">{stat.label}</span>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-[11px] text-zinc-500 font-light">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-6 space-y-4">
        <h2 className="text-base font-semibold text-white">Quick Content Management</h2>
        <p className="text-sm text-zinc-400 font-light">
          Add new project architectures, certifications, or update your experience history directly to Supabase.
        </p>
        
        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href="/admin/projects"
            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-all"
          >
            Manage Projects
          </a>
          <a
            href="/admin/experience"
            className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-all"
          >
            Update Experience
          </a>
        </div>
      </div>
    </div>
  );
}