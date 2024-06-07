import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid, Linking, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LocalFoodAppContext, ShoppingCartContext } from '../contexts/Context'
import { ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { supabase } from '../services/supabase-client';
import uuid from 'react-native-uuid'
import { Database } from '../services/supabase';
import LoadingModal from '../components/LoadingModal';

function ShoppingCartScreen() {

    const [total, setTotal] = useState(0);
    const [isCommandePreparing, setIsCommandePreparing] = useState(false);
    const { cartContext, setCartContext } = useContext(ShoppingCartContext)
    const { appContext } = useContext(LocalFoodAppContext)

    useEffect(() => {

        setTotal(cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0));

    }, [cartContext, cartContext.cart])

    async function orderCommand() {

        setIsCommandePreparing(true);

        if (cartContext.cart.length == 0) {
            ToastAndroid.show("Aucun plat dans le panier", ToastAndroid.SHORT);
            return;
        }

        //Create payment record
        const { data: paiement, error: paiementError } = await supabase.from('paiement').insert({
            montant: total,
            processeurPaiement: 'kkiapay',
            referenceInterne: uuid.v4().toString(),
        }, { count: 'exact' }).select("*").single();

        console.log("Paiement", paiement)

        if (paiement) {
            //create commande record
            const { data: commande, error: commandeError } = await supabase.from('commande').insert({
                livraisonId: null,
                paiementId: paiement.id,
                userId: appContext.user.id,
                reference: `CMD-000${paiement.id}`,
                userName: appContext.user.fullname,
            }).select('*').single();

            //add plats to command
            if (commande) {

                console.log("commande", commande)

                // let platCommande: Database['public']['Tables']['plat-commande']['Row'][] = []
                const platCommandes = cartContext.cart.map(plat => {
                    return { commandeId: commande.id, platId: Number(plat.id), platName: plat.name, Qte: plat.quantity }
                })

                const { data: pc, error: pcError } = await supabase.from('plat-commande').insert(platCommandes, { count: 'exact' }).select('*')
                
                if(pc){
                    console.log("plat commande", pc)
                }
                if (pcError) {
                    console.log("pc error", pcError)
                    return;
                }
            }
            else {
                console.log("commandeError", commandeError)
                return;
            }
        }
        else {
            return;
        }


        const paymentLink = new URL("https://localfoodapp.onrender.com/pay");
        paymentLink.searchParams.append("reference", paiement.referenceInterne!);

        ToastAndroid.show("Redirection vers la page de paiement", ToastAndroid.LONG);

        //Open In Browser
        try {
            const isAvailable = await InAppBrowser.isAvailable()
            const url = paymentLink.toString()
            if (isAvailable) {
                InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: 'gray',
                    preferredControlTintColor: 'white',
                    // Android Properties
                    showTitle: true,
                    showInRecents: false,
                    toolbarColor: 'indigo',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: false,
                    forceCloseOnRedirection: true,
                })
                .then((result) => {

                    if (result.type == "cancel") {
                        ToastAndroid.show("Opération Discontinuée", ToastAndroid.SHORT);
                        //TODO: add realtime observer for payment
                    }
                });
            }
            else {
                try {
                    Linking.openURL(url);
                }
                catch (error) {
                    Alert.alert("Impossible d'ouvrir la page de paiement...");
                }
            }
        }
        catch (error) {

        }

        setIsCommandePreparing(false);
    }

    function removeFromCart(id: any) {

        const updatedCart = cartContext.cart.filter(item => item.id !== id);
        if (updatedCart.length < cartContext.cart.length) {
            const existingProduct = cartContext.cart.find(item => item.id === id);
            if (existingProduct) {
                if (existingProduct?.quantity > 1) {
                    updatedCart.push({ ...existingProduct, quantity: existingProduct.quantity - 1 });
                }
                setCartContext({ ...cartContext, cart: updatedCart });
            }
        }
    }

    return (
        <>
            <LoadingModal indicatorColor='tomato' displayMsg='Préparation de la commande' visible={isCommandePreparing} />
            <View style={styles.container}>
                {/* <View style={styles.header}>
                    <Text style={styles.headerText}>Mon Panier</Text>
                </View> */}

                <ScrollView style={styles.cartList}>
                    {cartContext.cart && cartContext.cart.length > 0 && cartContext.cart.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <Text style={styles.cartItemText}>{item.name}</Text>
                            <Text style={styles.cartItemText}>Qte: {item.quantity}</Text>
                            <Text style={styles.cartItemText}>Prix: {item.price}</Text>
                            <Text style={styles.cartItemText}>Total: {item.price * item.quantity}</Text>
                            <Button title="Supprimer" onPress={() => removeFromCart(item.id)} />
                        </View>
                    ))}
                    {
                        cartContext.cart && cartContext.cart.length <= 0 &&
                        <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', flex: 1, display: 'flex', flexDirection: 'column', marginTop: 150 }}>
                            <EvilIcons name='cart' size={90} color='darkslategray' />
                            <Text style={{ color: 'black', fontSize: 18 }}>Panier Vide</Text>
                        </View>
                    }
                </ScrollView>

                {
                    (total > 0) &&
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: <Text style={{ color: 'tomato' }}>{cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0)}</Text></Text>
                        <TouchableOpacity activeOpacity={0.75} style={{ marginHorizontal: 30, paddingVertical: 12, backgroundColor: 'black', borderRadius: 12, elevation: 5 }} onPress={orderCommand}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Commander</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    header: {
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        color: "tomato",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartList: {
        flex: 1,
        paddingHorizontal: 5,
        marginBottom: 3
    },
    cartItem: {
        color: "tomato",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cartItemText: {
        color: "black",
        fontSize: 16,
        marginBottom: 5
    },
    totalContainer: {
        borderTopWidth: 1,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: "darkslateblue"
    },
});
export default ShoppingCartScreen;