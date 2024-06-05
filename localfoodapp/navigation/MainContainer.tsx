import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntIcons from 'react-native-vector-icons/AntDesign'
import MaIcons from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from '../screens/Home';
import MenuScreens from '../screens/MenuScreens';
import OrdersScreen from '../screens/ShoppingCartScreen';
import { Text, View } from 'react-native';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';

export type MainContainerParams = {
  home: undefined,
  menu: undefined,
  orders: undefined,
  shoppingCard: undefined,
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
          if (route.name == 'shoppingCard') {
            label = "Panier"
          }

          return <Text style={{ color: focused ? 'white' : 'indigo', fontSize: 12 }}>{label}</Text>
        },
        tabBarIcon: ({ focused, color, size }) => {

          color = focused ? 'white' : 'indigo';
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
          if (route.name === 'shoppingCard') {
            return <MaIcons name='shopping-cart-checkout' size={size} color={color} />
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        headerShown: false,
        tabBarBackground: () => (<View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'tomato', height: 'auto', elevation: 2 }} />)
      })}>

      <Tab.Screen name='home' component={HomeScreen} options={{ tabBarIconStyle: { marginBottom: 1 }, }} />
      <Tab.Screen name='menu' component={MenuScreens} options={{ tabBarIconStyle: { marginBottom: 1 } }} />
      <Tab.Screen name='shoppingCard' component={ShoppingCartScreen} options={{ tabBarIconStyle: { marginBottom: 1 } }} />
      <Tab.Screen name='orders' component={OrdersScreen} options={{ tabBarIconStyle: { marginBottom: 1 } }} />

    </Tab.Navigator>
  );
}
