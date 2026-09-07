"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#030305] text-zinc-400 text-sm">
        Checking session...
      </main>
    );
  }

  if (!session) {
    // Redirect is in flight; render nothing to avoid a flash of admin content
    return null;
  }

  return <>{children}</>;
}
