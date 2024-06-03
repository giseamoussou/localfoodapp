import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native"
import MaCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationParams } from "../App";
import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { appContextDefaultValues, localFoodAppContext } from "../contexts/Context";
import * as yup from 'yup';
import { useRef } from 'react';
import { Formik } from 'formik';

import { supabase } from '../services/supabase-client';
//import { styles } from '../constants/Styles'



const windowHeight = Dimensions.get('window').height;

type LoginScreenProps = NativeStackScreenProps<StackNavigationParams, 'login'>


const windowWidth = Dimensions.get('window').width

const registrationSchema = yup.object({
    email: yup.string().required("E-mail requis").email((v) => "E-mail invalide"),
    password: yup.string().required("Mot de passe requis").min(8, (v) => `Au moins ${v.min} Caractères.`).max(32, (v) => `Pas plus de ${v.max} Caractères.`),
})


const LoginScreen = (props: LoginScreenProps) => {

    const { appContext, setAppContext } = useContext(localFoodAppContext)


    function goRegister() {
        props.navigation.navigate('registration')

    }

    function log() {
        setAppContext({ ...appContext, isSignedIn: true })
    }

    function goMenu() {
        props.navigation.navigate('mainContainer')
    }
    function goHome() {
        props.navigation.navigate('home')
    }

    

    async function Login(userData: { email: string, password: string }) {

        console.log(userData)
       

    }


    return (
        <ScrollView>
            <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                        initialValues={{ fullname: '', email: '', password: '', tel: '' }}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validateOnMount={true}
                        initialErrors={{ fullname: "Nom requis", email: "Email Invalide", password: "Veillez renseigner votre Mot de passe", tel: "Numéro de téléphone invalide" }}
                        validationSchema={registrationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            await Login(values)
                            setSubmitting(false)
                        }}
                    >
                        {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isValid, isSubmitting }) => (

                            <View>

                                <View style={{ backgroundColor: '#ac6cf6', height: 'auto', width: windowWidth, paddingVertical: 25, borderBottomLeftRadius: 20, borderBottomEndRadius: 20 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}> Connexion </Text>
                                </View>

                                <View style={{ display: 'flex', flex: 1, width: '100%', paddingHorizontal: 20 }}>
                                    <View style={{ marginVertical: 15, marginBottom: 50 }}>
                                        <Text style={{ textAlign: 'center', color: '#ff5353', fontSize: 30, fontWeight: 'bold' }}>Local <Text style={{ color: "black" }}>Food</Text>  App</Text>
                                    </View>
                                    <View style={{}}>
                                        <View style={{}}>
                                            <TextInput 
                                                 value={values.email}
                                                placeholder="Adresse e-mail" 
                                                style={[styles.inputText]} 
                                                keyboardType='email-address' 
                                                inputMode='email'
                                                placeholderTextColor='darkgray'
                                                cursorColor='darkblue' 
                                                onBlur={handleBlur('email')}
                                                onChangeText={handleChange('email')} 
                                                editable={!isSubmitting}
                                                />
                                            {touched.email && errors.email ? <Text style={[styles.error, { marginBottom: 20 }]}>{errors.email}</Text> : <View style={{ marginBottom: 20 }}></View>}

                                        </View>

                                        <View style={{ marginTop: 5 }}>
                                            <TextInput 
                                            placeholder="Mot de passe" 
                                            placeholderTextColor={'darkgray'} 
                                            style={[styles.inputText]} 
                                            secureTextEntry={true}
                                            value={values.password}
                                            cursorColor='darkblue'
                                            onBlur={handleBlur('password')}
                                            onChangeText={handleChange('password')}
                                            editable={!isSubmitting}
                                            />
                                            {touched.password && errors.password ? <Text style={[styles.error, { marginBottom: 20 }]}>{errors.password}</Text> : <View style={{ marginBottom: 20 }}></View>}


                                        </View>

                                        <View style={{ marginTop: 25, marginBottom: 10 }}>
                                            <TouchableOpacity onPress={log} activeOpacity={0.85} style={styles.primaryBtn}>
                                                <Text onPress={handleSubmit} style={{ color: 'white', textAlign: 'center' }}>Se connecter</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ alignSelf: "flex-start", marginTop: 10, }}>
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


                                    <TouchableOpacity activeOpacity={0.50} style={styles.googleButton}>
                                        <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/face.png')} />
                                        <Text onPress={goMenu} style={{ color: "black", fontSize: 16, fontWeight: "500", flex: 1, textAlign: "center" }}>S'inscrire Via Facebook</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.googleButton}>
                                        <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/google.png')} />
                                        <Text onPress={goHome} style={{ color: "black", fontSize: 16, fontWeight: "500", flex: 1, textAlign: "center" }}>S'inscrire Via Google</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignSelf: "center", marginTop: 40, }}>
                                        <Text style={{ fontSize: 16, color: "black" }}>
                                            Vous n'avez compte? <Text onPress={goRegister} style={{ fontSize: 16, color: "#3662AA", fontWeight: "500" }}>Inscrivez-vous?</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>



                        )}



                    </Formik>


                </View>

            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: 'tomato',
        width: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2,
        marginTop: -10,

    },
    inputText: {
        borderRadius: 15,
        borderColor: 'darkgray',
        borderWidth: 1,
        width: "100%",
        height: 49,
        color: "black",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        marginBottom: 30

    },
    googleButton: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        padding: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        marginBottom: 20

    },
    error: {
        color: 'red',
    }

})

export default LoginScreen
