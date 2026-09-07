import supabase from "@/app/api/client";
import type { User, Session } from "@supabase/supabase-js";

/**
 * Signs in the user and returns user info along with any error message.
 */
export const signIn = async (
  email: string,
  password: string,
): Promise<{ user: User | null; error: string | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error: error.message };
  }

  return { user: data.user, error: null };
};

/**
 * Signs out the current user.
 */
export const signOut = async (): Promise<{ error: string | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error: error?.message ?? null };
};


/**
 * Reads the active session directly from local storage/cookies.
 */
export const getSession = async (): Promise<Session | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session;
};
