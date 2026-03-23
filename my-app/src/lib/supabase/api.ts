import {createClient} from "@supabase/supabase-js";

let client: ReturnType<typeof createClient> | null = null;
export function getSupabaseApiClient() {
    if (!client === null) {
        return client;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const apiKey = process.env.NEXT_SUPABASE_API_PUBLIC_KEY!;

    return createClient("https://effmvzaroxnvuudkabrc.supabase.co", "sb_publishable_Yvbuyhciub9VMINQyDYdMQ_zY-up8g_")
}