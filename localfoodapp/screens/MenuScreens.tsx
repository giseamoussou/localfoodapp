import React, { useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainerParams } from './MainContainer';
import { globalStyles } from '../constants/Styles';
import { ShoppingCartContext } from '../contexts/Context';
import PlatDisplat from '../components/PlatDisplay';
import { Database } from '../services/supabase';
import Config from 'react-native-config';
import { supabase } from '../services/supabase-client';

type MenuScreensProps = NativeStackScreenProps<MainContainerParams, 'menu'>;


function MenuScreens(props: MenuScreensProps) {

    const { cartContext, setCartContext } = useContext(ShoppingCartContext)
    const [platsList, setPlatsList] = useState<Database['public']['Tables']['plat']['Row'][] | null>(null)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][] | null>(null)
    const [selectedCategory, setSelectedCategory] = React.useState<Database['public']['Tables']['categories']['Row'] | null>(null);

    const handleCategoryPress = (category: Database['public']['Tables']['categories']['Row']) => {
        setSelectedCategory(category);
    };


    function addToCart(plat: Database['public']['Tables']['plat']['Row'] | null) {

        if (plat) {

            ToastAndroid.show(plat.nom + " ajouté au panier", ToastAndroid.SHORT)

            if (cartContext.cart.filter((item) => item.id === plat.id).length > 0) {
                setCartContext({
                    ...cartContext,
                    cart: cartContext.cart.map((item) => {
                        if (item.id === plat.id) {
                            return {
                                id: plat.id,
                                name: plat.nom ?? "",
                                price: plat.prix ?? 0,
                                quantity: item.quantity + 1,
                            }
                        }
                        return item
                    })
                })
            }
            else {
                setCartContext({
                    ...cartContext,
                    cart: [
                        ...cartContext.cart,
                        {
                            id: plat.id,
                            name: plat.nom ?? '',
                            price: plat.prix ?? 0,
                            quantity: 1
                        }
                    ]
                })
            }
        }
    }

    function viewDetails(id: any) {
        props.navigation.getParent()?.navigate('productDetail', { id: id })
    }

    async function fetchPlats() {
        setIsRefreshing(true);

        try {

            const { data, error } = await supabase.from('plat').select('*');

            if (data) {
                setPlatsList(data)
            }

            if (error || !data) {
                props.navigation.goBack();
            }

        } catch (error) {

            Alert.alert("Erreur", "Une erreur s'est produite, Vérifiez votre connexion")
        }

        setIsRefreshing(false);
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
        await fetchPlats();
    }

    useEffect(() => {

        fetchCategories();
        fetchPlats();

    }, [])

    useEffect(() => {

        if (categories) {
            if (props.route.params.categoryId) {
                const category = categories.find((category) => category.id === props.route.params.categoryId);
                if (category) {
                    setSelectedCategory(category)
                }
            }
        }

    }, [props.route.params?.categoryId])




    return (
        <View style={{ flex: 1 }}>

            <View style={styles.container}>

                {/* Search Bar */}
                <View style={[globalStyles.searchBar, { paddingTop: 0 }]}>
                    <TextInput style={globalStyles.searchInput} placeholderTextColor="lightgray" placeholder="Rechercher un plat..." />
                    <Icon name="search" size={22} color="blue" style={{ position: 'absolute', left: 'auto', right: 25 }} />
                </View>

                <ScrollView horizontal scrollEnabled={true} automaticallyAdjustsScrollIndicatorInsets={true} bounces={true} showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                    {categories && categories.map((category) => (
                        <TouchableOpacity
                            activeOpacity={0.80}
                            key={category.id}
                            style={[styles.categoryButton, category === selectedCategory && styles.selectedCategoryButton,
                            ]}
                            onPress={() => handleCategoryPress(category)}>
                            <Text style={styles.categoryButtonText}>{category.nom}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {
                    !isRefreshing ?
                        (
                            platsList ?
                                (<FlatList style={{ marginBottom: 10 }}
                                    bounces={true} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                                    data={platsList}
                                    renderItem={({ item }) =>
                                    (
                                        <PlatDisplat addToCart={() => addToCart(item)} viewDetails={viewDetails} product={{ category: '', id: item.id, image: { uri: `${Config.SUPABASE_URL}/storage/v1/object/public/plats-images/${item.image}` }, name: item.nom, price: item.prix }} key={item.id} />
                                    )}
                                />)
                                :
                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20 }}>Aucun Plat à Afficher</Text>
                        )
                        :
                        (
                            <>
                                <ActivityIndicator color="tomato" size={40} />
                            </>
                        )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 5,
        paddingTop: 0,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    categoryContainer: {
        display: 'flex',
        marginBottom: 5,
        maxHeight: 70,
        paddingHorizontal: 0,
        paddingVertical: 5,
        height: 70
    },
    categoryButton: {
        backgroundColor: '#a855f7',
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    selectedCategoryButton: {
        backgroundColor: 'tomato',
    },
    categoryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});


export default MenuScreens;
