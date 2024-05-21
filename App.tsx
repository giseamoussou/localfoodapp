/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import { useAnimatedValue } from 'react-native';

export type StackNavigationParams = {
  home: undefined,
  details: undefined,
  
}


const Stack = createNativeStackNavigator<StackNavigationParams>();

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false)


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="details" component={ProductDetails} />

      </Stack.Navigator>

    </NavigationContainer>
  )
};

export default App;
