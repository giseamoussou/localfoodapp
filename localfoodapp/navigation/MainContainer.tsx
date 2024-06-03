import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'


import HomeScreen from '../screens/Home';
import MenuScreens from '../screens/MenuScreens';
import CardScreen from '../screens/CardScreen';
import ProductDetail from '../screens/ProductDetails';

export type MainContainerParams = {
  home: undefined,
  menu: undefined,
  card: undefined,

  

}

const Tab = createBottomTabNavigator<MainContainerParams>();


export default function MainContainer() {
  return(
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          let iconColor = "darkslategray";
          let rn = route.name;

          if (rn === "home") {
            iconName = focused ? 'home' : 'home-outline'
          }
          if (rn === "menu") {
            iconName = focused ? 'list' : 'list-outline'
          }
          
          if (rn === "card") {
            iconName = focused ? 'card' : 'card-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>

      <Tab.Screen name='home' component={HomeScreen} />
      <Tab.Screen name='card' component={CardScreen} />
      <Tab.Screen name='menu' component={MenuScreens} />

    </Tab.Navigator>
   
  );
}