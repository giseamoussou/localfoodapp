import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
    
    const { supabase } = await parent();

    const platsTask = supabase.from('plat').select('*');
    const restaurantsTask = supabase.from('restauratrice').select("*")
    const categoriesTask = supabase.from('categories').select('*')
    
    return {
        platsTask,
        restaurantsTask,
        categoriesTask
    };
}) satisfies PageLoad;