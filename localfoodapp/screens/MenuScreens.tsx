import React, { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainerParams } from '../navigation/MainContainer';
import { globalStyles } from '../constants/Styles';
import { ShoppingCartContext } from '../contexts/Context';
import PlatDisplat from '../components/PlatDisplay';
import { useNavigation } from '@react-navigation/native';

type MenuScreensProps = NativeStackScreenProps<MainContainerParams, 'menu'>;


function MenuScreens(props: MenuScreensProps) {

    const stackNavigator = useNavigation()
    const categories = ['Fast Food', 'Sauces', 'Dessert', 'Boissons'];
    const { cartContext, setCartContext } = useContext(ShoppingCartContext)
    const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);

    const menuItems = [
        {
            id: '7',
            name: 'Cheese Burger',
            price: 199,
            discount: 19,
            category: 'Fast Food',
            isTrending: false,
            isChefPick: false,
            isTopSelling: true,
            image: require('../assets/images/pizza/pizza2.jpg'),
        },
        {
            id: '9',
            name: 'Cheese Burger',
            price: 199,
            discount: 19,
            category: 'Fast Food',
            isTrending: false,
            isChefPick: false,
            isTopSelling: true,
            image: require('../assets/images/African/Okra.jpeg'),
        },
        {
            id: '10',
            name: 'Sauce',
            price: 199,
            discount: 19,
            category: 'Sauces',
            isTrending: false,
            isChefPick: false,
            isTopSelling: true,
            image: require('../assets/images/African/Orak.jpeg'),
        },
        {
            id: '11',
            name: 'Sauce Crin-crin',
            price: 199,
            discount: 19,
            category: 'Sauces',
            isTrending: false,
            isChefPick: false,
            isTopSelling: true,
            image: require('../assets/images/African/Yumceetee.jpeg'),
        },
        {
            id: '4',
            name: 'Sauce Gombo',
            price: 299,
            discount: 14,
            category: 'Sauces',
            isTrending: false,
            isChefPick: true,
            isTopSelling: false,
            image: require('../assets/images/African/Okra.jpeg'),
        },
        {
            id: '5',
            name: 'Sauce Adidon',
            price: 399,
            discount: 14,
            category: 'Sauces',
            isTrending: true,
            isChefPick: false,
            isTopSelling: false,
            image: require('../assets/images/African/adidon.jpg'),
        },
        {
            id: '6',
            name: 'Bissap ',
            price: 399,
            discount: 14,
            category: 'Sauces',
            isTrending: true,
            isChefPick: false,
            isTopSelling: false,
            image: require('../assets/images/Boisssons/jus.jpg')
        },
    ];

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
    };

    function addToCart(id: any) {
        const product = menuItems.filter((item) => item.id === id)[0]

        if (product) {

            ToastAndroid.show(product.name + " ajouté au panier", ToastAndroid.SHORT)

            if (cartContext.cart.filter((item) => item.id === id).length > 0) {
                setCartContext({
                    ...cartContext,
                    cart: cartContext.cart.map((item) => {
                        if (item.id === id) {
                            return {
                                id: product.id,
                                name: product.name,
                                price: product.price,
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
                            id: product.id,
                            name: product.name,
                            price: product.price,
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

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.container}>

                {/* Search Bar */}
                <View style={[globalStyles.searchBar, { paddingTop: 0 }]}>
                    <TextInput style={globalStyles.searchInput} placeholderTextColor="lightgray" placeholder="Rechercher un plat..." />
                    <Icon name="search" size={22} color="blue" style={{ position: 'absolute', left: 'auto', right: 25 }} />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            activeOpacity={0.80}
                            key={category}
                            style={[styles.categoryButton, category === selectedCategory && styles.selectedCategoryButton,
                            ]}
                            onPress={() => handleCategoryPress(category)}>
                            <Text style={styles.categoryButtonText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <FlatList style={{ marginBottom: 10 }}
                    data={menuItems.filter((item) => item.category === selectedCategory)}
                    renderItem={({ item }) =>
                    (
                        <PlatDisplat addToCart={addToCart} viewDetails={viewDetails} product={item} key={item.id} />
                    )}
                    keyExtractor={(item) => item.id}
                />
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
        maxHeight: 60,
        paddingHorizontal: 0,
        paddingVertical: 5
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
