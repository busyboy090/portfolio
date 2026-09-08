import { createClient } from "@/lib/server";
import ExperienceView, {
  WorkRecord,
  EducationRecord,
  CertificationRecord,
} from "./ExperienceView";

export default async function ExperiencePage() {
  const supabase = await createClient();

  const [workRes, eduRes, certRes] = await Promise.all([
    supabase.from("work_experience").select("*").order("created_at", { ascending: false }),
    supabase.from("education").select("*").order("created_at", { ascending: false }),
    supabase.from("certifications").select("*").order("created_at", { ascending: false }),
  ]);

  if (workRes.error) console.error("Error loading work experience:", workRes.error);
  if (eduRes.error) console.error("Error loading education:", eduRes.error);
  if (certRes.error) console.error("Error loading certifications:", certRes.error);

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

  return (
    <ExperienceView
      work={work}
      education={education}
      certifications={certifications}
    />
  );
}