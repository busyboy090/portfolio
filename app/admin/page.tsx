"use client";

import { useAuth } from "@/components/context/AuthProvider";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <main className="min-h-screen bg-[#030305] text-zinc-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-zinc-400">Signed in as {user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </div>

        <p className="text-zinc-400 text-sm">
          Content management sections (Projects, Experience, Skills, etc.)
          go here next.
        </p>
      </div>
    </main>
  );
}
