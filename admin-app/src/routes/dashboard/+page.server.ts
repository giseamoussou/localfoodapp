import { supabaseAdmin } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    
    // counting users required admin rights
    const usersCountTask = supabaseAdmin.auth.admin.listUsers();
    
    return {
        usersCountTask
    };
}) satisfies PageServerLoad;