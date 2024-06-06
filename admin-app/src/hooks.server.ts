import 'url-polyfill'
import { createServerClient } from '@supabase/ssr'
import { error, type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';


async function createAdminUser() {

    const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b3R4bml3b2J4Z3N5anFkZ3FrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjIxMjMzMywiZXhwIjoyMDMxNzg4MzMzfQ.O7Wcp6-gza6mXogHBix4YvwAcoTNrcG8dD57F_Mi_Cg", {

        auth: {
            persistSession: false,
            autoRefreshToken: false,
        }
    })

    try {

        const signinResult = await supabaseAdmin.auth.admin.createUser({
            email: 'admin@gmail.com',
            password: "admin",
            email_confirm: true,
            user_metadata: {
                fullname: 'Admin 01',
                role: 'admin'
            }
        })

        if (signinResult.error) {
            if (signinResult.error.code == "email_exists") {
                console.log("Admin already created Successfully")
            }
            else {

                console.log("Unable to create Admin: ", signinResult.error)
            }
        }

        if (signinResult.data.user) {
            console.log("Admin created Successfully")
        }

    } catch (error) {

        console.log("An error occured while creating admin user: ", error)
    }

}

await createAdminUser();



const supabase: Handle = async ({ event, resolve }) => {
    /**
     * Creates a Supabase client specific to this server request.
     *
     * The Supabase client gets the Auth token from the request cookies.
     */
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            /**
             * SvelteKit's cookies API requires `path` to be explicitly set in
             * the cookie options. Setting `path` to `/` replicates previous/
             * standard behavior.
             */
            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' })
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' })
            },
        },
    })

    /**
     * Unlike `supabase.auth.getSession()`, which returns the session _without_
     * validating the JWT, this function also calls `getUser()` to validate the
     * JWT before returning the session.
     */
    event.locals.safeGetSession = async function () {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
            return { session: null, user: null }
        }

        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            // JWT validation has failed
            return { session: null, user: null }
        }

        //@ts-ignore
        delete session.user;

        return { session: Object.assign({}, session, { user }), user }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            /**
             * Supabase libraries use the `content-range` and `x-supabase-api-version`
             * headers, so we need to tell SvelteKit to pass it through.
             */
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}

const authGuard: Handle = async ({ event, resolve }) => {
    const { session, user } = await event.locals.safeGetSession()
    event.locals.session = session
    event.locals.user = user

    if (!event.locals.session && event.url.pathname.startsWith('/private')) {
        return redirect(303, '/auth')
    }

    if (event.locals.session && event.url.pathname === '/auth') {
        return redirect(303, '/private')
    }

    return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)
