import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { StackNavigationParams } from "../App";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as yup from 'yup';
import { Formik } from 'formik';
import { supabase } from '../services/supabase-client';
import LoadingModal from "../components/LoadingModal";
import { globalStyles } from "../constants/Styles";



const windowHeight = Dimensions.get('window').height;

type LoginScreenProps = NativeStackScreenProps<StackNavigationParams, 'login'>


const windowWidth = Dimensions.get('window').width

const registrationSchema = yup.object({
    email: yup.string().required("E-mail requis").email((v) => "E-mail invalide"),
    password: yup.string().required("Mot de passe requis").min(8, (v) => `Au moins ${v.min} Caractères.`).max(32, (v) => `Pas plus de ${v.max} Caractères.`),
})


const LoginScreen = (props: LoginScreenProps) => {

    const [isSigningIn, setIsSigningIn] = useState(false);

    function goRegister() {
        props.navigation.navigate('registration')

    }

    function goMenu() {
        props.navigation.navigate('mainContainer')
    }

    function goHome() {
        props.navigation.navigate('home')
    }


    async function Login(userData: { email: string, password: string }) {

        try {

            //log in with correct entries
            const { error } = await supabase.auth.signInWithPassword({
                email: userData.email,
                password: userData.password,
            })

            if (error) {
                console.log(JSON.stringify(error.message))

                if (error.message.toLowerCase().includes("email not confirmed")) {
                    //redirect user to OTP confirmation
                    props.navigation.navigate('emailConfirmation', { email: userData.email, from: 'login' });
                }
                if (error.message.toLowerCase().includes("invalid login credentials")) {

                    Alert.alert("Echec!",
                        "Vos identifiants de connexions sont invalides. Veuillez réessayer!",
                        [
                            { text: 'Réessayer', isPreferred: false, onPress: () => { /* TODO: Clean password field  */ }, style: 'destructive' }
                        ]
                    )
                }
            }
            else {

                props.navigation.replace('mainContainer')

            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <LoadingModal displayMsg="Veuillez patienter" indicatorColor="tomato" visible={isSigningIn} key="loader" />

            <ScrollView>
                <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                    <View style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#ac6cf6', height: 'auto', width: windowWidth, paddingVertical: 25, borderBottomLeftRadius: 20, borderBottomEndRadius: 20 }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}> Connexion </Text>
                        </View>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validateOnChange={true}
                            validateOnBlur={true}
                            validateOnMount={true}
                            initialErrors={{ email: "Email Invalide", password: "Veillez renseigner votre Mot de passe" }}
                            validationSchema={registrationSchema}
                            onSubmit={async (values, { setSubmitting }) => {

                                setSubmitting(true); setIsSigningIn(true);
                                await Login(values)
                                setSubmitting(false); setIsSigningIn(false)

                            }}
                        >
                            {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isValid, isSubmitting }) => (

                                <ScrollView>

                                    <View style={{ display: 'flex', flex: 1, width: '100%', paddingHorizontal: 20 }}>
                                        <View style={{ marginVertical: 15, marginBottom: 50 }}>
                                            <Text style={{ textAlign: 'center', color: '#ff5353', fontSize: 30, fontWeight: 'bold' }}>Local <Text style={{ color: "black" }}>Food</Text> App</Text>
                                        </View>
                                        <View>
                                            <View style={{ marginBottom: 15 }}>
                                                <TextInput
                                                    value={values.email}
                                                    placeholder="Adresse e-mail"
                                                    style={globalStyles.inputText}
                                                    keyboardType='email-address'
                                                    inputMode='email'
                                                    placeholderTextColor='darkgray'
                                                    cursorColor='darkblue'
                                                    onBlur={handleBlur('email')}
                                                    onChangeText={handleChange('email')}
                                                    editable={!isSubmitting}
                                                />
                                                {touched.email && errors.email ? <Text style={globalStyles.errorLabel}>{errors.email}</Text> : <></>}

                                            </View>

                                            <View>
                                                <TextInput
                                                    placeholder="Mot de passe"
                                                    placeholderTextColor={'darkgray'}
                                                    style={globalStyles.inputText}
                                                    secureTextEntry={true}
                                                    value={values.password}
                                                    cursorColor='darkblue'
                                                    onBlur={handleBlur('password')}
                                                    onChangeText={handleChange('password')}
                                                    editable={!isSubmitting}
                                                />
                                                {touched.password && errors.password ? <Text style={globalStyles.errorLabel}>{errors.password}</Text> : <></>}

                                            </View>

                                            <View style={{ marginTop: 25, marginBottom: 10 }}>
                                                {/* @ts-ignore */}
                                                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85} style={globalStyles.primaryBtn}>
                                                    <Text style={{ color: 'white', textAlign: 'center' }}>Se connecter</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity disabled={isSubmitting || isSigningIn} style={{ alignSelf: "flex-start", marginTop: 10, }}>
                                                    <Text style={{ fontSize: 16, color: "#3662AA", fontWeight: "500" }}>Mot de passe oublié?</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ marginTop: 25, marginBottom: 50 }}>
                                                <Text style={{ textAlign: 'center', color: 'black', marginBottom: -10, fontFamily: 'bold' }}>Ou</Text>
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View style={{ borderColor: 'ligthgray', width: '45%', borderWidth: 0.5, backgroundColor: 'black', opacity: 0.1 }}></View>
                                                    <View style={{ borderColor: 'ligthgray', width: '45%', borderWidth: 0.5, backgroundColor: 'black', opacity: 0.1 }}></View>
                                                </View>
                                            </View>

                                        </View>

                                        <TouchableOpacity disabled={isSubmitting || isSigningIn} activeOpacity={0.50} style={globalStyles.oAuthButton}>
                                            <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/face.png')} />
                                            <Text onPress={() => { Alert.alert("Info", "Non disponible") }} style={{ color: "black", fontSize: 16, fontWeight: "500", flex: 1, textAlign: "center" }}>S'inscrire Via Facebook</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity disabled={isSubmitting || isSigningIn} style={globalStyles.oAuthButton}>
                                            <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/google.png')} />
                                            <Text onPress={() => { Alert.alert("Info", "Non disponible") }} style={{ color: "black", fontSize: 16, fontWeight: "500", flex: 1, textAlign: "center" }}>S'inscrire Via Google</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity disabled={isSubmitting || isSigningIn} style={{ alignSelf: "center", marginTop: 40, }}>
                                            <Text style={{ fontSize: 16, color: "black" }}>
                                                Vous n'avez compte? <Text onPress={goRegister} style={{ fontSize: 16, color: "#3662AA", fontWeight: "500" }}>Inscrivez-vous?</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            )}
                        </Formik>
                    </View>
                </ImageBackground>
            </ScrollView>
        </>
    )
}

export default LoginScreen
