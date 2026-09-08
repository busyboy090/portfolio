import { createClient } from "@/lib/server";
import SkillsView, { SkillCategoryItem } from "./SkillsView";

// Server Component: fetches skill categories from Supabase instead of
// the previous hardcoded one-card-per-section array.
export default async function SkillsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skill_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(error);
  }

  const categories: SkillCategoryItem[] = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    section: row.section,
    description: row.description,
    proficiency: row.proficiency ?? undefined,
    skills: row.skills ?? [],
  }));

  return <SkillsView categories={categories} />;
}
