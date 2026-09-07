"use client";

import React, { useState, useMemo, useRef } from "react";
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
  Eye,
  Upload,
  ImageIcon,
} from "lucide-react";
import { PROJECTS } from "@/data/portfolio";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  stats: string; // <-- Key Metric (e.g. "120k Events/sec", "45ms TTFB")
  type: "wave" | "grid" | "nodes";
  imageUrl?: string;
  published: boolean;
}

// ==========================================
// SCHEMATIC FALLBACK COMPONENT
// ==========================================
function ProjectSchematic({ type }: { type: string }) {
  if (type === "wave") {
    return (
      <svg className="w-full h-full text-zinc-500/50" viewBox="0 0 300 160" fill="none">
        <path d="M0 80 Q 40 20, 80 80 T 160 80 T 240 80 T 320 80" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0 95 Q 45 40, 90 95 T 180 95 T 270 95 T 360 95" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.6" />
        <path d="M0 65 Q 35 10, 70 65 T 140 65 T 210 65 T 280 65" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
      </svg>
    );
  }

  if (type === "grid") {
    return (
      <svg className="w-full h-full text-zinc-500/50" viewBox="0 0 300 160" fill="none">
        <rect x="25" y="25" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="120" y="25" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="215" y="25" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="70" y="95" width="70" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="165" y="95" width="70" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <line x1="55" y1="70" x2="105" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="150" y1="70" x2="105" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="245" y1="70" x2="200" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    );
  }

  return (
    <svg className="w-full h-full text-zinc-500/50" viewBox="0 0 300 160" fill="none">
      <circle cx="150" cy="80" r="28" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="250" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="120" r="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="250" cy="120" r="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="66" y1="48" x2="124" y2="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="234" y1="48" x2="176" y2="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="66" y1="112" x2="124" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="234" y1="112" x2="176" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

// ==========================================
// MAIN CMS PAGE
// ==========================================
export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    PROJECTS.map((p) => ({
      ...p,
      type: (p.type as "wave" | "grid" | "nodes") || "wave",
      published: true,
    }))
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [viewingProject, setViewingProject] = useState<ProjectItem | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formState, setFormState] = useState<Partial<ProjectItem>>({
    title: "",
    category: "Full Stack",
    description: "",
    tags: [],
    stats: "",
    type: "wave",
    imageUrl: "",
    published: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = filterCategory === "All" || item.category === filterCategory;
      return matchesSearch && matchesCat;
    });
  }, [projects, searchQuery, filterCategory]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormState({
      title: "",
      category: "Full Stack",
      description: "",
      tags: ["Next.js", "TypeScript"],
      stats: "Sub-50ms Latency",
      type: "wave",
      imageUrl: "",
      published: true,
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormState({ ...project });
    setTagInput("");
    setIsModalOpen(true);
  };

  // Image Upload Handler (converts to base64 preview or stores file)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("File size exceeds 3MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
    showToast("Updated visibility status");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Project deleted successfully");
    }
  };

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
        imageUrl: formState.imageUrl || "",
        published: formState.published ?? true,
      };
      setProjects((prev) => [newProj, ...prev]);
      showToast(`Added "${newProj.title}"`);
    }

    setIsModalOpen(false);
  };

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
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Project Manager</h1>
            <p className="text-zinc-400 text-xs mt-1">
              Upload project screenshots, edit metrics, and toggle published state.
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

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
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
                  <th className="p-4">Visual</th>
                  <th className="p-4">Title & Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Key Metric</th>
                  <th className="p-4">Tags</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden border border-zinc-800 bg-black/60 flex items-center justify-center flex-shrink-0">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="scale-50 w-full h-full flex items-center justify-center">
                            <ProjectSchematic type={project.type} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white max-w-[200px] truncate">{project.title}</div>
                      <div className="text-[11px] text-zinc-500 max-w-[240px] truncate font-light mt-0.5">
                        {project.description}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-purple-300 text-[11px] font-medium">{project.stats}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px]">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-[10px] text-zinc-500 font-mono">+{project.tags.length - 2}</span>
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
                          onClick={() => setViewingProject(project)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-[11px]"
                          title="View Preview"
                        >
                          <Eye className="w-3.5 h-3.5 text-purple-400" />
                          <span>View</span>
                        </button>

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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL: VIEW PROJECT PREVIEW */}
      {/* ============================================================== */}
      <AnimatePresence>
        {viewingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#0c0c12] p-6 sm:p-7 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-purple-400 font-bold">{viewingProject.id}</span>
                  <span>—</span>
                  <span className="uppercase tracking-wider">{viewingProject.category}</span>
                </div>
                <button
                  onClick={() => setViewingProject(null)}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Graphic Display: Real Photo or Vector Schematic */}
              <div className="my-5 h-52 rounded-xl relative bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden">
                {viewingProject.imageUrl ? (
                  <img src={viewingProject.imageUrl} alt={viewingProject.title} className="w-full h-full object-cover" />
                ) : (
                  <ProjectSchematic type={viewingProject.type} />
                )}
                <div className="absolute top-3 right-3 text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-700 text-purple-300 backdrop-blur-sm">
                  {viewingProject.stats}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white tracking-tight">{viewingProject.title}</h2>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      viewingProject.published
                        ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}
                  >
                    {viewingProject.published ? "Live on site" : "Draft"}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">{viewingProject.description}</p>

                <div className="pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    const toEdit = viewingProject;
                    setViewingProject(null);
                    handleOpenEdit(toEdit);
                  }}
                  className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Project</span>
                </button>
                <button
                  onClick={() => setViewingProject(null)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL: CREATE / EDIT (WITH IMAGE UPLOAD) */}
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
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Image Upload Area */}
                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1.5">
                    Project Screenshot / Cover Image
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {formState.imageUrl ? (
                    <div className="relative h-36 rounded-xl overflow-hidden border border-zinc-700 group">
                      <img
                        src={formState.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormState({ ...formState, imageUrl: "" })}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-rose-400 hover:text-white hover:bg-rose-600 transition-colors"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 rounded-xl p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
                    >
                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                        <Upload className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-zinc-300 font-medium text-xs">Click to upload screenshot</span>
                      <span className="text-zinc-500 text-[10px]">PNG, JPG, WebP up to 3MB</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Title *</label>
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
                    <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Category</label>
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
                      Key Metric * (Scale/Speed)
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
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the problem, architectural choice, and technical delivery..."
                    value={formState.description || ""}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                    Tags (Press Enter)
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

                {!formState.imageUrl && (
                  <div>
                    <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                      Fallback Schematic Style (Shown if no image uploaded)
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
                )}

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