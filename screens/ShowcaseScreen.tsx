import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ImageBackground, Touchable, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import MaCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationParams } from '../App';
import { styles } from '../constants/Styles';
import Config from 'react-native-config';

const windowHeight = Dimensions.get('window').height

type ShowcaseScreenNavigationProps = NativeStackScreenProps<StackNavigationParams, 'showcase'>

function ShowcaseScreen(props: ShowcaseScreenNavigationProps) {

    const [isfakeLoading, setIsfakeLoading] = useState(true);

    useEffect(() => {

        const timeOut = setTimeout(() => {
            setIsfakeLoading(false)
        }, 2500)

        return () => {
            clearTimeout(timeOut)
        }
    }, [])


    function goToLogin() {
        props.navigation.navigate('login')
    }

    return (
        <ImageBackground source={require('../assets/bg/bg-3.jpg')} style={{ height: windowHeight, width: '100%' }}>
            <View style={{ backgroundColor: 'transparent', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <MaCIcons name='food-fork-drink' color="white" size={60} />
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 30, textAlign: 'center' }}>Local Food App</Text>
                <Text style={{ color: 'wheat', fontWeight: '700', fontSize: 17, textAlign: 'center' }}>Trouver les saveurs locales n'a jamais été aussi simple!</Text>

            </View>

            <View style={{ position: 'absolute', bottom: 50, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <TouchableOpacity onPress={goToLogin} activeOpacity={0.85} style={[styles.primaryBtn, { display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
                    <Image source={require('../assets/images/fried_potatoes.png')} style={{ width: 25, height: 25, marginEnd: 10 }} />
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, textAlign: 'center' }}>Commencer {Config.ENV}</Text>
                </TouchableOpacity>

                {isfakeLoading && <ActivityIndicator color='white' size={25} style={{ marginTop: 30 }} />}

            </View>

        </ImageBackground>
    );
};

export default ShowcaseScreen;

