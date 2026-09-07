import { createClient } from "@/lib/server";
import type { User } from "@supabase/supabase-js";

/**
 * Gets the current verified user (validates against Supabase Auth server).
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
};