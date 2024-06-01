import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { Database } from "./supabase";
import { env } from "$env/dynamic/private";


export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)
export const supabaseAdmin = createClient<Database>(PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY)
