import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {

    const { supabase } = await parent()

    const { count: platsCount } = await supabase.from('plat').select('*');
    const { count: commandesCount } = await supabase.from('commande').select('*');
    const { count: restaurantsCount } = await supabase.from('restauratrice').select('*');
    const { data: { users: { length: usersCount } } } = await supabase.auth.admin.listUsers({ perPage: Number.MAX_VALUE - 1, page: 1 })

    return {
        platsCount,
        commandesCount,
        usersCount,
        restaurantsCount
    };
}) satisfies PageLoad;