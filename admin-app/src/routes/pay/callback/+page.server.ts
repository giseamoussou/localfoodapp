import { supabaseAdmin } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load = (async ({ request }) => {
    
    const url = new URL(request.url);
    const referencePaiement = url.searchParams.get('reference');
    const kkiapayId = url.searchParams.get("transaction_id");

    if (referencePaiement && kkiapayId) {
        const { data: paiement, error: paiementError } = await supabaseAdmin.from('paiement')
                    .select('*').eq('referenceInterne', referencePaiement).single();
        
        if(paiement){

            const { data: updatedPaiement, error: updatedPaiementError } = await supabaseAdmin.from('paiement').update({ referenceExterne: kkiapayId, statut: 'paid'})
                    .eq('referenceInterne', referencePaiement).select('*').single()

            if(updatedPaiement){

                return {
                    success: true
                }
            }
        }
    }

    return {
        success: false
    }
}) satisfies PageServerLoad;