import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native"
import MaCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationParams } from "../App";
import { TouchableOpacity } from "react-native";
import React from "react";
import { styles } from '../constants/Styles'



const windowHeight = Dimensions.get('window').height;

type LoginScreenProps = NativeStackScreenProps<StackNavigationParams, 'login'>

const windowWidth = Dimensions.get('window').width

const LoginScreen = (props: LoginScreenProps) => {

    function goRegister() {
        props.navigation.navigate('registration')

    }
    function goHome() {
        props.navigation.navigate('home')
    }

    return (
        <ScrollView>
            <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#ac6cf6', height: 'auto', width: windowWidth, paddingVertical: 25, borderBottomLeftRadius: 20, borderBottomEndRadius: 20 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}> Connexion </Text>
                    </View>

                    <View style={{ display: 'flex', flex: 1, width: '100%', paddingHorizontal: 20 }}>
                        <View style={{ marginVertical: 15, marginBottom: 50 }}>
                            <Text style={{ textAlign: 'center', color: '#ff5353', fontSize: 30, fontWeight: 'bold' }}>Local <Text style={{ color: "black" }}>Food</Text>  App</Text>
                        </View>
                        <View style={{}}>
                            <View style={{}}>
                                <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Email</Text>
                                <TextInput style={[styles.inputText]} keyboardType='email-address' inputMode='email' />
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Mot de passe</Text>
                                <TextInput style={[styles.inputText]} secureTextEntry={true} />
                            </View>

                            <View style={{ marginTop: 25 }}>
                                <TouchableOpacity onPress={()=>{
                                    props.navigation.navigate('menu')
                                }} activeOpacity={0.85} style={styles.primaryBtn}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Se connecter</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 25, marginBottom: 90 }}>
                                <Text style={{ textAlign: 'center', color: 'black', marginBottom: -10 }}>Ou</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ borderColor: 'black', width: '40%', borderWidth: 1, backgroundColor: 'red' }}></View>
                                    <View style={{ borderColor: 'black', width: '40%', borderWidth: 1, backgroundColor: 'blue' }}></View>
                                </View>
                            </View>

                        </View>


                        <TouchableOpacity activeOpacity={0.50} style={styles.googleButton}>
                            <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/face.png')} />
                            <Text style={{ color: "black", fontSize: 16, fontWeight: "500", flex: 1, textAlign: "center" }}>Se connecter Via Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.googleButton}>
                            <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/google.png')} />
                            <Text style={{ color: "black", fontSize: 16, fontWeight: "500", flex: 1, textAlign: "center" }}>Se connecter Via Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: "center", marginTop: 40, }}>
                            <Text style={{ fontSize: 16, color: "#7C8080" }}>
                                Vous n'avez compte? <Text onPress={goRegister} style={{ fontSize: 16, color: "#3662AA", fontWeight: "500" }}>Inscrivez-vous?</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
        </ScrollView>
    )
}

const localstyles = StyleSheet.create({

})

export default LoginScreen
