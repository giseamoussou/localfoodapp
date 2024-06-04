import { supabaseAdmin } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load = (async ({  }) => {
    
    const usersTask = supabaseAdmin.auth.admin.listUsers();
    
    return {
        usersTask
    };
}) satisfies PageServerLoad;