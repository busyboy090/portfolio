import { getCurrentUser } from "@/hooks/get-current-user";
import { createClient } from "@/lib/server";
import { FolderKanban, Briefcase, Sparkles, Mail } from "lucide-react";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const [projectsRes, workRes, skillsRes, messagesRes] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("work_experience").select("id", { count: "exact", head: true }),
    supabase.from("skill_categories").select("skills"),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("read", false).eq("archived", false),
  ]);

  const activeProjects = projectsRes.count ?? 0;
  const workRoles = workRes.count ?? 0;

  // "Tech Stack Modules" = distinct individual tools across every skill
  // group, not the number of groups — matches what the label implies.
  const distinctSkills = new Set<string>();
  (skillsRes.data ?? []).forEach((row: { skills: string[] | null }) => {
    (row.skills ?? []).forEach((s) => distinctSkills.add(s));
  });
  const techStackCount = distinctSkills.size;

  const unreadMessages = messagesRes.count ?? 0;

  const STATS = [
    {
      label: "Active Projects",
      value: String(activeProjects),
      icon: FolderKanban,
      detail: "Currently published on /work",
    },
    {
      label: "Work Timeline",
      value: `${workRoles} ${workRoles === 1 ? "Role" : "Roles"}`,
      icon: Briefcase,
      detail: "Entries in work history",
    },
    {
      label: "Tech Stack Modules",
      value: String(techStackCount),
      icon: Sparkles,
      detail: "Distinct tools across all skill groups",
    },
    {
      label: "Unread Messages",
      value: String(unreadMessages),
      icon: Mail,
      detail: "Awaiting a reply in the inbox",
    },
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
