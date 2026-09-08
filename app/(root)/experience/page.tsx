import { createClient } from "@/lib/server";
import ExperienceView, {
  WorkRecord,
  EducationRecord,
  CertificationRecord,
} from "./ExperienceView";

// Server Component: fetches work experience, education, and certifications
// straight from Supabase on every request instead of the static arrays.
export default async function ExperiencePage() {
  const supabase = await createClient();

  const [workRes, eduRes, certRes] = await Promise.all([
    supabase.from("work_experience").select("*").order("created_at", { ascending: false }),
    supabase.from("education").select("*").order("created_at", { ascending: false }),
    supabase.from("certifications").select("*").order("created_at", { ascending: false }),
  ]);

  if (workRes.error) console.error(workRes.error);
  if (eduRes.error) console.error(eduRes.error);
  if (certRes.error) console.error(certRes.error);

  const work: WorkRecord[] = (workRes.data ?? []).map((row) => ({
    id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    description: row.description,
    technologies: row.technologies ?? [],
  }));

  const education: EducationRecord[] = (eduRes.data ?? []).map((row) => ({
    id: row.id,
    degree: row.degree,
    institution: row.institution,
    period: row.period,
    details: row.details,
  }));

  const certifications: CertificationRecord[] = (certRes.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    issuer: row.issuer,
    year: row.year,
    credentialId: row.credential_id,
    description: row.description,
  }));

  return <ExperienceView work={work} education={education} certifications={certifications} />;
}
