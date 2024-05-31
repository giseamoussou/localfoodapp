import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {

    };
}) satisfies PageServerLoad;



export const actions: Actions = {

    login: async ({ request, locals: { supabase } }) => {

        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        console.log("email + pwd", email, password)

        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) {

            // console.error(error)

            console.log("Ann error occured while authenticating")

            return {
                success: false,
                isBadCredentials: authError.message.toLowerCase().includes("credentials") && authError.message.toLowerCase().includes("invalid"),
                errorMessage: authError.message
            }
        } else {

            //TODO: Check role here
            return redirect(303, '/dashboard')
        }
    },
};