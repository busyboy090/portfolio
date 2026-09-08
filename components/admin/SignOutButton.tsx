"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      disabled={loading}
      className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      <span>{loading ? "Signing out..." : "Sign out"}</span>
    </Button>
  );
}