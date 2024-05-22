import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TextInput,Image, Button, ScrollView, ImageBackground,StyleSheet, Dimensions } from 'react-native';
import { StackNavigationParams } from '../App';
import { TouchableOpacity } from "react-native";
import MaCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height;

type RegistrationScreenProps = NativeStackScreenProps<StackNavigationParams, 'registration'>

const RegistrationScreen = (props: RegistrationScreenProps) => {


    function goToLogin() {  
        props.navigation.navigate('login')
    }

    const [passwordIsVisible, setPasswordIsVisible] = React.useState<boolean>(false);
    return (
        <ScrollView>
            <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                <View style={ styles.content}>
                    <Text style={{color:"#ff5353", fontSize: 36, fontWeight: 'bold', marginBottom: 40, textAlign:"center" }}>Local Food App</Text>
                    <View style={{ marginTop: 40,  }}>
                    <Text  style={styles.title}>S'inscrire</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.icons}>
                            <MaCIcons name="account" size={22} color="#7C888D"/>
                        </View>
                        <TextInput style={styles.input} placeholder="Nom complet" placeholderTextColor="#7C888D" selectionColor="#3662AA"/>

                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.icons}>
                            <MaCIcons name="email" size={22} color="#7C888D"/>
                        </View>
                        <TextInput style={styles.input} placeholder="Email ID" placeholderTextColor="#7C888D" selectionColor="#3662AA"/>

                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.icons}>
                            <MaCIcons name="lock" size={22} color="#7C888D"/>
                        </View>
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry={passwordIsVisible} placeholderTextColor="#7C888D" selectionColor="#3662AA"/>
                        <TouchableOpacity style={styles.passwordvisibleButton} onPress={()=>setPasswordIsVisible(!passwordIsVisible)}>
                            <MaCIcons name={passwordIsVisible ? "eye-off" : "eye"} size={20} color= "#7C888D"/>
                        </TouchableOpacity>

                    </View>
                    {/* <TouchableOpacity style={styles.forgotPaswordButton}>
                        <Text style={styles.forgotPasswordButtonText}>Mot de passe oublié?</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.loginButton}>
                        <Text onPress={goToLogin} style={styles.loginButtonText}>S'inscrire</Text>
                    </TouchableOpacity>
                    <View style={styles.orContainer}>
                        <View style={styles.orLine}/>
                        <Text style={styles.orText} >QR</Text>
                        <View style={styles.orLine}/>
                    </View>
                    <TouchableOpacity style={styles.googleButton}>
                        <Image style={styles.googleLogo} source={require('../assets/images/google.png')}/>
                        <Text style={styles.googleText}>Via Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>
                            J'ai déja un compte <Text onPress={goToLogin} style={styles.registerLink}>Se connecter</Text> 
                        </Text>
                    </TouchableOpacity>

                    </View>
                    
                </View>


            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal:50,
    },
    title:{
        fontSize:30,
        fontWeight: "bold",
        marginBottom:40,
        color: "#FF5353",
        textAlign:"center"
    },
    inputContainer:{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom:20,
        position: "relative"
    },
    icons:{
        marginTop:15,
    },
    input:{
        borderBottomWidth:1.5,
        flex: 1,
        paddingBottom: 10,
        borderBottomColor:"#eee",
        fontSize: 16,
        color:"black"
    },
    passwordvisibleButton:{
        position: "absolute",
        right: 0,
    },
    forgotPaswordButton:{
        alignSelf: "flex-end",
    },
    forgotPasswordButtonText:{
        color: "#3662AA",
        fontSize: 16,
        fontWeight:"500",
    },
    loginButton:{
        backgroundColor: "#3662AA",
        padding: 14,
        borderRadius:10,
        marginTop:20,
    },
    loginButtonText:{
        color: "#fff",
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 16,
    },
    orContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginTop:20,
        marginBottom:20
    },
    orLine:{
        height:1,
        backgroundColor: "#eee",
        flex:1,
    },
    orText:{
        color: "black",
        marginRight: 10,
        marginLeft:10,
        fontSize: 14,
    },
    googleButton:{
        backgroundColor: "#F2F6F2",
        padding: 14,
        borderRadius:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    googleText:{
        color: "#4E5867",
        fontSize: 16,
        fontWeight: "500",
        textAlign:"center",
    },
    googleLogo:{
        width:20.03,
        height:20.44,
        position: "absolute",
        left:14,
    },
    registerButton:{
        alignSelf:"center",
        marginTop:40,
    },
    registerButtonText:{
        fontSize: 16,
        color:"#7C8080"
    },
    registerLink:{
        fontSize: 16,
        color:"#3662AA",
        fontWeight:"500"
    }
})


export default RegistrationScreen;
