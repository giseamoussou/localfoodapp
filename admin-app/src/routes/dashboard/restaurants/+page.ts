import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {

    const { supabase } = await parent();
    const restaurantsTask = supabase.from('restauratrice').select('*');

    return {
        restaurantsTask
    };
}) satisfies PageLoad;