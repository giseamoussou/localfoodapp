import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
    
    const { supabase } = await parent();

    const platsTask = supabase.from('plat').select('*');
    
    return {
        platsTask
    };
}) satisfies PageLoad;