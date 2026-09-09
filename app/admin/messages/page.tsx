"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MailOpen,
  Send,
  Trash2,
  Archive,
  Star,
  Search,
  CheckCircle2,
  Clock,
  User,
  Copy,
  Check,
  Sparkles,
  Inbox,
  CornerUpLeft,
} from "lucide-react";
import { createClient } from "@/lib/client";

// ==========================================
// TYPES
// ==========================================

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied: boolean;
  starred: boolean;
  archived: boolean;
}

function fromRow(row: any): ContactMessage {
  return {
    id: row.id,
    senderName: row.name ?? row.sender_name ?? "Anonymous",
    senderEmail: row.email ?? row.sender_email ?? "",
    subject: row.subject ?? "(No Subject)",
    message: row.message ?? "",
    createdAt: row.created_at
      ? new Date(row.created_at).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "",
    read: Boolean(row.read),
    replied: Boolean(row.replied),
    starred: Boolean(row.starred),
    archived: Boolean(row.archived),
  };
}

export default function MessagesDashboardPage() {
  const supabase = useMemo(() => createClient(), []);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "replied" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error(error);
        showToast("Failed to load messages");
      } else {
        const mapped = (data ?? []).map(fromRow);
        setMessages(mapped);
        setSelectedId(mapped[0]?.id || "");
      }
      setIsLoading(false);
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // Selected message detail
  const activeMessage = useMemo(() => {
    return messages.find((m) => m.id === selectedId) || null;
  }, [messages, selectedId]);

  // Filtered list
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch =
        m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === "all") return !m.archived;
      if (activeFilter === "unread") return !m.read && !m.archived;
      if (activeFilter === "replied") return m.replied && !m.archived;
      if (activeFilter === "archived") return m.archived;
      return true;
    });
  }, [messages, activeFilter, searchQuery]);

  // Message Actions
  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedId(msg.id);
    if (!msg.read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
      supabase
        .from("messages")
        .update({ read: true })
        .eq("id", msg.id)
        .then(({ error }) => {
          if (error) console.error(error);
        });
    }
  };

  const handleToggleStar = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const target = messages.find((m) => m.id === id);
    if (!target) return;
    const nextStarred = !target.starred;

    const { error } = await supabase.from("messages").update({ starred: nextStarred }).eq("id", id);
    if (error) {
      console.error(error);
      showToast("Failed to update message");
      return;
    }
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, starred: nextStarred } : m)));
  };

  const handleToggleArchive = async (id: string) => {
    const target = messages.find((m) => m.id === id);
    if (!target) return;
    const nextArchived = !target.archived;

    const { error } = await supabase.from("messages").update({ archived: nextArchived }).eq("id", id);
    if (error) {
      console.error(error);
      showToast("Failed to update archive status");
      return;
    }
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, archived: nextArchived } : m)));
    showToast("Message archive status updated");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this inquiry?")) return;

    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      console.error(error);
      showToast("Failed to delete message");
      return;
    }

    setMessages((prev) => {
      const next = prev.filter((m) => m.id !== id);
      if (selectedId === id) {
        setSelectedId(next[0]?.id || "");
      }
      return next;
    });
    showToast("Message deleted");
  };

  const handleMarkReplied = async (id: string) => {
    const { error } = await supabase.from("messages").update({ replied: true }).eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, replied: true } : m)));
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Contact Inbox</h1>
            <p className="text-zinc-400 text-xs mt-1">
              Read and reply to job opportunities, contract offers, and inquiries from your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-zinc-400">
              Unread:{" "}
              <strong className="text-purple-400">
                {messages.filter((m) => !m.read && !m.archived).length}
              </strong>
            </span>
            <span>•</span>
            <span className="text-zinc-400">
              Total Inbound:{" "}
              <strong className="text-white">{messages.length}</strong>
            </span>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2.5 rounded-xl border border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: "all", label: "Inbox", icon: Inbox, count: messages.filter((m) => !m.archived).length },
              { id: "unread", label: "Unread", icon: Mail, count: messages.filter((m) => !m.read && !m.archived).length },
              { id: "replied", label: "Replied", icon: CornerUpLeft, count: messages.filter((m) => m.replied && !m.archived).length },
              { id: "archived", label: "Archived", icon: Archive, count: messages.filter((m) => m.archived).length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className="text-[10px] font-mono text-zinc-500">({tab.count})</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search sender, subject, or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>
        </div>

        {/* Two-Pane Message Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          {/* Left Column: Messages List */}
          <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-zinc-800/80 bg-[#0e0e13] text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex justify-between items-center">
              <span>Inbound Leads</span>
              <span>{filteredMessages.length} Messages</span>
            </div>

            <div className="divide-y divide-zinc-800/60 overflow-y-auto max-h-[600px] flex-1">
              {isLoading && (
                <div className="p-12 text-center text-zinc-500 font-mono text-xs">Loading messages...</div>
              )}
              {!isLoading && filteredMessages.map((msg) => {
                const isSelected = selectedId === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 cursor-pointer transition-all flex flex-col justify-between gap-2 text-xs ${
                      isSelected
                        ? "bg-purple-950/20 border-l-2 border-purple-500"
                        : "hover:bg-zinc-900/40"
                    } ${!msg.read ? "font-medium" : "text-zinc-400"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />}
                        <span className={`truncate text-sm ${!msg.read ? "text-white font-bold" : "text-zinc-300"}`}>
                          {msg.senderName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-mono text-zinc-500">{msg.createdAt}</span>
                        <button
                          onClick={(e) => handleToggleStar(msg.id, e)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              msg.starred ? "text-amber-400 fill-amber-400" : "text-zinc-600 hover:text-zinc-400"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className={`truncate text-xs ${!msg.read ? "text-zinc-200 font-semibold" : "text-zinc-400"}`}>
                      {msg.subject}
                    </div>

                    <p className="text-[11px] text-zinc-500 line-clamp-2 font-light">
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      {msg.replied && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Replied</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {!isLoading && filteredMessages.length === 0 && (
                <div className="p-12 text-center text-zinc-500 font-mono text-xs">
                  No messages found in this view.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Message Detail Pane */}
          <div className="lg:col-span-7 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {activeMessage ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                {/* Header & Controls */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleArchive(activeMessage.id)}
                        className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                          activeMessage.archived
                            ? "bg-purple-950/40 border-purple-600 text-purple-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                        }`}
                        title={activeMessage.archived ? "Unarchive" : "Archive"}
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>{activeMessage.archived ? "Archived" : "Archive"}</span>
                      </button>

                      <button
                        onClick={() => handleDelete(activeMessage.id)}
                        className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeMessage.createdAt}</span>
                    </div>
                  </div>

                  {/* Sender Profile Strip */}
                  <div className="py-6 border-b border-zinc-800/80">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
                          {activeMessage.senderName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-white">
                            {activeMessage.senderName}
                          </h2>
                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5">
                            <span>{activeMessage.senderEmail}</span>
                            <button
                              onClick={() => handleCopyEmail(activeMessage.senderEmail)}
                              className="hover:text-white transition-colors"
                              title="Copy Email Address"
                            >
                              {copied ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3 text-zinc-500" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          activeMessage.replied
                            ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}
                      >
                        {activeMessage.replied ? "Replied" : "Awaiting Reply"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-100 mt-6">
                      {activeMessage.subject}
                    </h3>
                  </div>

                  {/* Message Body */}
                  <div className="py-6 text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                    {activeMessage.message}
                  </div>
                </div>

                {/* Direct Action Footer */}
                <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-zinc-500 font-mono">
                    Sender verified via portfolio contact endpoint
                  </span>

                  <a
                    href={`mailto:${activeMessage.senderEmail}?subject=Re: ${encodeURIComponent(
                      activeMessage.subject
                    )}`}
                    onClick={() => handleMarkReplied(activeMessage.id)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Launch Reply Email</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 text-zinc-500 font-mono text-xs">
                <Mail className="w-8 h-8 text-zinc-700 mb-3" />
                <span>Select an inbound communication to inspect details.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}