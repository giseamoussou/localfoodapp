import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Database } from '../services/supabase';
import { LocalFoodAppContext, ShoppingCartContext } from '../contexts/Context';
import { supabase } from '../services/supabase-client';
import { Commande } from '../models/LocalFoodAppModels';
import { SkeletonSimpler } from 'react-native-skeleton-simpler';


type OrderView = {
    ref: string,
    amount: number,
    paymentMethod: string,
    status: 'paid' | 'unpaid',
    createdOn: Date
}

function OrdersScreen() {

    const [commandes, setCommandes] = useState<Array<Database['public']['Tables']['commande']['Row']>>([]);
    const { appContext } = useContext(LocalFoodAppContext)
    const { cartContext } = useContext(ShoppingCartContext)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [orderViews, setOrderViews] = useState<Array<OrderView>>([])

    useEffect(() => {

        fetchCommandes();

    }, [])

    async function fetchCommandes() {

        const { data: commandes, error: errorCommandes } = await supabase.from('commande').select('*')
            .eq('userId', String(appContext.user.id)).limit(25)

        if (commandes) {

            console.log("commandes", commandes)

            let oViews: Array<OrderView> = [];

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

                    oViews.push(view)
                }
            }

            setOrderViews(oViews);
        }

    }

    async function onRefresh() {
        setIsRefreshing(true)
        await fetchCommandes();
        setIsRefreshing(false)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 5 }}>
            <ScrollView bounces refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                {orderViews.map((orderView, index) => (

                    <TouchableOpacity activeOpacity={0.65} key={index} style={{ backgroundColor: 'whitesmoke', elevation: 2.5, borderRadius: 10, margin: 5, paddingVertical: 10, paddingHorizontal: 8, shadowColor: 'tomato' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'darkslategray', fontWeight: '500' }}>ref: {orderView.ref}</Text>
                            <View>
                                <Text style={{ color: 'black', textAlign: 'right', fontSize: 13 }}>{orderView.createdOn.toLocaleDateString('fr')}</Text>
                                <Text style={{ color: 'black', textAlign: 'right', fontSize: 13 }}>{orderView.createdOn.toLocaleTimeString('fr')}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                            <Text style={{ color: 'black', fontSize: 13 }}>Montant: <Text style={{ color: 'tomato' }}>{orderView.amount} Fcfa</Text></Text>
                        </View>

                        {
                            orderView.status == "paid" &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 13 }}>Livraison: </Text>
                                    <Text style={{ color: 'white', backgroundColor: 'darkslategray', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2, textAlignVertical: 'center', fontSize: 12, textAlign: 'center' }}>en cours</Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'white', backgroundColor: orderView.status == 'paid' ? 'tomato' : 'darkslategray', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2, textAlignVertical: 'center', fontSize: 12, textAlign: 'center' }}>{orderView.status == "paid" ? "payé" : "non payé"}</Text>
                                </View>
                            </View>
                        }

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default OrdersScreen;
