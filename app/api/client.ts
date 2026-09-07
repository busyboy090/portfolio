import { createClient } from "@supabase/supabase-clientjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabasePublishableKey);

export default supabase;