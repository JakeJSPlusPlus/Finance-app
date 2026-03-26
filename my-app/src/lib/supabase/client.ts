import { createClient } from "@supabase/supabase-js";

// Singleton pattern so we don't create a new client on every render
let client: ReturnType<typeof createClient> | null = null;


export const SUPABASE_ANON_KEY ='NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmZm12emFyb3hudnV1ZGthYnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTQ2MDMsImV4cCI6MjA4OTc5MDYwM30.GufnkodXSsntUu6FNByL-91Ec0VjnvYQ6HQ2Tnvb2x4'
export function getSupabaseBrowserClient() {
    if (client) return client;

    client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );

    return client;
}