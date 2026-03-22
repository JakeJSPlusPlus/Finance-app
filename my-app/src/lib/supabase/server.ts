import { createClient } from "@supabase/supabase-js";

// Always creates a fresh client — no singleton needed on the server
export function getSupabaseServerClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! // Bypasses RLS — use only server-side
    );
}