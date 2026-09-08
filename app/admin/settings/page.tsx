"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Save,
  User,
  Share2,
  FileText,
  Upload,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Globe,
  Radio,
  Trash2,
  Download,
} from "lucide-react";
import { createClient } from "@/lib/client";

export default function SettingsDashboardPage() {
  const supabase = useMemo(() => createClient(), []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Profile Information
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    tagline: "",
    availabilityStatus: "available", // 'available' | 'contracts' | 'busy'
    yearsExperience: "",
  });

  // Social & Channels
  const [socials, setSocials] = useState({
    email: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  // Resume File State
  const [resumeData, setResumeData] = useState({
    fileName: "",
    fileSize: "",
    lastUploaded: "",
    isUploaded: false,
    url: "",
  });

  // SEO & Head Metadata
  const [seo, setSeo] = useState({
    siteTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        console.error(error);
        showToast("Failed to load settings");
      } else if (data) {
        setProfile({
          name: data.name ?? "",
          title: data.title ?? "",
          tagline: data.tagline ?? "",
          availabilityStatus: data.availability_status ?? "available",
          yearsExperience: data.years_experience ?? "",
        });
        setSocials({
          email: data.email ?? "",
          github: data.github_url ?? "",
          linkedin: data.linkedin_url ?? "",
          twitter: data.twitter_url ?? "",
        });
        setResumeData({
          fileName: data.resume_file_name ?? "",
          fileSize: data.resume_file_size ?? "",
          lastUploaded: data.resume_uploaded_at
            ? new Date(data.resume_uploaded_at).toLocaleDateString(undefined, { dateStyle: "medium" })
            : "",
          isUploaded: Boolean(data.resume_url),
          url: data.resume_url ?? "",
        });
        setSeo({
          siteTitle: data.seo_site_title ?? "",
          metaDescription: data.seo_meta_description ?? "",
          keywords: data.seo_keywords ?? "",
        });
      }
      setIsLoading(false);
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF document.");
      return;
    }

    // Always overwrite the same object — there's only ever one resume.
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload("resume.pdf", file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      showToast("Resume upload failed");
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("resumes").getPublicUrl("resume.pdf");
    const sizeFormatted = (file.size / 1024).toFixed(0) + " KB";
    const uploadedAt = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("site_settings")
      .update({
        resume_url: publicUrlData.publicUrl,
        resume_file_name: file.name,
        resume_file_size: sizeFormatted,
        resume_uploaded_at: uploadedAt,
      })
      .eq("id", 1);

    if (updateError) {
      console.error(updateError);
      showToast("Failed to save resume details");
      return;
    }

    setResumeData({
      fileName: file.name,
      fileSize: sizeFormatted,
      lastUploaded: "Just now",
      isUploaded: true,
      url: publicUrlData.publicUrl,
    });
    showToast("Resume document uploaded successfully");
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase
      .from("site_settings")
      .update({
        name: profile.name,
        title: profile.title,
        tagline: profile.tagline,
        availability_status: profile.availabilityStatus,
        years_experience: profile.yearsExperience,
        email: socials.email,
        github_url: socials.github,
        linkedin_url: socials.linkedin,
        twitter_url: socials.twitter,
        seo_site_title: seo.siteTitle,
        seo_meta_description: seo.metaDescription,
        seo_keywords: seo.keywords,
      })
      .eq("id", 1);

    setIsSaving(false);

    if (error) {
      console.error(error);
      showToast("Failed to save settings");
      return;
    }

    showToast("Global site settings updated");
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 p-6 sm:p-10 font-sans selection:bg-purple-900/40">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold shadow-2xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Site Profile & Configuration
            </h1>
            <p className="text-zinc-400 text-xs mt-1">
              Update hero bio copy, manage resume downloads, and configure search engine metadata.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-xs font-medium text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <span>Preview Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs border border-dashed border-zinc-800 rounded-xl">
            Loading settings...
          </div>
        ) : (
        <form onSubmit={handleSaveAll} className="space-y-8">
          {/* SECTION 1: PERSONAL & HERO IDENTITY */}
          <div className="p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800/80">
              <User className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-bold text-white">Hero Identity & Presence</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                  Display Name *
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                  Professional Title *
                </label>
                <input
                  type="text"
                  required
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                Hero Tagline & Core Bio
              </label>
              <textarea
                rows={3}
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <span className="text-zinc-500 text-[10px] mt-1 block font-mono">
                Rendered directly on your home hero section beneath the title.
              </span>
            </div>

            {/* Availability Radio Pills */}
            <div>
              <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-2">
                Work Availability Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "available", label: "Open to Opportunities", color: "emerald" },
                  { id: "contracts", label: "Contracts & Advisory Only", color: "amber" },
                  { id: "busy", label: "Currently Unavailable", color: "zinc" },
                ].map((status) => (
                  <button
                    type="button"
                    key={status.id}
                    onClick={() => setProfile({ ...profile, availabilityStatus: status.id })}
                    className={`flex items-center gap-2 p-3 rounded-lg border text-xs text-left transition-all ${
                      profile.availabilityStatus === status.id
                        ? "bg-purple-950/40 border-purple-600 text-purple-200 font-semibold"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        status.color === "emerald"
                          ? "bg-emerald-400"
                          : status.color === "amber"
                          ? "bg-amber-400"
                          : "bg-zinc-500"
                      }`}
                    />
                    <span>{status.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: RESUME / CV FILE */}
          <div className="p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800/80">
              <FileText className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-bold text-white">Curriculum Vitae (PDF)</h2>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-800 text-purple-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {resumeData.isUploaded ? resumeData.fileName : "No resume uploaded yet"}
                  </div>
                  <div className="text-xs font-mono text-zinc-500 mt-0.5">
                    {resumeData.isUploaded
                      ? `${resumeData.fileSize} • Uploaded ${resumeData.lastUploaded}`
                      : "Upload a PDF to make it available on the live site"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace PDF</span>
                </button>

                {resumeData.url && (
                  <a
                    href={resumeData.url}
                    download={resumeData.fileName}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                    title="Download Current Resume"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: SOCIAL ACCOUNTS & CONTACT */}
          <div className="p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800/80">
              <Share2 className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-bold text-white">Social & Reach Channels</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  value={socials.email}
                  onChange={(e) => setSocials({ ...socials, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={socials.github}
                  onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={socials.linkedin}
                  onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                  X (Twitter) Profile URL
                </label>
                <input
                  type="url"
                  value={socials.twitter}
                  onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: SEO & OPEN GRAPH METADATA */}
          <div className="p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800/80">
              <Globe className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-bold text-white">SEO & Search Indexing</h2>
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                Site Browser Title
              </label>
              <input
                type="text"
                value={seo.siteTitle}
                onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                Meta Description (Search & Social Preview)
              </label>
              <textarea
                rows={2}
                value={seo.metaDescription}
                onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                Meta Keywords
              </label>
              <input
                type="text"
                value={seo.keywords}
                onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Global Settings"}</span>
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}