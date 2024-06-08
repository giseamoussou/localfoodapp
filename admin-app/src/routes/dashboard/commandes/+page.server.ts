import { supabase, type OrderView } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const commandes = (async () => {

        let orderViews: Array<OrderView> = [];

        const { data: commandes, error: errorCommandes } = await supabase.from('commande').select('*')
            .order('createdAt', { ascending: false }).limit(20)

        if (commandes) {

            console.log("commandes", commandes)


            for (let index = 0; index < commandes.length; index++) {

                const { data: paiement, error: errorPaiement } = await supabase.from('paiement').select('*')
                    .eq('id', Number(commandes[index].paiementId)).single()

                if (paiement) {

                    const view: OrderView = {
                        ref: commandes[index].reference!,
                        amount: paiement.montant!,
                        paymentMethod: paiement.processeurPaiement!,
                        status: paiement.statut,
                        createdOn: new Date(commandes[index].createdAt)
                    };

                    orderViews.push(view)
                }
            }
        }

        return orderViews
    });

    return {
        commandes: commandes()
    }

}) satisfies PageServerLoad;