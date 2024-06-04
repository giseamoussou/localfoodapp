import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StackNavigationParams } from '../App';
import { styles } from '../constants/Styles';

type LoginScreenProps = NativeStackScreenProps<StackNavigationParams, 'emailConfirmation'>

function EmailConfirmationScreen(props: LoginScreenProps){

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Un Mail de confirmation vous a été envoyé</Text>


            <Button title='Me Connecter' color='tomato' onPress={() => props.navigation.navigate('login') } />
        </View>
    )
}

export default EmailConfirmationScreen;
