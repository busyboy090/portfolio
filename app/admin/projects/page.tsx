"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Search,
  X,
  Sparkles,
  SlidersHorizontal,
  Eye,
  EyeOff,
} from "lucide-react";
import { PROJECTS } from "@/data/portfolio";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  stats: string;
  type: "wave" | "grid" | "nodes";
  published: boolean;
}

export default function ManageProjectsPage() {
  // Local project list initialized from your static portfolio data
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    PROJECTS.map((p) => ({
      ...p,
      type: (p.type as "wave" | "grid" | "nodes") || "wave",
      published: true,
    }))
  );

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formState, setFormState] = useState<Partial<ProjectItem>>({
    title: "",
    category: "Full Stack",
    description: "",
    tags: [],
    stats: "",
    type: "wave",
    published: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = filterCategory === "All" || item.category === filterCategory;
      return matchesSearch && matchesCat;
    });
  }, [projects, searchQuery, filterCategory]);

  // Open modal for new project
  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormState({
      title: "",
      category: "Full Stack",
      description: "",
      tags: ["Next.js", "TypeScript"],
      stats: "Sub-50ms Latency",
      type: "wave",
      published: true,
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormState({ ...project });
    setTagInput("");
    setIsModalOpen(true);
  };

  // Toggle Publish / Draft
  const handleTogglePublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
    showToast("Updated visibility status");
  };

  // Delete project
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Project deleted successfully");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.description) {
      alert("Title and description are required.");
      return;
    }

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? ({ ...p, ...formState } as ProjectItem) : p))
      );
      showToast(`Updated "${formState.title}"`);
    } else {
      const nextId = String(projects.length + 1).padStart(2, "0");
      const newProj: ProjectItem = {
        id: nextId,
        title: formState.title!,
        category: formState.category || "Full Stack",
        description: formState.description!,
        tags: formState.tags || [],
        stats: formState.stats || "Production Ready",
        type: formState.type || "wave",
        published: formState.published ?? true,
      };
      setProjects((prev) => [newProj, ...prev]);
      showToast(`Added "${newProj.title}"`);
    }

    setIsModalOpen(false);
  };

  // Tag helper
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const current = formState.tags || [];
      if (!current.includes(tagInput.trim())) {
        setFormState({ ...formState, tags: [...current, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormState({
      ...formState,
      tags: (formState.tags || []).filter((t) => t !== tag),
    });
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 p-6 sm:p-10 font-sans selection:bg-purple-900/40">
      {/* Toast */}
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
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolio CMS</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Project Manager</h1>
            <p className="text-zinc-400 text-xs mt-1">
              Add, update, or remove projects shown on your live portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/work"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-xs font-medium text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <span>Preview Live Work</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search projects or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 w-full sm:w-auto justify-end">
            <span>
              Total: <strong className="text-white">{projects.length}</strong>
            </span>
            <span>•</span>
            <span>
              Live: <strong className="text-emerald-400">{projects.filter((p) => p.published).length}</strong>
            </span>
          </div>
        </div>

        {/* Projects Table */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0e0e13] border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Title & Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Metric</th>
                  <th className="p-4">Tags</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 font-mono text-zinc-500">{project.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white max-w-[200px] truncate">{project.title}</div>
                      <div className="text-[11px] text-zinc-500 max-w-[260px] truncate font-light mt-0.5">
                        {project.description}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-purple-300 text-[11px]">{project.stats}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px]">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] text-zinc-500 font-mono">+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(project.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all ${
                          project.published
                            ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.published ? "bg-emerald-400" : "bg-zinc-600"
                          }`}
                        />
                        <span>{project.published ? "Live" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 rounded-lg border border-zinc-800 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-zinc-500 font-mono">
                      No matching projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL: CREATE / EDIT PROJECT */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0c0c12] p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-bold text-white">
                  {editingProject ? "Edit Project" : "Create New Project"}
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
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Distributed Cache Mesh"
                    value={formState.title || ""}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Real-Time Systems"
                      value={formState.category || ""}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                      Key Metric Stat
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 120k Events/sec"
                      value={formState.stats || ""}
                      onChange={(e) => setFormState({ ...formState, stats: e.target.value })}
                      className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Brief description of the architecture and goals..."
                    value={formState.description || ""}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Tech Tags Input */}
                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                    Tags (Type & hit Enter)
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 min-h-[38px]">
                    {(formState.tags || []).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]"
                      >
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-rose-400 text-zinc-500"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="bg-transparent text-white border-none focus:outline-none flex-1 min-w-[100px]"
                    />
                  </div>
                </div>

                {/* Vector Schematic Style */}
                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                    Schematic Graphic Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["wave", "grid", "nodes"] as const).map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormState({ ...formState, type: t })}
                        className={`p-2 rounded-lg border font-mono capitalize text-xs ${
                          formState.type === t
                            ? "bg-purple-950/40 border-purple-600 text-purple-300 font-bold"
                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visibility Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formState.published ?? true}
                      onChange={(e) => setFormState({ ...formState, published: e.target.checked })}
                      className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-0"
                    />
                    <span className="text-zinc-300 text-xs">Publish immediately to live portfolio</span>
                  </label>
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
                    {editingProject ? "Save Changes" : "Create Project"}
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