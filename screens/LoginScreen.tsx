import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, ImageBackground, ScrollView, Text, View } from "react-native"
import { StackNavigationParams } from "../App";


const windowHeight = Dimensions.get('window').height;

type LoginScreenProps = NativeStackScreenProps<StackNavigationParams, 'login'>

function LoginScreen(props: LoginScreenProps) {

    function goRegister(){
        props.navigation.navigate('registration')
    }
    return (
        <ScrollView>
            <ImageBackground style={{ height: windowHeight }} source={require('../assets/bg/bg-0.png')}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Login Screen</Text>

                    <Text onPress={goRegister} style={{ color: 'blue', marginTop: 15 }}>Login</Text>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

export default LoginScreen
