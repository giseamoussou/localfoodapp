import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type PlatDisplayProps = {
    product: {
        id: any,
        name: string | null,
        price: number | null,
        category: string,
        image: ImageSourcePropType
    },
    addToCart: Function,
    viewDetails: Function
}

function PlatDisplat(props: PlatDisplayProps) {

    return (
        <TouchableOpacity onPress={() => props.viewDetails(props.product.id)} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>

            <Image source={props.product.image} style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }} />

            <View style={{ flex: 1 }}>

                <Text style={{ color: "black", fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{props.product.name}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>{props.product.price} Fcfa</Text>

                <View style={{ flexDirection: 'row' }}>
                    {props.product.category && (<Text style={styles.menuItemTag}>{props.product.category}</Text>)}
                </View>
            </View>

            <TouchableOpacity onPress={() => props.addToCart(props.product.id)} activeOpacity={0.6} style={{ backgroundColor: 'tomato', paddingVertical: 8, paddingHorizontal: 22, borderRadius: 20, }}>
                <MaterialComIcon name='cart-plus' color='white' size={25} />
            </TouchableOpacity>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuItemTag: {
        fontSize: 12,
        color: '#666',
        marginRight: 8,
    }
})

export default PlatDisplat;