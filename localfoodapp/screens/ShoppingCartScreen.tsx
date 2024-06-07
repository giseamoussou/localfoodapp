import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid, Linking, Alert, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '../contexts/Context'
import { ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import InAppBrowser from 'react-native-inappbrowser-reborn';

function ShoppingCartScreen() {
    const { cartContext, setCartContext } = useContext(ShoppingCartContext)
    const [total, setTotal] = useState(0);

    useEffect(() => {

        setTotal(cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0));

    }, [cartContext, cartContext.cart])

    async function orderCommand() {

        const paymentLink = new URL("https://localfoodapp.onrender.com/pay").toString();

        ToastAndroid.show("Redirection vers la page de paiement", ToastAndroid.LONG);


        //Open In Browser
        try {
            const isAvailable = await InAppBrowser.isAvailable()
            const url = paymentLink
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
                            ToastAndroid.show("Opération Annulée", ToastAndroid.SHORT);
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
        //End
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
            <View style={styles.container}>
                {/* <View style={styles.header}>
                    <Text style={styles.headerText}>Mon Panier</Text>
                </View> */}

                <ScrollView style={styles.cartList}>
                    {cartContext.cart && cartContext.cart.length > 0 && cartContext.cart.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            {/* <Image source={require('../assets/images/pizza.png')} style={styles.cartIcon} /> */}
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemname}>{item.name}</Text>
                                <Text style={styles.itemPrice}>Prix: {item.price}</Text>
                            </View>

                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityContainerText}>Qte: {item.quantity}</Text>
                                <Text style={styles.cartItemText}>Total: {item.price * item.quantity}</Text>
                                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
                                    <Image source={require('../assets/images/supp.png')} style={styles.deleteIcon} />
                                </TouchableOpacity>
                            </View>



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
                        <Text style={styles.totalText}>Total: </Text>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Somme Totale</Text>
                            <Text style={{ color: 'tomato', fontSize:25 }}>{cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0)} Fcfa</Text>
                        </View>

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
        padding: 16,
        backgroundColor: '#fff',
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
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        marginBottom: 16,
        flexDirection: 'row',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkgray', // Couleur de texte foncé
        left: 170

    },

    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 80
    },

    cartItemText: {
        color: "tomato",
        fontSize: 16,
        flexDirection: "row",
        marginBottom: 5,
        fontWeight: 'bold',
        marginHorizontal: 8,
        right: 100



    },

    itemDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
    },

    itemname: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    totalContainer: {
        color:"#red",
        borderColor:"#fef",
        borderTopWidth: 9,
        borderBottomRightRadius:15,
        borderBottomLeftRadius: 15,
    },
    totalText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 55,
        color: "darkslateblue",

    },
    deleteButton: {
        marginLeft: 12,
        padding: 4,

    },
    deleteIcon: {
        width: 30,
        height: 30,

    },

    cartIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
        tintColor: '#ff5722', // Couleur orange de l'icône
    },
    quantityContainerText: {
        fontSize: 16,
        marginHorizontal: 8,
        color: "darkgray",
        right: 129
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingBottom: 60
      },
      totalLabel: {
        fontSize: 16,
        color: '#888', // Couleur de texte grise
      },
});
export default ShoppingCartScreen;