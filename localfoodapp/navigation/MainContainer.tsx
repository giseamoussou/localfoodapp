import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'


import HomeScreen from '../screens/Home';
import MenuScreens from '../screens/MenuScreens';
import CardScreen from '../screens/CardScreen';
import detail from '../screens/ProductDetails';

const homeName = 'Home';
const MenuName = 'menu';
const CardName = 'card';
const DetailName = 'details';

const Tab = createBottomTabNavigator();


export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "home";
            let iconColor = "darkslategray";
            let rn = route.name;

            if (rn == homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === DetailName) {
              iconName = focused ? 'list' : 'list-outline'
            } else if (rn === CardName) {
              iconName = focused ? 'card' : 'card-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}>

        <Tab.Screen name='homeName' component={HomeScreen} />
        <Tab.Screen name='CardName' component={CardScreen} />
        <Tab.Screen name='DetailName' component={detail} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}