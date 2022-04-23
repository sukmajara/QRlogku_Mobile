import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { BackButton, SubmitButton, } from "../../asset";
import * as SecureStore from 'expo-secure-store';


const Pin = () => {

    const navigation = useNavigation()
    const [newPin, setnewPin] = useState("")
    const [currPin, setcurrPin] = useState("")
    const [newPinError, setnewPinError] = useState("")
    const [currPinError, setcurrPinError] = useState("")
    const [Error, setError] = useState("")
    const [continuebutton, setcontinuebutton] = useState(true);

    const submit = async () => {
        const tokenJWT = await SecureStore.getItemAsync("token")

        fetch('https://qrlogku.herokuapp.com/user/changepin', {
            // fetch('http://192.168.0.11:2030/user/profile', {
            method: 'PATCH',
            headers: {
                'Authorization': "Bearer " + tokenJWT,
                'Accept': "*/*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentUserPin: currPin,
                newUserPin: newPin
            })
        })
            .then((response) => {
                const status = response.status

                if (status == 200) {
                    navigation.navigate("Profile")
                } else if (status == 400){
                    setError("Your new PIN is same with your current PIN.")
                }
                else if (status==401){
                    setError("Wrong Pin.")
                }
            })
            .catch((error) => console.error(error))
    }

    
    return (

        <View style={styles.page}>
            <TouchableOpacity style={styles.backbutton}>
                <BackButton onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={styles.error}>{Error}</Text>
            <Text style={styles.pin}>Please Enter Current PIN </Text>
            <Text style={styles.error}>{currPinError}</Text>
            <TextInput
                style={styles.codeOTP}
                placeholder={'Enter Current PIN'}
                secureTextEntry={true}
                keyboardType={'number-pad'}
                maxLength={6}
                onChangeText={(current) => {
                    if (current.length < 6) {
                        setcurrPinError("Pin Lenght Should Be More Than 6");
                        setcontinuebutton(true)
                    }
                    else {
                        setcurrPinError("");
                        setcontinuebutton(true)
                    }
                    setcurrPin(current)
                }}
                value={currPin}
            />
            <Text style={styles.pin}>Please Enter New PIN </Text>
            <Text style={styles.error}>{newPinError}</Text>
            <TextInput
                style={styles.codeOTP}
                placeholder={'Enter New PIN'}
                secureTextEntry={true}
                keyboardType={'number-pad'}
                maxLength={6}
                onChangeText={(newp) => {
                    if (newp.length < 6) {
                        setnewPinError("Pin Lenght Should Be More Than 6");
                        setcontinuebutton(true)
                    }
                    else {
                        setnewPinError("");
                        setError("");
                        setcontinuebutton(true)
                    }
                    setnewPin(newp)
                }}
                value={newPin}
            />
            <TouchableOpacity style={styles.backbutton} onPress={submit}>
                <SubmitButton
                    style={styles.verifybutton}
                    disabled={continuebutton}
                />
            </TouchableOpacity>
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
    pin: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 20,
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