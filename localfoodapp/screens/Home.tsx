import React, { useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, ImageSourcePropType, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LocalFoodAppContext } from '../contexts/Context';
import { PlatCategoryDisplay } from '../components/PlatCategoryDisplay';
import { globalStyles } from '../constants/Styles';
import { Database } from '../services/supabase';
import { supabase } from '../services/supabase-client';
import { CategoriesUrls } from '../constants/Urls';
import { MainContainerParams } from './MainContainer';



type HomeScreenProps = NativeStackScreenProps<MainContainerParams, 'home'>

const HomeScreen = (props: HomeScreenProps) => {

    const { appContext, setAppContext } = useContext(LocalFoodAppContext)
    const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][] | null>(null)
    const [isPromoVisible, setIsPromoVisible] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);


    useEffect(() => {

        const tmout = setTimeout(() => {
            setIsPromoVisible(false);
        }, 20000);

        return () => {
            clearTimeout(tmout);
        }

    }, [])

    useEffect(() => {
        fetchCategories();
    }, [])

    function goToLogin() {
        props.navigation.navigate('login')
    }

    function getRandomImage(): ImageSourcePropType {
        const selectedNumber = Number.parseInt(Math.floor(Math.random() * CategoriesUrls.length).toString())
        return { uri: CategoriesUrls[selectedNumber] }
    }

    async function fetchCategories() {

        try {

            const { data, error } = await supabase.from('categories').select("*")

            if (error) {

            }
            if (data) {
                setCategories(data);
            }

        } catch (error) {

        }
    }

    async function onRefresh() {

        await fetchCategories();
    }

    return (
        <>
            <ScrollView bounces={true} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                <View style={styles.container}>
                    {/* Search Bar */}
                    <View style={globalStyles.searchBar}>
                        <TextInput style={globalStyles.searchInput} placeholderTextColor="lightgray" placeholder="Un plat ou une cuisine..." />
                        <Ionicons name="search" size={22} color="blue" style={{ position: 'absolute', left: 'auto', right: 25 }} />
                    </View>

                    {
                        isPromoVisible &&
                        <View style={styles.discountBanner}>
                            <Text style={styles.discountText}>Jusqu'à 20% de réduction</Text>
                            <Text style={styles.discountSubtext}>SUR VOTRE PREMIÈRE COMMANDE</Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.orderButton}>
                                <Text style={styles.orderButtonText}>Commander maintenant</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {/* Popular Categories */}
                    <View style={styles.categories}>
                        <MaterialComIcon color="gold" name="star-circle" size={25} style={{ marginTop: 1 }} />
                        <Text style={styles.categoryTitle}>Catégories Populaires </Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoryRow}>
                        {categories?.map((category) => <PlatCategoryDisplay onPress={() => { props.navigation.navigate('menu', { categoryId: category.id }) }} key={category.id} title={category.nom} imageSource={getRandomImage()} />)}
                    </View>

                    {/* Today's Special */}
                    <View style={styles.categories}>
                        <MaterialComIcon color="gold" name="star-circle" size={25} style={{ marginTop: 1 }} />
                        <Text style={styles.categoryTitle}>Spécialité d'aujourd'hui</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.specialRow}>
                        <TouchableOpacity style={styles.specialItem}>
                            <Image source={require('../assets/images/frittes/fries3.jpg')} style={styles.specialImage} />
                            <View style={styles.heartIcon}>
                                <Image source={require('../assets/images/fried_potatoes.png')} style={styles.icon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.specialItem}>
                            <Image source={require('../assets/images/ice_cream.png')} style={styles.specialImage} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {
                !appContext.isSignedIn ?
                    (
                        <View style={{ paddingVertical: 16, paddingHorizontal: 30, backgroundColor: "transparent" }}>
                            <TouchableOpacity onPress={goToLogin} activeOpacity={0.85} style={styles.primary}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }} >Se connecter</Text>
                            </TouchableOpacity>
                        </View>
                    ) :
                    (
                        <>
                        </>
                    )
            }
        </>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    icon: {
        width: 20,
        height: 20,
    },
    primary: {
        backgroundColor: 'tomato',
        width: 'auto',
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2,
        shadowColor: "green"
    },
    searchText: {
        marginLeft: 8,
        flex: 1,
    },
    discountBanner: {
        padding: 16,
        backgroundColor: '#FF6699',
        margin: 16,
        borderRadius: 8,
    },
    discountText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'darkslateblue',
    },
    discountSubtext: {
        textAlign: 'center',
        color: 'white',
    },
    orderButton: {
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 4,
        marginTop: 8,
    },
    orderButtonText: {
        color: "darkgray",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    categoryTitle: {
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
        left: -25
    },
    seeAllButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#FF6699',
    },
    seeAllButtonText: {
        color: '#FFFFFF',
    },
    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    specialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    specialItem: {
        width: '48%',
        marginBottom: 8,
    },
    specialImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        padding: 5,
        borderRadius: 50,
    },
});

export default HomeScreen;