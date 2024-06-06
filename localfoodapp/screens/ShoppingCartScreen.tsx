import { View, Text, Button, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ShoppingCartContext } from '../contexts/Context'
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

function ShoppingCartScreen() {
    const { cartContext, setCartContext } = useContext(ShoppingCartContext)

    useEffect(() => {

    }, [cartContext, cartContext.cart])

    function orderCommand() {

    }

    function removeFromCart() {

    }

    return (
        <>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Mon Panier</Text>
                </View>

                <View style={styles.cartList}>
                    {cartContext.cart.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
    
                            <Text style={styles.cartItemText}>{item.name}</Text>
                            <Text style={styles.cartItemText}>Qte: {item.quantity}</Text>
                            <Text style={styles.cartItemText}>Prix: {item.price}</Text>
                            <Text style={styles.cartItemText}>Total: {item.price * item.quantity}</Text>
                            <Button title="Supprimer" onPress={() => removeFromCart(item.id)} />
                        </View>
                    ))}
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: {cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
                    <Button title="Commander" onPress={orderCommand} />
                </View>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {

        padding: 10,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        color: "tomato",
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartList: {
        flex: 1,
        padding: 10,
    },
    cartItemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
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
        marginBottom: 5,
    },
    totalContainer: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: "tomato"
    },
});
export default ShoppingCartScreen;