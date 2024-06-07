import { supabaseAdmin } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load = (async ({ request }) => {

    const url = new URL(request.url);
    const referencePaiement = url.searchParams.get('reference');

    if (referencePaiement) {
        const { data: paiement, error: paiementError } = await supabaseAdmin.from('paiement')
                    .select('*').eq('referenceInterne', referencePaiement).single();
        
        if(paiementError) {
            return {
                success: false
            }
        }
        if(paiement){

            //get commande
            const { data: commande, error: commandeError } = await supabaseAdmin.from('commande')
                    .select('*').eq('paiementId', paiement.id).single();

            if(commandeError) {
                return {
                    success: false
                }
            }
            if(commande){

                const {data: user, error: userError} = await supabaseAdmin.auth.admin.getUserById(commande.userId!)

                if(userError) {
                    return {
                        success: false
                    }
                }

                if(user){

                    const userData = user!

                    const callbackUrl = new URL(`/pay/callback?reference=${referencePaiement}`, new URL(request.url).origin).toString()

                    return {
                        success: true,
                        userId: commande.userId,
                        paymentId: paiement.referenceInterne,
                        amount: Number.parseFloat(paiement.montant!.toString()),
                        callbackUrl: callbackUrl,
                        email: userData.user.email,
                        fullname: userData.user.user_metadata?.fullname.toLowerCase()
                    };
                }
            }

        }


    }
    else {
        return {
            success: false
        }
    }


}) satisfies PageServerLoad;