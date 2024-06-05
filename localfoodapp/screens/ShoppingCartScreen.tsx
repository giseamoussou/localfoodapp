import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ShoppingCartContext } from '../contexts/Context'

export default function ShoppingCartScreen() {
    const { cartContext, setCartContext } = useContext(ShoppingCartContext)

    useEffect(() => {

    }, [cartContext, cartContext.cart])

    function orderCommand(){

        

    }

    return (
        <>
            <View style={{ paddingVertical: 10, flex: 1 }}>
                {cartContext.cart.map((item) => <Text key={item.id} style={{ textAlign: 'center', marginBottom: 5 }}> {item.name}, Qte: {item.quantity}, Prix: {item.price}, Total: {item.price * item.quantity} </Text>)}
            </View>
            <View style={{ marginBottom: 20, marginHorizontal: 30 }}>
                <Button title='Commander' color='black' />
            </View>
        </>
    )
}