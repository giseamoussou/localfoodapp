import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TextInput, Button, ScrollView, ImageBackground, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationParams } from '../App';
import { styles } from '../constants/Styles';

const windowHeight = Dimensions.get('window').height;

type RegistrationScreenProps = NativeStackScreenProps<StackNavigationParams, 'registration'>


const windowWidth = Dimensions.get('window').width

const RegistrationScreen = (props: RegistrationScreenProps) => {


    function goToLogin() {
        props.navigation.navigate('login')
    }

    return (
        <ScrollView>
            <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#ac6cf6', height: 'auto', width: windowWidth, paddingVertical: 25, borderBottomLeftRadius: 20, borderBottomEndRadius: 20 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}> Inscription </Text>
                    </View>

                    <View style={{ display: 'flex', flex: 1, width: '100%', paddingHorizontal: 20 }}>
                        <View style={{ marginVertical: 15, marginBottom: 25 }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, fontWeight: '500' }}>LocalFood App</Text>
                        </View>
                        <View style={{}}>
                            <View style={{}}>
                                <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Email</Text>
                                <TextInput style={[styles.inputText]} keyboardType='email-address' inputMode='email' />
                            </View>

                            <View style={{ marginTop: 25 }}>
                                <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Mot de passe</Text>
                                <TextInput style={[styles.inputText]} secureTextEntry={true} />
                            </View>

                            <View style={{ marginTop: 25 }}>
                                <TouchableOpacity activeOpacity={0.85} style={styles.primaryBtn}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>S'inscrire</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 25, }}>
                                <Text style={{ textAlign: 'center', color: 'black', marginBottom: -10 }}>Ou</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ borderColor: 'black', width: '40%', borderWidth: 1, backgroundColor: 'red' }}></View>
                                    <View style={{ borderColor: 'black', width: '40%', borderWidth: 1, backgroundColor: 'blue' }}></View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </ScrollView>
    );
};

export default RegistrationScreen;

const localStyles = StyleSheet.create({

})
