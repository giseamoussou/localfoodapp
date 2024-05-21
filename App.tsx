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
import ShowcaseScreen from './screens/ShowcaseScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

export type StackNavigationParams = {
  home: undefined,
  login: undefined,
  registration: undefined,
  details: undefined,
  showcase: undefined,
  pinValidation: undefined,
  infos: undefined
}


const AppMainStack = createNativeStackNavigator<StackNavigationParams>();

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false)


  return (
    <NavigationContainer>
      <AppMainStack.Navigator initialRouteName='showcase' screenOptions={{ headerShown: false }}>

        <AppMainStack.Screen name="showcase" component={ShowcaseScreen} />
        <AppMainStack.Screen name="home" component={Home} />
        <AppMainStack.Screen name="login" component={LoginScreen} />
        <AppMainStack.Screen name="registration" component={RegistrationScreen} />
        <AppMainStack.Screen name="details" component={ProductDetails} />

      </AppMainStack.Navigator>

    </NavigationContainer>
  )
};

export default App;
