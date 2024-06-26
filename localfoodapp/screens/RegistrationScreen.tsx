import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationParams } from '../App';
import { globalStyles } from '../constants/Styles';
import { supabase } from '../services/supabase-client';
import LoadingModal from '../components/LoadingModal';
import { Formik } from 'formik';
import * as yup from 'yup';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width
type RegistrationScreenProps = NativeStackScreenProps<StackNavigationParams, 'registration'>

const registrationSchema = yup.object({
    fullname: yup.string().required("Nom complet requis").min(4, (v) => `Au moins ${v.min} Caractères`).max(64, (v) => `Pas plus de ${v.max} Caractères`),
    email: yup.string().required("E-mail requis").email((v) => "E-mail invalide"),
    password: yup.string().required("Mot de passe requis").min(8, (v) => `Au moins ${v.min} Caractères.`).max(32, (v) => `Pas plus de ${v.max} Caractères.`),
    tel: yup.string().required("Numéro de téléphone requis").min(8, (v) => `Au moins ${v.min} Caractères.`),
})

const RegistrationScreen = (props: RegistrationScreenProps) => {

    const [isRegistering, setIsRegistering] = useState(false);

    function goToLogin() {
        props.navigation.navigate('login')
    }


    async function Register(userData: { fullname: string, email: string, password: string, tel: string }) {

        console.log(userData)

        try {

            //register user
            const { data: { session }, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: { data: { fullname: userData.fullname, phone: userData.tel } }
            })

            if (!error) {
                if (!session) {
                    props.navigation.navigate('emailConfirmation', { email: userData.email, from: 'registration' });
                }
            }
            else {

                if (error.message.toLocaleLowerCase().includes("mail") && error.message.toLocaleLowerCase().includes("confirmation")) {
                    Alert.alert("Echec!",
                        "Nous n'avons pas été en mesure d'envoyer ton mail de vérification!",
                        [
                            { text: 'Réessayer', isPreferred: false, onPress: () => { /* TODO: Clean password field  */ }, style: 'destructive' }
                        ]
                    )
                }
                else if (error.message.toLocaleLowerCase().includes("valid") && error.message.toLocaleLowerCase().includes("password")) {
                    Alert.alert("Echec!",
                        "Assure-toi d'avoir renseigné ton mot de passe!",
                        [
                            { text: 'Compris!', isPreferred: false, onPress: () => { /* TODO: Clean password field  */ }, style: 'destructive' }
                        ]
                    )
                }
                else if (error.message.toLocaleLowerCase().includes("anonymous")) {
                    Alert.alert("Echec!",
                        "Assure-toi d'avoir renseigné ton adresse e-mail.",
                        [
                            { text: 'Compris!', isPreferred: false, onPress: () => { /* TODO: Clean password field  */ }, style: 'destructive' }
                        ]
                    )
                }
                else if (error.message.toLowerCase().includes("security") && error.message.toLowerCase().includes("seconds")) {
                    Alert.alert("Echec!",
                        "Trop de requêtes. Veuillez reessayer après 60 secondes.",
                        [
                            { text: 'Compris!', isPreferred: false, onPress: () => { /* TODO: Clean password field  */ }, style: 'destructive' }
                        ]
                    )
                }
                else {
                    Alert.alert("Echec!",
                        "Une erreur Inconnue s'est produite. Détails: " + error.message,
                        [
                            { text: 'Ok', isPreferred: false, onPress: () => { /* TODO: Clean password field  */ }, style: 'destructive' }
                        ]
                    )
                }
            }

        }
        catch (error) {
            console.debug(error);

            Alert.alert("Echec!",
                "Une erreur Inconnue s'est produite, Réessaie",
                [
                    { text: 'Ok', isPreferred: false, onPress: () => { /* TODO: Clean password field  */ }, style: 'destructive' }
                ]
            )
        }
    }

    return (
        <>
            <LoadingModal displayMsg="Veuillez patienter" indicatorColor="tomato" visible={isRegistering} key="loader" />

            <ScrollView>
                <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                    <View style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ backgroundColor: '#ac6cf6', height: 'auto', width: windowWidth, paddingVertical: 25, borderBottomLeftRadius: 20, borderBottomEndRadius: 20 }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}> Inscription </Text>
                        </View>

                        <Formik
                            initialValues={{ fullname: '', email: '', password: '', tel: '' }}
                            validateOnChange={true}
                            validateOnBlur={true}
                            validateOnMount={true}
                            initialErrors={{ fullname: "Nom requis", email: "Email Invalide", password: "Veillez renseigner votre Mot de passe", tel: "Numéro de téléphone invalide" }}
                            validationSchema={registrationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true); setIsRegistering(true)

                                await Register(values)
                                setSubmitting(false); setIsRegistering(false)
                            }}
                        >
                            {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isValid, isSubmitting }) => (
                                <ScrollView>
                                    <View style={{ display: 'flex', flex: 1, width: '100%', paddingHorizontal: 20 }}>
                                        <View style={{ marginVertical: 15, marginBottom: 50 }}>
                                            <Text style={{ textAlign: 'center', color: '#ff5353', fontSize: 30, fontWeight: 'bold', marginBottom: -20 }}>Local <Text style={{ color: "black" }}>Food</Text>  App</Text>
                                        </View>

                                        <View>
                                            <View style={{ marginBottom: 5 }}>
                                                <TextInput
                                                    value={values.fullname}
                                                    style={[globalStyles.inputText]}
                                                    keyboardType='name-phone-pad'
                                                    placeholder="Nom et Prénom"
                                                    placeholderTextColor='darkgray'
                                                    cursorColor='darkblue'
                                                    onBlur={handleBlur('fullname')}
                                                    onChangeText={handleChange('fullname')}
                                                    editable={!isSubmitting}
                                                />
                                                {touched.fullname && errors.fullname ? <Text style={globalStyles.errorLabel}>{errors.fullname}</Text> : <></>}
                                            </View>

                                            <View style={{ marginBottom: 5 }}>
                                                <TextInput
                                                    value={values.email}
                                                    style={[globalStyles.inputText]}
                                                    placeholder="Adresse e-mail"
                                                    placeholderTextColor='darkgray'
                                                    keyboardType='email-address'
                                                    cursorColor='darkblue'
                                                    onBlur={handleBlur('email')}
                                                    onChangeText={handleChange('email')}
                                                    inputMode='email'
                                                    editable={!isSubmitting}
                                                />
                                                {touched.email && errors.email ? <Text style={globalStyles.errorLabel}>{errors.email}</Text> : <></>}
                                            </View>

                                            <View style={{ marginBottom: 5 }}>
                                                <TextInput
                                                    value={values.tel}
                                                    style={[globalStyles.inputText]}
                                                    keyboardType='number-pad'
                                                    placeholder="Numéro de téléphone"
                                                    placeholderTextColor='darkgray'
                                                    cursorColor='darkblue'
                                                    onBlur={handleBlur('tel')}
                                                    onChangeText={handleChange('tel')}
                                                    editable={!isSubmitting}
                                                />
                                                {touched.tel && errors.tel ? <Text style={globalStyles.errorLabel}>{errors.tel}</Text> : <></>}
                                            </View>

                                            <View style={{ marginBottom: 5 }}>

                                                <TextInput
                                                    value={values.password}
                                                    style={[globalStyles.inputText]}
                                                    placeholder="Mot de passe"
                                                    placeholderTextColor='darkgray'
                                                    cursorColor='darkblue'
                                                    secureTextEntry={true}
                                                    onBlur={handleBlur('password')}
                                                    onChangeText={handleChange('password')}
                                                    editable={!isSubmitting}
                                                />
                                                {touched.password && errors.password ? <Text style={globalStyles.errorLabel}>{errors.password}</Text> : <></>}
                                            </View>

                                            <View style={{ marginTop: 15 }}>
                                                {/* @ts-ignore */}
                                                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85} style={globalStyles.primaryBtn}>
                                                    <Text style={{ color: 'white', textAlign: 'center' }}>S'inscrire</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ marginTop: 15, marginBottom: 40 }}>
                                                <Text style={{ textAlign: 'center', color: 'black', marginBottom: -10 }}>Ou</Text>
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View style={{ borderColor: 'black', width: '40%', borderWidth: 0.5, backgroundColor: 'red', opacity: 0.1 }}></View>
                                                    <View style={{ borderColor: 'black', width: '40%', borderWidth: 0.5, backgroundColor: 'red', opacity: 0.1 }}></View>
                                                </View>
                                            </View>
                                        </View>

                                        <TouchableOpacity style={globalStyles.oAuthButton}>
                                            <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/face.png')} />
                                            <Text style={{ color: "black", fontSize: 16, flex: 1, fontWeight: "500", textAlign: "center" }}>S'inscrire Via Facebook</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={globalStyles.oAuthButton}>
                                            <Image style={{ width: 20.03, height: 20.44, left: 14 }} source={require('../assets/images/google.png')} />
                                            <Text style={{ color: "black", fontSize: 16, flex: 1, fontWeight: "500", textAlign: "center" }}>S'inscrire Via Google</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignSelf: "center", marginTop: 1, }}>
                                            <Text style={{ fontSize: 16, color: "black" }}>
                                                J'ai déja un compte? <Text onPress={goToLogin} style={{ fontSize: 16, color: "#3662AA", fontWeight: "500" }}>Connectez-vous?</Text>
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
    );
};

export default RegistrationScreen;
