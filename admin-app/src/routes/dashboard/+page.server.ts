import { supabaseAdmin } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {

    const usersCountTask = supabaseAdmin.auth.admin.listUsers();

    return {
        usersCountTask
    };
}) satisfies PageServerLoad;