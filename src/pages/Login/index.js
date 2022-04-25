import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LogoApps, LoginButton2 } from "../../asset";
import { blue_main } from '../../utils/constant'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Auth from '../../component/auth'
import * as SecureStore from 'expo-secure-store';


const Login = (props) => {
    const navigation = useNavigation();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [continuebutton, setcontinuebutton] = useState()
    const [inputerror, setinputerror] = useState("")

    const submit = async () => {
        try {
            fetch('https://qrlogku.herokuapp.com/user/login', {
                // fetch('http://192.168.0.11:2030/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (!responseJson.token) {
                        setinputerror(responseJson.message)
                    }
                    else {
                        SecureStore.setItemAsync("token", responseJson.token)
                        navigation.navigate('MainApp')
                    }
                })
        } catch (error) {
            console.warn(error)
        }

    }

    return (
        <View style={styles.page}>
            <Image source={LogoApps} style={styles.logo} />
            <View style={styles.form}>
                <Text style={styles.labelemail}>Email Address</Text>
                <TextInput
                    style={styles.email}
                    placeholder={'Enter Email Address'}
                    keyboardType={'email-address'}
                    onChangeText={(email) => {
                        setemail(email)
                    }}
                    value={email}
                />
                <Text style={styles.labelpassword}>Password</Text>
                <TextInput
                    style={styles.password}
                    placeholder={'Enter Password'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                    onChangeText={(password) => {
                        setpassword(password)
                    }}
                    value={password}
                />
            </View>
            <View style={styles.errorcontainer}>
                <Text style={styles.error} >{inputerror}</Text>
            </View>
            <View style={styles.loginbutton}>
                <TouchableOpacity >
                    <LoginButton2 onPress={submit} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.forgotpassword}>Forgot Password ?</Text>
                </TouchableOpacity>
                <View style={styles.register}>
                    <Text>New User ? </Text>
                    <TouchableOpacity>
                        <Text style={styles.createacc} onPress={() => navigation.navigate('Register')}>Create Account </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Auth loadingIndicator={false} screen={"MainApp"} />
        </View>

    )
}

export default Login

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    logo: {
        alignSelf: 'center',
        marginTop: windowHeight * 0.1
    },
    form: {
        marginLeft: windowWidth * 0.08,
        marginRight: windowWidth * 0.08,
        backgroundColor: 'white'
    },
    labelemail: {
        fontFamily: 'Arimo-Regular',
        marginTop: 70,
        fontWeight: 'bold'
    },
    email: {
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,

    },
    labelpassword: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'

    },
    password: {
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,

    },
    loginbutton: {
        alignSelf: 'center',
        marginTop: 50
    },
    forgotpassword: {
        fontFamily: 'Arimo-Regular',
        alignSelf: 'center',
        marginTop: 40
    },
    register: {
        fontFamily: 'Arimo-Regular',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 20

    },
    createacc: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        color: blue_main,
    },
    error: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'red',
        alignSelf: 'center'
    },
    errorcontainer: {
        alignSelf: 'center'
    }


})
