import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '../contexts/Context'
import { ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

function ShoppingCartScreen() {
    const { cartContext, setCartContext } = useContext(ShoppingCartContext)
    const [total, setTotal] = useState(0);

    useEffect(() => {

        setTotal(cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0));

    }, [cartContext, cartContext.cart])

    function orderCommand() {

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