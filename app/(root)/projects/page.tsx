import { createClient } from "@/lib/server";
import WorkGrid, { ProjectItem } from "./ProjectGrid";

// Server Component: fetches published projects straight from Supabase
// on every request, instead of reading the static PROJECTS array.
export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load projects:", error);
  }

  const projects: ProjectItem[] = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    tags: row.tags ?? [],
    stats: row.stats,
    type: (row.type as ProjectItem["type"]) || "wave",
    imageUrl: row.image_url ?? "",
  }));

  return (
    <section className="py-20 px-6 sm:px-12 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-200/60 dark:border-zinc-800/60 gap-6">
          <div>
            <div className="text-xs uppercase font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 mb-2">
              Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Projects
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-md font-light">
            Full-stack applications built from Figma prototypes to reliable backends, real-time pipelines, and clean user interfaces.
          </p>
        </div>

        <WorkGrid projects={projects} />
      </div>
    </section>
  );
}