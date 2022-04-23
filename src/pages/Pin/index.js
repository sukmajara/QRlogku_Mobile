import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { BackButton, VerifyButton, ResendButton, SubmitButton } from "../../asset";
import * as SecureStore from 'expo-secure-store';
import Auth from '../../component/auth'



const Pin = (props) => {
    const navigation = useNavigation()
    const [Pin, setPin] = useState("")
    const [Error, setError] = useState("")
    const [continuebutton, setcontinuebutton] = useState(false);
    const status = true;


    const submit = async () => {
        const tokenJWT = await SecureStore.getItemAsync("token")

        fetch('https://qrlogku.herokuapp.com/user/validatepin', {
            // fetch('http://192.168.0.11:2030/user/profile', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + tokenJWT,
                'Accept': "*/*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userPin: Pin
            })
        })
            .then((response) => {
                const status = response.status

                if (status == 200) {
                    navigation.navigate("MainApp")
                } else {
                    setError("Wrong Pin.")
                }
            })
            .catch((error) => console.error(error))
    }

    return (

        <View style={styles.page}>
            {/* <TouchableOpacity style={styles.backbutton}>
                <BackButton onPress={() => navigation.goBack()} />
            </TouchableOpacity> */}
            <Text style={styles.otpverification}>Please Enter PIN </Text>
            <Text style={styles.error}>{Error}</Text>
            <TextInput
                style={styles.codeOTP}
                placeholder={'Enter PIN'}
                secureTextEntry={true}
                keyboardType={'number-pad'}
                maxLength={6}
                onChangeText={(codeOTP) => {
                    if (codeOTP.length < 6) {
                        setError("Pin Lenght Should Be More Than 6");
                        setcontinuebutton(true)
                    }
                    else {
                        setError("");
                        setcontinuebutton(true)
                    }
                    setPin(codeOTP)
                }}
                value={Pin}
            />
            <TouchableOpacity style={styles.backbutton} onPress={submit} >
                <SubmitButton
                    style={styles.verifybutton}
                    disabled={continuebutton}
                />
            </TouchableOpacity>
            <Auth loadingindicator={true} />

        </View>
    )
}

export default Pin

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    backbutton: {
        paddingTop: 20,
        paddingLeft: 20
    },
    otpverification: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 32,
        width: 240,
        color: 'black',
        paddingTop: windowHeight * 0.014,
        marginLeft: 27,
    },
    phonenumber: {
        fontFamily: 'Arimo-Regular',
        fontSize: 14,
        marginLeft: 27,
    },
    veriftime: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red',
    },
    codeOTP: {
        fontFamily: 'Arimo-Regular',
        fontSize: 32,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    resendcontainer: {
        flexDirection: 'row',
        marginLeft: 27,
        marginTop: 20
    },
    resendbutton: {
        paddingLeft: 300
    },
    verifybutton: {
        alignSelf: 'center',
        marginTop: windowHeight * 0.4,
    },
    error: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red',
        alignSelf: 'center'
    },
    errorcontainer: {
        alignSelf: 'center'
    }
})