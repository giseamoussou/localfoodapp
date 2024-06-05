import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntIcons from 'react-native-vector-icons/AntDesign'
import MaIcons from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from '../screens/Home';
import MenuScreens from '../screens/MenuScreens';
import OrdersScreen from '../screens/ShoppingCartScreen';

export type MainContainerParams = {
  home: undefined,
  menu: undefined,
  orders: undefined,
  shoppingCard: undefined
}

const Tab = createBottomTabNavigator<MainContainerParams>();


export default function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
          if(route.name === 'shoppingCard'){
            return <MaIcons name='shopping-cart-checkout' size={size} color={color} />
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>

      <Tab.Screen name='home' component={HomeScreen} options={{ headerShown: false, tabBarLabel: 'Acceuil', tabBarIconStyle: { marginBottom: 1 } }} />
      <Tab.Screen name='menu' component={MenuScreens} options={{ headerShown: false, tabBarLabel: 'Menu', tabBarIconStyle: { marginBottom: 1 } }} />
      <Tab.Screen name='shoppingCard' component={OrdersScreen} options={{ headerShown: false, tabBarLabel: 'Panier', tabBarIconStyle: { marginBottom: 1 } }} />
      <Tab.Screen name='orders' component={OrdersScreen} options={{ headerShown: false, tabBarLabel: 'Commandes', tabBarIconStyle: { marginBottom: 1 } }} />

    </Tab.Navigator>

  );
}