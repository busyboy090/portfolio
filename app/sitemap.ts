import type { MetadataRoute } from "next";
import { createClient } from "@/lib/server";
import { SITE_URL } from "@/lib/site-config";

// Picks the most recent updated_at across one or more query results,
// falling back to `now` if every query errored or returned nothing —
// a sitemap should never fail to generate just because a timestamp
// couldn't be determined.
function latestUpdatedAt(
  results: Array<{ data: { updated_at: string }[] | null; error: unknown }>
): Date {
  let latest: number | null = null;

  for (const { data, error } of results) {
    if (error || !data) continue;
    for (const row of data) {
      const t = new Date(row.updated_at).getTime();
      if (!Number.isNaN(t) && (latest === null || t > latest)) {
        latest = t;
      }
    }
  }

  return latest !== null ? new Date(latest) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [settingsRes, projectsRes, workRes, eduRes, certRes, skillsRes] = await Promise.all([
    supabase.from("site_settings").select("updated_at").eq("id", 1),
    supabase.from("projects").select("updated_at").eq("published", true),
    supabase.from("work_experience").select("updated_at"),
    supabase.from("education").select("updated_at"),
    supabase.from("certifications").select("updated_at"),
    supabase.from("skill_categories").select("updated_at"),
  ]);

  const homeLastModified = latestUpdatedAt([settingsRes]);
  const workLastModified = latestUpdatedAt([projectsRes]);
  const experienceLastModified = latestUpdatedAt([workRes, eduRes, certRes]);
  const skillsLastModified = latestUpdatedAt([skillsRes]);

  return [
    {
      url: SITE_URL,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: workLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: experienceLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: skillsLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
