/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackHeaderProps } from "@react-navigation/native-stack";
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetailsScreen';
import { ActivityIndicator, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import ShowcaseScreen from './screens/ShowcaseScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ContactScreens from './screens/ContactScreens';
import MainContainer from './screens/MainContainer';
import { appContextDefaultValues, cartContextDefaultValues, LocalFoodAppContext, ShoppingCartContext } from './contexts/Context'
import { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabase-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailConfirmationScreen from './screens/EmailConfirmationScreen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Fa5Icon from 'react-native-vector-icons/FontAwesome';

export type StackNavigationParams = {
  home: undefined,
  login: undefined,
  registration: undefined,
  showcase: undefined,
  contact: undefined,
  mainContainer: undefined,
  productDetail: { id: any }
  emailConfirmation: { email: string, from: 'login' | 'registration' },
  categoryPlats: { category: string },
}


const AppMainStack = createNativeStackNavigator<StackNavigationParams>();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  const [appContext, setAppContext] = useState(appContextDefaultValues)
  const [cartContext, setCartContext] = useState(cartContextDefaultValues)

  const [authResolved, setAuthResolved] = useState(false)

  const defaultContext = useMemo(() => ({ appContext, setAppContext }), [appContext])
  const cartDefaultContext = useMemo(() => ({ cartContext, setCartContext }), [cartContext])


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthResolved(true);
      setSession(session)

      if (session?.user) {
        setAppContext({
          ...appContext,
          isSignedIn: true,
          user: {
            id: session.user.id,
            email: session.user.email,
            fullname: session.user.user_metadata.fullname,
            phone: session.user.user_metadata.phone
          }
        })
      }
    })

    checkIsFirstStart();
  }, [appContext.isSignedIn, authResolved])

  const [showCaseSeen, setShowCaseSeen] = useState(false)

  async function checkIsFirstStart() {
    try {
      const showCase = await AsyncStorage.getItem('showCase')

      if (showCase) {
        setShowCaseSeen(true)
      }

    } catch (error) {
      setShowCaseSeen(true)
    }
  }

  return (

    <ShoppingCartContext.Provider value={cartDefaultContext}>

      <LocalFoodAppContext.Provider value={defaultContext}>
        {
          authResolved ?
            (
              <NavigationContainer>
                <AppMainStack.Navigator initialRouteName='showcase'
                  screenOptions={
                    {
                      headerShown: true,
                      header: (props) => <AppMainStackHeader {...props} />
                    }
                  }
                >
                  {
                    appContext.isSignedIn ?
                      (
                        <>
                          <AppMainStack.Screen name="mainContainer" component={MainContainer} />
                          <AppMainStack.Screen name="productDetail" component={ProductDetails} options={{ headerShown: false }} />
                          <AppMainStack.Screen name="contact" component={ContactScreens} />
                        </>
                      )
                      :
                      (
                        <>
                          {showCaseSeen && <AppMainStack.Screen name="showcase" component={ShowcaseScreen} />}

                          <AppMainStack.Screen name="home" component={Home} />
                          <AppMainStack.Screen name="login" component={LoginScreen} />
                          <AppMainStack.Screen name="emailConfirmation" component={EmailConfirmationScreen} />
                          <AppMainStack.Screen name="registration" component={RegistrationScreen} />
                        </>
                      )
                  }
                </AppMainStack.Navigator>
              </NavigationContainer>

            )
            :
            (
              <ImageBackground source={require('./assets/bg/bg-3.jpg')} style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'transparent', flex: 1, flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 30 }}>
                  <ActivityIndicator color='tomato' size={40} style={{ marginBottom: 15 }} />
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontFamily: 'mono' }}>Patientez</Text>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontFamily: 'mono' }}>Nous vérifions votre Session</Text>
                </View>
              </ImageBackground>
            )
        }

      </LocalFoodAppContext.Provider>

    </ShoppingCartContext.Provider>
  )
};



function AppMainStackHeader(props: NativeStackHeaderProps) {

  const { appContext } = useContext(LocalFoodAppContext)
  const userNameLength = appContext.user.fullname?.length

  return (
    <>
      {
        appContext.isSignedIn == true ?
          (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 15, backgroundColor: 'tomato', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, elevation: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <FeatherIcon name='map-pin' color="white" size={20} /> */}
                <Text style={{ color: "floralwhite", marginLeft: 8, fontWeight: 'bold' }}>Local Food App</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'darkslateblue', padding: 5, borderRadius: 15 }}>
                {userNameLength && (userNameLength < 20) && <Text style={{ color: 'white', marginEnd: 5, textTransform: 'capitalize', }}>{appContext.user.fullname}</Text>}
                <Fa5Icon name='user-circle' size={28} color="white" />
              </TouchableOpacity>
            </View>
          )
          :
          (
            <>
            </>
          )
      }
    </>
  )
}

export default App;
