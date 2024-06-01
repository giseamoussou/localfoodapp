import type { PageLoad } from './$types';

export const load = (async ({ parent, data }) => {

    const { supabase } = await parent()

    const platsCountTask  = supabase.from('plat').select('*', { count: 'estimated' });
    const commandesCountTask = supabase.from('commande').select('*', { count: 'estimated' });
    const restaurantsCountTask = supabase.from('restauratrice').select('*', { count: 'estimated' });

    return {
        platsCountTask,
        commandesCountTask,
        restaurantsCountTask,
        usersCountTask: data.usersCountTask
    };
}) satisfies PageLoad;