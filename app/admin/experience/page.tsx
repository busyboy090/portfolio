"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Search,
  X,
  Sparkles,
  Eye,
  ShieldCheck,
  Calendar,
  Building2,
} from "lucide-react";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/data/portfolio";

// =========================================================================
// TYPES
// =========================================================================

export interface WorkRecord {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface EducationRecord {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface CertificationRecord {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
  description: string;
}

type ActiveSection = "work" | "education" | "certifications";

// =========================================================================
// MAIN EXPERIENCE CMS DASHBOARD
// =========================================================================

export default function ExperienceCMSPage() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("work");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lists initialized from static portfolio data
  const [workList, setWorkList] = useState<WorkRecord[]>(() =>
    EXPERIENCE.map((exp, idx) => ({ ...exp, id: `exp-${idx + 1}` }))
  );

  const [eduList, setEduList] = useState<EducationRecord[]>(() =>
    EDUCATION.map((edu, idx) => ({ ...edu, id: `edu-${idx + 1}` }))
  );

  const [certList, setCertList] = useState<CertificationRecord[]>(() =>
    CERTIFICATIONS.map((cert, idx) => ({ ...cert, id: `cert-${idx + 1}` }))
  );

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [viewingItem, setViewingItem] = useState<{
    type: ActiveSection;
    data: any;
  } | null>(null);

  // Form buffers
  const [workForm, setWorkForm] = useState<Partial<WorkRecord>>({
    role: "",
    company: "",
    period: "",
    description: "",
    technologies: [],
  });

  const [eduForm, setEduForm] = useState<Partial<EducationRecord>>({
    degree: "",
    institution: "",
    period: "",
    details: "",
  });

  const [certForm, setCertForm] = useState<Partial<CertificationRecord>>({
    name: "",
    issuer: "",
    year: "",
    credentialId: "",
    description: "",
  });

