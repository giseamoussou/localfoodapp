import React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';


const windowHeight = Dimensions.get('window').height

const ShowcaseScreen = () => {
    return (
        <ImageBackground source={require('../assets/bg/bg-1.jpg')} style={{ height: windowHeight, width: '100%' }}>
            <View>

            </View>
        </ImageBackground>
    );
};

export default ShowcaseScreen;

