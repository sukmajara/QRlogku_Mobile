import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { LogoApps, LoginButton1, RegisterButton } from "../../asset";
import { blue_main } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';


const Welcome = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.background}>
            <Image source={LogoApps} style={styles.logo} />
            <TouchableOpacity style={styles.button} >
                <LoginButton1 style={styles.login} onPress={() => navigation.navigate('Login')} />
                <RegisterButton onPress={() => navigation.navigate('Register')} />
            </TouchableOpacity>
        </View>
    )
}

export default Welcome

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: blue_main
    },
    logo: {
        alignSelf: 'center',
        marginTop: windowHeight * 0.2
    },
    button: {
        alignSelf: 'center',
        marginTop: 150
    },
    login: {
        marginBottom: 20
    }
})
