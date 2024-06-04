/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import { useAnimatedValue } from 'react-native';
import ShowcaseScreen from './screens/ShowcaseScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import MenuScreens from './screens/MenuScreens';
import ContactScreens from './screens/ContactScreens';
import MainContainer from './navigation/MainContainer';
import CardScreen from './screens/CardScreen';
import { appContextDefaultValues, localFoodAppContext, ILocalFoodAppContextData } from './contexts/Context'
import { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabase-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailConfirmationScreen from './screens/EmailConfirmationScreen';

export type StackNavigationParams = {
  home: undefined,
  login: undefined,
  registration: undefined,
  showcase: undefined,
  contact: undefined,
  mainContainer: undefined,
  productDetail: { id: any }
  emailConfirmation: { email: string, from: 'login' | 'registration'  }
}


const AppMainStack = createNativeStackNavigator<StackNavigationParams>();

const App = () => {
  const [session, setSession] = useState<Session | null>(null); 

  const [appContext, setAppContext] = useState(appContextDefaultValues)

  const [ authResolved, setAuthResolved] = useState(false) 

  const defaultContext = useMemo(() => ({ appContext, setAppContext }), [appContext])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) =>{
      setSession(session)
    })
    supabase.auth.onAuthStateChange(( _event, session) =>{
      setAuthResolved(true);
      setSession(session)
    })
    checkIsFirstStart();
    //fetchSettings();
  }
)

const [ showCaseSeen, setShowCaseSeen] = useState (false)

 async function checkIsFirstStart() {
  try {
    const showCase = await AsyncStorage.getItem('showCase')

    if (showCase){
      setShowCaseSeen(true)
    }

  } catch (error) {
    setShowCaseSeen(true)
  }
}

  return (

    <localFoodAppContext.Provider value={defaultContext}>


      <NavigationContainer>

        <AppMainStack.Navigator initialRouteName={ 'showcase'} screenOptions={{ headerShown: false }}>
          {
            appContext.isSignedIn ?
              (
                <>
                  <AppMainStack.Screen name="mainContainer" component={MainContainer} />
                  <AppMainStack.Screen name="productDetail" component={ProductDetails} />
                  <AppMainStack.Screen name="contact" component={ContactScreens} />
                </>
              )
              :
              (
                <>
                  { showCaseSeen &&  <AppMainStack.Screen name="showcase" component={ShowcaseScreen} /> }
                 
                  <AppMainStack.Screen name="home" component={Home} />
                  <AppMainStack.Screen name="login" component={LoginScreen} />
                  <AppMainStack.Screen name="emailConfirmation" component={EmailConfirmationScreen} />
                  <AppMainStack.Screen name="registration" component={RegistrationScreen} />
                </>
              )
          }
        </AppMainStack.Navigator>

      </NavigationContainer>

    </localFoodAppContext.Provider>

  )
};

export default App;


