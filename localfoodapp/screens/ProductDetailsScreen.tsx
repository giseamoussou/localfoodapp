import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Easing, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParams } from "../App";
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { supabase } from '../services/supabase-client';
import { Database } from '../services/supabase';
import { SkeletonSimpler } from 'react-native-skeleton-simpler';
import Config from 'react-native-config';


type ProductDetailsProps = NativeStackScreenProps<StackNavigationParams, 'productDetail'>

const windowWidth = Dimensions.get('window').width;

function ProductDetailsScreen(props: ProductDetailsProps) {

    const [quantity, setQuantity] = useState(1);
    const [frenchFries, setFrenchFries] = useState(false);
    const [burger, setBurger] = useState(false);
    const [currentPlat, setCurrentPlat] = useState<Database['public']['Tables']['plat']['Row'] | null>(null)
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {

        fetchPlatDetails();

    }, [props.route.params.id,])


    async function fetchPlatDetails() {

        console.log("Plat id is " + props.route.params.id)

        try {

            const { data, error } = await supabase.from('plat').select('*').eq('id', props.route.params.id)

            if (data) {
                setCurrentPlat(data[0])
                console.log(JSON.stringify(data[0]));
            }

            if (error || !data) {
                props.navigation.goBack();
            }

        } catch (error) {

            Alert.alert("Erreur", "Une erreur s'est produite, Vérifiez votre connexion")
        }

        setIsLoadingData(false);
    }

    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: 'white' }}>

            <View style={{ backgroundColor: 'tomato', elevation: 2, height: 45, paddingHorizontal: 15, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignContent: 'center' }}>
                    <Icon name="chevron-back-circle-outline" size={25} color="white" />
                    <Text style={{ fontSize: 16, marginStart: 10, color: 'white' }}>Retour</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, backgroundColor: '#fff',}}>

                <SkeletonSimpler loading={isLoadingData}
                    layout={[
                        { width: windowWidth, height: 180, marginBottom: 35, }
                    ]}>
                    <View style={styles.platImageContainer}>
                        {
                            !isLoadingData &&
                            <Image source={{ uri: `${Config.SUPABASE_URL}/storage/v1/object/public/plats-images/${currentPlat?.image}` }} style={styles.platImage} />
                        }
                    </View>
                </SkeletonSimpler>

                <SkeletonSimpler loading={isLoadingData} containerStyle={{ flex: 1, width: 300 }}
                    layout={[
                        { width: windowWidth, height: 40, marginBottom: 10, marginHorizontal: 10 },
                        { width: windowWidth, height: 80, marginBottom: 8, marginHorizontal: 10, display: 'flex', flexDirection: 'row' }
                    ]}>

                    <View style={{ borderColor: 'lightgray', width: '100%', borderWidth: 0.5, backgroundColor: 'red', marginVertical: 10 }}></View>
                    
                    <View style={styles.detailsContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ff5353', marginTop: 8 }}>{currentPlat?.nom}</Text>
                        <Text style={styles.pizzaDescription}>{currentPlat?.description}</Text>
                    </View>

                </SkeletonSimpler>

            </ScrollView>

            {
                isLoadingData ? 
                (
                    <ActivityIndicator size={40} style={{ alignSelf: 'center', marginBottom: 25, marginTop: 5 }} color='tomato' />
                )
                :
                (
                    <View style={{ flexDirection: 'row', backgroundColor: 'floralwhite', marginTop: 15, alignContent: 'center', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, elevation: 2, borderColor: 'lightgray', paddingTop: 15, paddingBottom: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: 'white', backgroundColor: 'indigo', paddingHorizontal: 35, paddingVertical: 6, borderRadius: 10 }}>Qte: {quantity}</Text>
                        <TouchableOpacity style={{ backgroundColor: 'tomato', display: 'flex', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, marginTop: 2, }}>
                            <MaterialComIcon name="cart-plus" color='white' size={20} style={{ textAlignVertical: 'center' }} />
                            <Text style={{ color: 'white', fontSize: 15 }}> Ajouter </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>

    );
};

const styles = StyleSheet.create({
    platImageContainer: {
        alignItems: 'center',
        backgroundColor: "#fee",
        paddingVertical: 0,
        paddingHorizontal: 2,
        borderRadius: 10,
        elevation: 3
    },
    platImage: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    detailsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    pizzaDescription: {
        fontSize: 14,
        color: '#000',
        marginTop: 4,
        marginBottom: 10,
    },
});

export default ProductDetailsScreen;
