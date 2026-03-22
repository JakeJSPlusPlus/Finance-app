import postgres from 'postgres'
import { createClient } from 'npm:@supabase/supabase-js@2'
const connectionString = "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
const sql = postgres(connectionString)
export default sql