import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { blue_main } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import { LoginButton1, RegisterButton } from "../../asset";


const MenuQR = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.background}>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.text}>What do you want to do ?</Text>
                <View>
                    <LoginButton1 style={styles.login} onPress={() => navigation.navigate('ScanQRlogin')} />
                    <RegisterButton onPress={() => navigation.navigate('ScanQRregister')} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MenuQR

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: blue_main
    },
    text: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        marginBottom:20
    },
    button: {
        alignSelf: 'center',
        marginVertical: windowWidth * 0.7
    },
    login: {
        marginBottom: 20
    }
})
