import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TextInput, Button,Image, ScrollView, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationParams } from '../App';
import { styles } from '../constants/Styles';
import { supabase } from '../services/supabase-client';
import { Formik } from 'formik';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as yup from 'yup';
import { useRef } from 'react';



const windowHeight = Dimensions.get('window').height;



type RegistrationScreenProps = NativeStackScreenProps<StackNavigationParams, 'registration'>


const windowWidth = Dimensions.get('window').width

const registrationSchema = yup.object({
    fullname: yup.string().required("Nom complet requis").min(4, (v) => `Au moins ${v.min} Caractères`).max(64, (v) => `Pas plus de ${v.max} Caractères`),
    email: yup.string().required("E-mail requis").email((v) => "E-mail invalide"),
    password: yup.string().required("Mot de passe requis").min(8, (v) => `Au moins ${v.min} Caractères.`).max(32, (v) => `Pas plus de ${v.max} Caractères.`),
    tel: yup.string().required("Numéro de téléphone").min(8, (v) => `Au moins ${v.min} Caractères.`),
})

const RegistrationScreen = (props: RegistrationScreenProps) => {

    const pwfFieldRef = useRef<TextInput>()

    async function Register (userData: { fullname: string, email:string, password: string, tel: string}){
        try {

            //register user
            const { data: { session }, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: { data: { fullname: userData.fullname, isPremium: false } }
            })

            if (!error) {
                if (!session) {
                    props.navigation.replace('EmailVerificationPrompt', { email: userData.email, from: 'registration' });
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


    function goToLogin() {
        props.navigation.navigate('login')
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
                            await Register(values)
                            setSubmitting(false)
                        }}
                    >
                        {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isValid, isSubmitting }) => (
                            <View>
                                <View style={{ backgroundColor: '#ac6cf6', height: 'auto', width: windowWidth, paddingVertical: 25, borderBottomLeftRadius: 20, borderBottomEndRadius: 20 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}> Inscription </Text>
                                </View>
    
                                <View style={{ display: 'flex', flex: 1, width: '100%', paddingHorizontal: 20 }}>
                                    <View style={{ marginVertical: 15, marginBottom: 50 }}>
                                        <Text style={{ textAlign: 'center', color: '#ff5353', fontSize: 30, fontWeight: 'bold' }}>Local <Text style={{color:"black"}}>Food</Text>  App</Text>
                                    </View>
                                    <View style={{}}>
                                        <View style={{}}>
                                            <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Nom complet</Text>
                                            <TextInput 
                                                value={values.fullname}
                                                style={[styles.inputText]} 
                                                keyboardType='name-phone-pad'
                                                placeholder="Nom et Prénom"
                                                placeholderTextColor='lightgray'
                                                cursorColor='darkblue'
                                                onBlur={handleBlur('fullname')}
                                                onChangeText={handleChange('fullname')}
                                                editable={!isSubmitting}
                                            />
                                            {touched.fullname && errors.fullname ? <Text style={[Styles.error, { marginBottom: 20 }]}>{errors.fullname}</Text> : <View style={{ marginBottom: 20 }}></View>}
                                        </View>
    
                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Email</Text>
                                            <TextInput 
                                                value={values.email}
                                                style={[styles.inputText]} 
                                                placeholder="Adresse e-mail"
                                                placeholderTextColor='lightgray'
                                                keyboardType='email-address'
                                                cursorColor='darkblue' 
                                                onBlur={handleBlur('email')}
                                                onChangeText={handleChange('email')}
                                                inputMode='email' 
                                                editable={!isSubmitting}
                                            />
                                            {touched.email && errors.email ? <Text style={[Styles.error, { marginBottom: 20 }]}>{errors.email}</Text> : <View style={{ marginBottom: 20 }}></View>}
                                        </View>
    
                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Mot de passe</Text>
                                            <TextInput 
                                                value={values.password}
                                                style={[styles.inputText]} 
                                                placeholder="Mot de passe"
                                                placeholderTextColor='lightgray'
                                                cursorColor='darkblue'
                                                secureTextEntry={true} 
                                                onBlur={handleBlur('password')}
                                                onChangeText={handleChange('password')}
                                                editable={!isSubmitting}
                                            />
                                            {touched.password && errors.password ? <Text style={[Styles.error, { marginBottom: 20 }]}>{errors.password}</Text> : <View style={{ marginBottom: 20 }}></View>}
                                        </View>
    
                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{ fontWeight: '600', color: 'black', marginBottom: 2, marginStart: 3 }}>Telephone</Text>
                                            <TextInput
                                                value={values.tel} 
                                                style={[styles.inputText]} 
                                                keyboardType='number-pad'
                                                placeholder="Numéro de téléphone"
                                                placeholderTextColor='lightgray'
                                                cursorColor='darkblue'
                                                onBlur={handleBlur('tel')}
                                                onChangeText={handleChange('tel')}
                                                editable={!isSubmitting}

                                            />
                                            {touched.tel && errors.tel ? <Text style={[Styles.error, { marginBottom: 20 }]}>{errors.tel}</Text> : <View style={{ marginBottom: 20 }}></View>}
                                        </View>
    
                                        <View style={{ marginTop: 25 }}>
                                            <TouchableOpacity onPress={goToLogin} activeOpacity={0.85} style={styles.primaryBtn}>
                                                <Text style={{ color: 'white', textAlign: 'center' }}>S'inscrire</Text>
                                            </TouchableOpacity>
                                        </View>
    
                                        <View style={{ marginTop: 25, marginBottom:90 }}>
                                            <Text style={{ textAlign: 'center', color: 'black', marginBottom: -10 }}>Ou</Text>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={{ borderColor: 'black', width: '40%', borderWidth: 1, backgroundColor: 'red' }}></View>
                                                <View style={{ borderColor: 'black', width: '40%', borderWidth: 1, backgroundColor: 'blue' }}></View>
                                            </View>
                                        </View>
                                
                                    </View>
                                    <TouchableOpacity style={styles.googleButton}>
                                        <Image style={{ width:20.03,height:20.44,left:14 }} source={require('../assets/images/face.png')}/>
                                        <Text style={{color: "black", fontSize: 16,flex:1, fontWeight: "500", textAlign:"center" }}>Se connecter Via Facebook</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.googleButton}>
                                        <Image style={{ width:20.03,height:20.44,left:14}} source={require('../assets/images/google.png')}/>
                                        <Text style={{ color: "black", fontSize: 16, flex:1, fontWeight: "500", textAlign:"center"}}>Se connecter Via Google</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{alignSelf:"center", marginTop:40,}}>
                                        <Text style={{ fontSize: 16, color:"#7C8080"}}>
                                            J'ai déja un compte? <Text onPress={goToLogin} style={{ fontSize: 16, color:"#3662AA", fontWeight:"500"}}>Connectez-vous?</Text> 
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>         
                        )}
                    
                    </Formik>
                    
                </View>

            </ImageBackground>
        </ScrollView>
    );
};

export default RegistrationScreen;

const Styles = StyleSheet.create({
    error: {
        color: 'red',
    }

})
