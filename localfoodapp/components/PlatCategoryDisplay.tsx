import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from "react-native";


type PlatCategoryDisplayProps = {
    imageSource?: ImageSourcePropType,
    title: string,
    onPress?: Function
}

export function PlatCategoryDisplay(props: PlatCategoryDisplayProps): React.JSX.Element {

    return (
        <TouchableOpacity onPress={() => props.onPress?.call(null)} activeOpacity={0.75} style={styles.categoryItem}>
            <Image source={props.imageSource ?? require('../assets/images/African/Okra.jpeg')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{props.title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    categoryItem: {
        width: '48%',
        marginBottom: 8,
    },
    categoryImage: {
        width: '100%',
        height: 150,
        borderRadius: 15,
    },
    categoryText: {
        color: "black",
        textAlign: 'center',
        marginTop: 8,
    }
})