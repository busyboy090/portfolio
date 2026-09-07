"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setSubmitting(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#030305] px-4 sm:px-6 overflow-hidden selection:bg-zinc-800 selection:text-white">
      {/* Ambient background glows matching the hero theme */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#030305_100%)] pointer-events-none" />

      <div className="relative w-full max-w-[420px]">
        {/* Glow backdrop behind card */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-zinc-800/40 via-purple-500/10 to-transparent blur-lg opacity-60 pointer-events-none" />

        <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-purple-400 mb-4 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
              Sign in to manage portfolio content & metrics
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Notification */}
            {error && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-950/30 border border-red-900/50 text-red-400 text-xs font-light animate-in fade-in zoom-in-95 duration-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label 
                htmlFor="email" 
                className="block text-xs font-medium text-zinc-300 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/50 pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors duration-200 focus:border-zinc-500 focus:bg-zinc-900/80 focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label 
                htmlFor="password" 
                className="block text-xs font-medium text-zinc-300 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/50 pl-10 pr-11 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors duration-200 focus:border-zinc-500 focus:bg-zinc-900/80 focus:ring-1 focus:ring-zinc-500"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all duration-200 shadow-md shadow-white/5 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Footer Back Link */}
          <div className="mt-8 pt-5 border-t border-zinc-800/60 text-center">
            <a
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
            >
              ← Back to portfolio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}