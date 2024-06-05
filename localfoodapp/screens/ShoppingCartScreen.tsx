import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ShoppingCartContext } from '../contexts/Context'

function ShoppingCartScreen() {
    const { cartContext, setCartContext } = useContext(ShoppingCartContext)

    useEffect(() => {

    }, [cartContext, cartContext.cart])

    function orderCommand(){

    }

    function removeFromCart(){

    }

    return (
        <>
            <View style={{ paddingVertical: 10, flex: 1 }}>
                {cartContext.cart.map((item) => <Text key={item.id} style={{ textAlign: 'center', marginBottom: 5 }}> {item.name}, Qte: {item.quantity}, Prix: {item.price}, Total: {item.price * item.quantity} </Text>)}
            </View>
            <View style={{ marginBottom: 20, marginHorizontal: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 30, textAlign: 'center' }}>Total: {cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
                <Button title='Commander' color='black' />
            </View>
        </>
    )
}

export default ShoppingCartScreen;