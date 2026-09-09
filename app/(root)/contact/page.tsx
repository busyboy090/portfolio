"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Copy, Check, Send, Loader2 } from "lucide-react";
import { fadeInUp } from "@/data/portfolio";
import { createClient } from "@/lib/client";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");

  useEffect(() => {
    async function fetchSiteSettings() {
      const supabase = createClient();
      // Select both email and the phone/whatsapp column
      const { data, error } = await supabase
        .from("site_settings")
        .select("email, phone") // change "phone" if your column is named "whatsapp_number" or similar
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching site settings:", error);
        return;
      }

      if (data?.email) setContactEmail(data.email);
      if (data?.phone) {
        // Strip out non-numeric characters (plus, spaces, dashes) for wa.me URL
        const cleanNumber = data.phone.replace(/[^0-9]/g, "");
        setWhatsappNumber(cleanNumber);
      }
    }

    fetchSiteSettings();
  }, []);

  const handleCopyEmail = () => {
    if (!contactEmail) return;
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("submitting");
    const supabase = createClient();

    const { error } = await supabase.from("messages").insert({
      name: form.name,
      email: form.email,
      subject: form.subject || "New portfolio inquiry",
      message: form.message,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hi Busayo, I saw your portfolio and would like to discuss an opportunity!"
      )}`
    : "#";

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6 sm:px-12 bg-background transition-colors">
      <div className="max-w-4xl w-full mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="p-10 sm:p-16 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-md"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-6">
            Open to Opportunities
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Let&apos;s build something great.
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Available for full-time full-stack engineering roles, freelance contracts, and technical consulting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                !whatsappNumber ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start Direct Discussion</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={handleCopyEmail}
              disabled={!contactEmail}
              whileHover={{ scale: contactEmail ? 1.04 : 1 }}
              whileTap={{ scale: contactEmail ? 0.96 : 1 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-100/60 dark:bg-zinc-900/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              )}
              <span>{copied ? "Copied to Clipboard" : "Copy Email Address"}</span>
            </motion.button>
          </div>

          <div className="text-left border-t border-zinc-200/80 dark:border-zinc-800/80 pt-10">
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-6 text-center">
              Or send a message directly
            </h2>

            {status === "sent" ? (
              <div className="text-center py-8 text-zinc-700 dark:text-zinc-300 text-sm font-light">
                Thanks — your message has been sent. I&apos;ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject (optional)"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                />

                {status === "error" && (
                  <p className="text-rose-500 dark:text-rose-400 text-xs text-center">
                    Something went wrong — please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}