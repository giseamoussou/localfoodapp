import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { Database } from '../services/supabase';
import { supabase } from "../services/supabase-client";
import { LocalFoodAppContext } from "../contexts/Context";


function OrdersScreen() {

    const [orders, setOrders] = useState<Database['public']['Tables']['commande']['Row'][] | null>(null)
    const { appContext } = useContext(LocalFoodAppContext)

    useEffect(() => {

        fetchOrders();

    }, [])

    async function fetchOrders() {

        try {

            const { data, error } = await supabase.from('commande').select("*")
                .eq('userId', appContext.user.id)
                .order('createdAt', { ascending: false });

            if (error) {

            }
            if (data) {
                console.log("Commandes", JSON.stringify(data));

                setOrders(data);
            }

        } catch (error) {

        }

    }

    return (
        <>
            <Text style={{ textAlign: 'center', marginTop: 25 }}>Liste des commandes</Text>
        </>
    )
}


export default OrdersScreen;
