import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ShoppingCartContext } from '../contexts/Context'

export default function ShoppingCartScreen() {
  const { cartContext, setCartContext } = useContext(ShoppingCartContext)

  useEffect(() => {

  }, [cartContext, cartContext.cart])

  return (
    <View style={{ paddingVertical: 10 }}>
      {cartContext.cart.map((item) => <Text key={item.id} style={{ textAlign: 'center', marginBottom: 5 }}> {item.name}, Qte: {item.quantity}, Prix: {item.price}, Total: {item.price * item.quantity} </Text>)}
    </View>
  )
}