import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TextInput, Button, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { StackNavigationParams } from '../App';

const windowHeight = Dimensions.get('window').height;

type RegistrationScreenProps = NativeStackScreenProps<StackNavigationParams, 'registration'>

const RegistrationScreen = (props: RegistrationScreenProps) => {


    function goToLogin() {  
        props.navigation.navigate('login')
    }

    return (
        <ScrollView>
            <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Registration Screen</Text>

                    <Text onPress={goToLogin} style={{ color: 'blue', marginTop: 15 }}>Login</Text>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default RegistrationScreen;
