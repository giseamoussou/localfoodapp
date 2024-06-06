import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntIcons from 'react-native-vector-icons/AntDesign'
import MaIcons from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './Home';
import MenuScreens from './MenuScreens';
import OrdersScreen from './OrdersScreen';
import { Text, View } from 'react-native';
import ShoppingCartScreen from './ShoppingCartScreen';

export type MainContainerParams = {
    home: undefined,
    menu: { categoryId: number | undefined },
    orders: undefined,
    shoppingCart: undefined,
}

const Tab = createBottomTabNavigator<MainContainerParams>();


export default function MainContainer() {
    return (

        <Tab.Navigator initialRouteName="home"
            screenOptions={({ route }) => ({
                tabBarLabel({ focused, color, position, children }) {

                    let label = 'Tab';
                    if (route.name == 'home') {
                        label = "Acceuil"
                    }
                    if (route.name == 'menu') {
                        label = "Menu"
                    }
                    if (route.name == 'orders') {
                        label = "Commandes"
                    }
                    if (route.name == 'shoppingCart') {
                        label = "Panier"
                    }

                    return <Text style={{ color: focused ? 'white' : 'black', fontSize: 12 }}>{label}</Text>
                },
                tabBarIcon: ({ focused, color, size }) => {

                    color = focused ? 'white' : 'black';
                    let iconName = "home";

                    if (route.name === "home") {
                        return <AntIcons name="home" size={size} color={color} />
                    }
                    if (route.name === "menu") {
                        iconName = focused ? 'fast-food' : 'fast-food-outline'
                    }

                    if (route.name === "orders") {
                        iconName = focused ? 'card' : 'card-outline'
                    }
                    if (route.name === 'shoppingCart') {
                        return <MaIcons name='shopping-cart-checkout' size={size} color={color} />
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                headerShown: false,
                tabBarBackground: () => (<View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'tomato', height: 'auto', elevation: 2 }} />)
            })}>

            <Tab.Screen name='home' component={HomeScreen} options={{ tabBarIconStyle: { marginBottom: 1 }, }} />
            <Tab.Screen name='menu' component={MenuScreens} options={{ tabBarIconStyle: { marginBottom: 1 } }} />
            <Tab.Screen name='shoppingCart' component={ShoppingCartScreen} options={{ tabBarIconStyle: { marginBottom: 1 } }} />
            <Tab.Screen name='orders' component={OrdersScreen} options={{ tabBarIconStyle: { marginBottom: 1 } }} />

        </Tab.Navigator>
    );
}
