"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Search,
  X,
  Sparkles,
  Layout,
  Server,
  Database,
  Wrench,
  Layers,
  Code2,
} from "lucide-react";
import { createClient } from "@/lib/client";

// ==========================================
// TYPES & CONSTANTS
// ==========================================

export type SkillSection = "frontend" | "backend" | "database" | "tools";

export interface SkillCategoryItem {
  id: string;
  name: string;
  section: SkillSection;
  description: string;
  proficiency?: string; // e.g. "Advanced", "Proficient", "95%"
  skills: string[];
}

const SECTION_CONFIG: Record<
  SkillSection,
  { label: string; icon: React.ElementType; color: string; border: string; bg: string }
> = {
  frontend: {
    label: "Frontend",
    icon: Layout,
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
  },
  backend: {
    label: "Backend",
    icon: Server,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  database: {
    label: "Database",
    icon: Database,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
  tools: {
    label: "DevOps & Tools",
    icon: Wrench,
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
  },
};

function fromRow(row: any): SkillCategoryItem {
  return {
    id: row.id,
    name: row.name,
    section: row.section,
    description: row.description,
    proficiency: row.proficiency ?? undefined,
    skills: row.skills ?? [],
  };
}

type TabFilter = "all" | SkillSection;

export default function SkillsCMSPage() {
  const supabase = useMemo(() => createClient(), []);

  const [skillsList, setSkillsList] = useState<SkillCategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [chipInput, setChipInput] = useState("");

  const [formData, setFormData] = useState<Partial<SkillCategoryItem>>({
    name: "",
    section: "frontend",
    description: "",
    proficiency: "Advanced",
    skills: [],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { data, error } = await supabase
        .from("skill_categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error(error);
        showToast("Failed to load skills");
      } else {
        setSkillsList((data ?? []).map(fromRow));
      }
      setIsLoading(false);
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleOpenCreate = () => {
    setModalMode("create");
    setEditingId(null);
    setChipInput("");
    setFormData({
      name: "",
      section: activeTab === "all" ? "frontend" : activeTab,
      description: "",
      proficiency: "Advanced",
      skills: [],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SkillCategoryItem) => {
    setModalMode("edit");
    setEditingId(item.id);
    setChipInput("");
    setFormData({ ...item, skills: [...item.skills] });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill group?")) return;

    const { error } = await supabase.from("skill_categories").delete().eq("id", id);

    if (error) {
      console.error(error);
      showToast("Failed to delete skill group");
      return;
    }

    setSkillsList((prev) => prev.filter((item) => item.id !== id));
    showToast("Skill group removed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.section) return;

    if (modalMode === "edit" && editingId) {
      const { data, error } = await supabase
        .from("skill_categories")
        .update({
          name: formData.name,
          section: formData.section,
          description: formData.description,
          proficiency: formData.proficiency || null,
          skills: formData.skills || [],
        })
        .eq("id", editingId)
        .select()
        .single();

      if (error || !data) {
        console.error(error);
        showToast("Failed to update skill group");
        return;
      }

      const updated = fromRow(data);
      setSkillsList((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      showToast(`Updated "${updated.name}"`);
    } else {
      const { data, error } = await supabase
        .from("skill_categories")
        .insert({
          name: formData.name,
          section: formData.section,
          description: formData.description,
          proficiency: formData.proficiency || "Proficient",
          skills: formData.skills || [],
        })
        .select()
        .single();

      if (error || !data) {
        console.error(error);
        showToast("Failed to create skill group");
        return;
      }

      const created = fromRow(data);
      setSkillsList((prev) => [...prev, created]);
      showToast(`Added "${created.name}"`);
    }

    setIsModalOpen(false);
  };

  // Chip input handlers
  const handleAddChip = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && chipInput.trim()) {
      e.preventDefault();
      const val = chipInput.trim();
      const current = formData.skills || [];
      if (!current.includes(val)) {
        setFormData({ ...formData, skills: [...current, val] });
      }
      setChipInput("");
    }
  };

  const handleRemoveChip = (chipToRemove: string) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter((s) => s !== chipToRemove),
    });
  };

  // Search & tab filtering
  const filteredSkills = useMemo(() => {
    return skillsList.filter((item) => {
      const matchesTab = activeTab === "all" || item.section === activeTab;
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTab && matchesQuery;
    });
  }, [skillsList, activeTab, searchQuery]);

  // Group items by section when viewing "all"
  const groupedSections: SkillSection[] =
    activeTab === "all"
      ? ["frontend", "backend", "database", "tools"]
      : [activeTab];

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

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Skills Manager</h1>
            <p className="text-zinc-400 text-xs mt-1">
              Organize technical proficiencies across Frontend, Backend, Database, and DevOps & Tools.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/skills"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-xs font-medium text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <span>Preview Live Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill Category</span>
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-px overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              activeTab === "all"
                ? "bg-purple-600/10 text-purple-400 border border-purple-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Sections</span>
            <span className="px-1.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500">
              {skillsList.length}
            </span>
          </button>

          {(Object.keys(SECTION_CONFIG) as SkillSection[]).map((sectionKey) => {
            const config = SECTION_CONFIG[sectionKey];
            const Icon = config.icon;
            const count = skillsList.filter((s) => s.section === sectionKey).length;
            const isActive = activeTab === sectionKey;

            return (
              <button
                key={sectionKey}
                onClick={() => setActiveTab(sectionKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? `${config.bg} ${config.color} border ${config.border}`
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{config.label}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search frameworks, libraries, descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>
          <div className="text-xs font-mono text-zinc-500 hidden sm:block">
            {filteredSkills.length} skill groups found
          </div>
        </div>

        {/* ============================================================== */}
        {/* SKILLS SECTION GRIDS */}
        {/* ============================================================== */}
        <div className="space-y-10">
          {isLoading && (
            <div className="p-12 text-center text-zinc-500 font-mono border border-dashed border-zinc-800 rounded-xl">
              Loading skills...
            </div>
          )}
          {!isLoading && groupedSections.map((sectionKey) => {
            const sectionItems = filteredSkills.filter((item) => item.section === sectionKey);
            const config = SECTION_CONFIG[sectionKey];
            const SectionIcon = config.icon;

            if (sectionItems.length === 0 && activeTab === "all") return null;

            return (
              <section key={sectionKey} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                  <div className={`p-1.5 rounded-lg ${config.bg} ${config.color}`}>
                    <SectionIcon className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-white tracking-wide">{config.label}</h2>
                  <span className="text-xs font-mono text-zinc-500">({sectionItems.length})</span>
                </div>

                {sectionItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sectionItems.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEdit(cat)}
                                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                                title="Edit"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDelete(cat.id)}
                                className="p-1.5 rounded-lg border border-zinc-800 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {cat.proficiency && (
                            <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                              {cat.proficiency}
                            </span>
                          )}

                          <p className="text-zinc-400 text-xs leading-relaxed font-light mb-4">
                            {cat.description}
                          </p>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono uppercase text-zinc-500 mb-2">
                            {cat.skills.length} Tools & Technologies
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80">
                            {cat.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-[11px] font-medium text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-zinc-500 font-mono border border-dashed border-zinc-800 rounded-xl text-xs">
                    No skills listed under {config.label}.
                  </div>
                )}
              </section>
            );
          })}

          {!isLoading && filteredSkills.length === 0 && (
            <div className="p-12 text-center text-zinc-500 font-mono border border-dashed border-zinc-800 rounded-xl">
              No skills match your search query.
            </div>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: CREATE / EDIT SKILL GROUP */}
      {/* ========================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0c0c12] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-sm font-bold text-white">
                  {modalMode === "edit" ? "Edit Skill Group" : "Add New Skill Group"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                    Section Category *
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) =>
                      setFormData({ ...formData, section: e.target.value as SkillSection })
                    }
                    className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 capitalize"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Database</option>
                    <option value="tools">DevOps & Tools</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                      Group / Category Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. State & UI Architecture"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                      Proficiency / Level
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Advanced / 90%"
                      value={formData.proficiency || ""}
                      onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief description of frameworks, capabilities, or experience..."
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                    Skills & Tool Chips (Type & Press Enter)
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 min-h-[42px]">
                    {(formData.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[11px]"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveChip(skill)}
                          className="hover:text-rose-400 text-zinc-400"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="e.g. Next.js, Redis..."
                      value={chipInput}
                      onChange={(e) => setChipInput(e.target.value)}
                      onKeyDown={handleAddChip}
                      className="bg-transparent text-white border-none focus:outline-none flex-1 min-w-[120px]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-600/20"
                  >
                    {modalMode === "edit" ? "Save Changes" : "Create Skill Group"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}