  const [techInput, setTechInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // =========================================================================
  // HANDLERS
  // =========================================================================

  const handleOpenCreate = () => {
    setModalMode("create");
    setEditingId(null);
    setTechInput("");

    if (activeSection === "work") {
      setWorkForm({
        role: "",
        company: "",
        period: "2024 — PRESENT",
        description: "",
        technologies: ["Next.js", "TypeScript", "Node.js"],
      });
    } else if (activeSection === "education") {
      setEduForm({
        degree: "",
        institution: "",
        period: "2022 — 2026",
        details: "",
      });
    } else {
      setCertForm({
        name: "",
        issuer: "",
        year: String(new Date().getFullYear()),
        credentialId: "",
        description: "",
      });
    }

    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setModalMode("edit");
    setEditingId(item.id);
    setTechInput("");

    if (activeSection === "work") {
      setWorkForm({ ...item });
    } else if (activeSection === "education") {
      setEduForm({ ...item });
    } else {
      setCertForm({ ...item });
    }

    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this entry?")) return;

    if (activeSection === "work") {
      setWorkList((prev) => prev.filter((item) => item.id !== id));
      showToast("Work experience removed");
    } else if (activeSection === "education") {
      setEduList((prev) => prev.filter((item) => item.id !== id));
      showToast("Academic record removed");
    } else {
      setCertList((prev) => prev.filter((item) => item.id !== id));
      showToast("Certification removed");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeSection === "work") {
      if (!workForm.role || !workForm.company) return;
      if (modalMode === "edit" && editingId) {
        setWorkList((prev) =>
          prev.map((item) =>
            item.id === editingId ? ({ ...item, ...workForm } as WorkRecord) : item
          )
        );
        showToast(`Updated "${workForm.role}"`);
      } else {
        const newRecord: WorkRecord = {
          id: `exp-${Date.now()}`,
          role: workForm.role!,
          company: workForm.company!,
          period: workForm.period || "2024 — PRESENT",
          description: workForm.description || "",
          technologies: workForm.technologies || [],
        };
        setWorkList((prev) => [newRecord, ...prev]);
        showToast(`Added "${newRecord.role}"`);
      }
    } else if (activeSection === "education") {
      if (!eduForm.degree || !eduForm.institution) return;
      if (modalMode === "edit" && editingId) {
        setEduList((prev) =>
          prev.map((item) =>
            item.id === editingId ? ({ ...item, ...eduForm } as EducationRecord) : item
          )
        );
        showToast(`Updated "${eduForm.degree}"`);
      } else {
        const newRecord: EducationRecord = {
          id: `edu-${Date.now()}`,
          degree: eduForm.degree!,
          institution: eduForm.institution!,
          period: eduForm.period || "2022 — 2026",
          details: eduForm.details || "",
        };
        setEduList((prev) => [newRecord, ...prev]);
        showToast(`Added "${newRecord.degree}"`);
      }
    } else {
      if (!certForm.name || !certForm.issuer) return;
      if (modalMode === "edit" && editingId) {
        setCertList((prev) =>
          prev.map((item) =>
            item.id === editingId ? ({ ...item, ...certForm } as CertificationRecord) : item
          )
        );
        showToast(`Updated "${certForm.name}"`);
      } else {
        const newRecord: CertificationRecord = {
          id: `cert-${Date.now()}`,
          name: certForm.name!,
          issuer: certForm.issuer!,
          year: certForm.year || "2024",
          credentialId: certForm.credentialId || "VERIFIED-ID",
          description: certForm.description || "",
        };
        setCertList((prev) => [newRecord, ...prev]);
        showToast(`Added "${newRecord.name}"`);
      }
    }

    setIsModalOpen(false);
  };

  // Tag Helpers for work experiences
  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      const current = workForm.technologies || [];
      if (!current.includes(techInput.trim())) {
        setWorkForm({ ...workForm, technologies: [...current, techInput.trim()] });
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setWorkForm({
      ...workForm,
      technologies: (workForm.technologies || []).filter((t) => t !== tech),
    });
  };

  // Filtered queries
  const filteredWork = useMemo(() => {
    return workList.filter(
      (item) =>
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [workList, searchQuery]);

  const filteredEdu = useMemo(() => {
    return eduList.filter(
      (item) =>
        item.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.institution.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [eduList, searchQuery]);

  const filteredCert = useMemo(() => {
    return certList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.credentialId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [certList, searchQuery]);

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
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Experience Manager</h1>
            <p className="text-zinc-400 text-xs mt-1">
              Manage work timeline, academic degrees, and verified certifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/experience"
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
              <span>
                Add {activeSection === "work" ? "Role" : activeSection === "education" ? "Degree" : "Certificate"}
              </span>
            </button>
          </div>
        </div>

        {/* Section Selectors */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-px">
          {[
            { id: "work", label: "Work Experience", count: workList.length, icon: Briefcase },
            { id: "education", label: "Academic Degrees", count: eduList.length, icon: GraduationCap },
            { id: "certifications", label: "Certifications", count: certList.length, icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id as ActiveSection);
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar Toolbar */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder={`Search ${activeSection}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>
          <div className="text-xs font-mono text-zinc-500 hidden sm:block">
            {activeSection === "work" && `${filteredWork.length} positions recorded`}
            {activeSection === "education" && `${filteredEdu.length} degrees registered`}
            {activeSection === "certifications" && `${filteredCert.length} credentials cataloged`}
          </div>
        </div>

        {/* ============================================================== */}
        {/* TABLE: WORK EXPERIENCE */}
        {/* ============================================================== */}
        {activeSection === "work" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0e0e13] border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Role & Company</th>
                    <th className="p-4">Period</th>
                    <th className="p-4">Summary</th>
                    <th className="p-4">Technologies</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {filteredWork.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white">{item.role}</div>
                        <div className="text-[11px] text-purple-400 font-mono mt-0.5">{item.company}</div>
                      </td>
                      <td className="p-4 font-mono text-zinc-400 text-[11px] whitespace-nowrap">
                        {item.period}
                      </td>
                      <td className="p-4">
                        <div className="text-[11px] text-zinc-400 max-w-[280px] truncate font-light">
                          {item.description}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {item.technologies.slice(0, 3).map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px]">
                              {t}
                            </span>
                          ))}
                          {item.technologies.length > 3 && (
                            <span className="text-[10px] text-zinc-500 font-mono">
                              +{item.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingItem({ type: "work", data: item })}
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg border border-zinc-800 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredWork.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-zinc-500 font-mono">
                        No work experience entries matching query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TABLE: ACADEMIC DEGREES */}
        {/* ============================================================== */}
        {activeSection === "education" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0e0e13] border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Degree & Specialization</th>
                    <th className="p-4">Institution</th>
                    <th className="p-4">Period</th>
                    <th className="p-4">Details</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {filteredEdu.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-4 font-semibold text-white max-w-[200px] truncate">
                        {item.degree}
                      </td>
                      <td className="p-4 text-zinc-300">{item.institution}</td>
                      <td className="p-4 font-mono text-zinc-400 text-[11px] whitespace-nowrap">
                        {item.period}
                      </td>
                      <td className="p-4">
                        <div className="text-[11px] text-zinc-400 max-w-[300px] truncate font-light">
                          {item.details}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingItem({ type: "education", data: item })}
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg border border-zinc-800 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredEdu.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-zinc-500 font-mono">
                        No education records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TABLE: CERTIFICATIONS */}
        {/* ============================================================== */}
        {activeSection === "certifications" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0e0e13] border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Certificate Name</th>
                    <th className="p-4">Issuer</th>
                    <th className="p-4">Year</th>
                    <th className="p-4">Credential ID</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {filteredCert.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-4 font-semibold text-white max-w-[220px] truncate">
                        {item.name}
                      </td>
                      <td className="p-4 text-zinc-300">{item.issuer}</td>
                      <td className="p-4 font-mono text-zinc-400 text-[11px]">{item.year}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>{item.credentialId}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingItem({ type: "certifications", data: item })}
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg border border-zinc-800 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredCert.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-zinc-500 font-mono">
                        No certifications cataloged.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL: PREVIEW ITEM */}
      {/* ============================================================== */}
      <AnimatePresence>
        {viewingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0c0c12] p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400">
                  <span>Entry Inspection // {viewingItem.type}</span>
                </div>
                <button
                  onClick={() => setViewingItem(null)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Work View */}
              {viewingItem.type === "work" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{viewingItem.data.role}</h2>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{viewingItem.data.company}</span>
                      <span>•</span>
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{viewingItem.data.period}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {viewingItem.data.description}
                  </p>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-zinc-500 mb-2">Technologies Used</div>
                    <div className="flex flex-wrap gap-1.5">
                      {viewingItem.data.technologies.map((t: string) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Education View */}
              {viewingItem.type === "education" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{viewingItem.data.degree}</h2>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-1">
                      <span>{viewingItem.data.institution}</span>
                      <span>•</span>
                      <span>{viewingItem.data.period}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {viewingItem.data.details}
                  </p>
                </div>
              )}

              {/* Certification View */}
              {viewingItem.type === "certifications" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{viewingItem.data.name}</h2>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-1">
                      <span>{viewingItem.data.issuer}</span>
                      <span>•</span>
                      <span>{viewingItem.data.year}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {viewingItem.data.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ID: {viewingItem.data.credentialId}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={() => setViewingItem(null)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL: CREATE / EDIT DIALOG */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0c0c12] p-6 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-bold text-white">
                  {modalMode === "edit" ? "Edit Entry" : "Create New Entry"} (
                  <span className="capitalize">{activeSection}</span>)
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Form Fields: Work */}
                {activeSection === "work" && (
                  <>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Job Role *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Full-Stack Engineer"
                        value={workForm.role || ""}
                        onChange={(e) => setWorkForm({ ...workForm, role: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Company *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. TechNova"
                          value={workForm.company || ""}
                          onChange={(e) => setWorkForm({ ...workForm, company: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Timeline Period</label>
                        <input
                          type="text"
                          placeholder="e.g. 2022 — PRESENT"
                          value={workForm.period || ""}
                          onChange={(e) => setWorkForm({ ...workForm, period: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Key responsibilities and system architecture contributions..."
                        value={workForm.description || ""}
                        onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">
                        Technologies (Type & press Enter)
                      </label>
                      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 min-h-[38px]">
                        {(workForm.technologies || []).map((t) => (
                          <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]">
                            <span>{t}</span>
                            <button type="button" onClick={() => handleRemoveTech(t)} className="hover:text-rose-400 text-zinc-500">
                              &times;
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add technology..."
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={handleAddTech}
                          className="bg-transparent text-white border-none focus:outline-none flex-1 min-w-[100px]"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Form Fields: Education */}
                {activeSection === "education" && (
                  <>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Degree Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. B.Sc. in Software Engineering"
                        value={eduForm.degree || ""}
                        onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Institution *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Admiralty University"
                          value={eduForm.institution || ""}
                          onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Period</label>
                        <input
                          type="text"
                          placeholder="e.g. 2022 — 2026"
                          value={eduForm.period || ""}
                          onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Curriculum Highlights</label>
                      <textarea
                        rows={3}
                        placeholder="Focus areas, distributed systems, algorithms..."
                        value={eduForm.details || ""}
                        onChange={(e) => setEduForm({ ...eduForm, details: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

                {/* Form Fields: Certifications */}
                {activeSection === "certifications" && (
                  <>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Certification Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AWS Solutions Architect – Associate"
                        value={certForm.name || ""}
                        onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Issuing Authority *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Amazon Web Services"
                          value={certForm.issuer || ""}
                          onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2024"
                          value={certForm.year || ""}
                          onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Credential ID</label>
                      <input
                        type="text"
                        placeholder="e.g. AWS-PSA-84920"
                        value={certForm.credentialId || ""}
                        onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 uppercase font-mono text-[10px] mb-1">Summary</label>
                      <textarea
                        rows={2}
                        placeholder="Scope of credential..."
                        value={certForm.description || ""}
                        onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

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
                    {modalMode === "edit" ? "Save Changes" : "Create Entry"}
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