import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import MaComIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const CartItemDisplay = ({ item, removeFromCart }: { item: { id: any, name: string, price: number, quantity: number }, removeFromCart: (id: string) => void }) => {
    
    return (

        <TouchableOpacity activeOpacity={0.80} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 10, elevation: 1, borderRadius: 15, margin: 2 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#ca9f3f' }}>{item.name}</Text>
                <Text style={{ fontSize: 14, color: '#888' }}>Prix: {item.price}</Text>
                <Text style={{ fontSize: 14, color: '#888' }}>Qte: {item.quantity}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 0 }}>
                <Text style={{ fontSize: 16, marginHorizontal: 0, color: '#333' }}>Total: <Text style={{ color: 'tomato' }}>{item.price * item.quantity}</Text></Text>
            </View>
            <TouchableOpacity activeOpacity={0.70} style={{ marginStart: 15 }} onPress={() => removeFromCart(item.id)}>
                <MaComIcons name="cart-remove" size={30} color='crimson' />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
