
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;   // from your .env
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY; // from your .env

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,   
    autoRefreshToken: true,
     detectSessionInUrl: true, 
  },
});