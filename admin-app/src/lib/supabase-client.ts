import 'url-polyfill'
import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { Database } from "./supabase";
import { env } from "$env/dynamic/private";

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)
export const supabaseAdmin = createClient<Database>(PUBLIC_SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b3R4bml3b2J4Z3N5anFkZ3FrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjIxMjMzMywiZXhwIjoyMDMxNzg4MzMzfQ.O7Wcp6-gza6mXogHBix4YvwAcoTNrcG8dD57F_Mi_Cg")


export type OrderView = {
    ref: string,
    amount: number,
    paymentMethod: string,
    status: 'paid' | 'unpaid',
    createdOn: Date
}