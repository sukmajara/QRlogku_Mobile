import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BackButton, CreateAccountButton, ResendButton } from "../../asset";
import { useNavigation } from '@react-navigation/native';


const OTPVerification = (props) => {
    const navigation = useNavigation();
    const [name, setname] = useState(props.route.params.name)
    const [email, setemail] = useState(props.route.params.email)
    const [phonenumber, setphonenumber] = useState(props.route.params.phonenumber)
    const [password, setpassword] = useState(props.route.params.password)


    const [verifOTPcode, setverifOTPcode] = useState(props.route.params.OTPcode)
    const [codeOTP, setcodeOTP] = useState("")
    const [codeOTPerror, setcodeOTPerror] = useState("")

    const [counter, setcounter] = useState(59);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setcounter(counter - 1)
        }, 1000);
        return () => clearInterval(timer)

    }, [counter])

    const submit = () => {
        if (codeOTP != verifOTPcode) {
            setcodeOTPerror("INVALID OTP CODE")
        } else {
            setcodeOTPerror("")
            try {
                fetch('http://192.168.0.8:2030/user/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phoneNumber: phonenumber,
                        password: password
                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        navigation.navigate('Login')
                    })
            } catch (error) {
                console.warn(error)
            }
        }
    }

    return (
        <View style={styles.page}>
            <TouchableOpacity style={styles.backbutton}>
                <BackButton onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={styles.otpverification}>Please Enter OTP verification </Text>
            <Text style={styles.codesent}>Code was Sent to
                <Text style={styles.phonenumber}> +62{phonenumber}</Text>
            </Text>
            <Text style={styles.codesent}>
                This Code Will Expire in
                <Text style={styles.veriftime}> {counter}</Text>
            </Text>
            <TextInput
                style={styles.codeOTP}
                placeholder={'Enter OTP Number'}
                secureTextEntry={true}
                keyboardType={'number-pad'}
                maxLength={6}
                onChangeText={(codeOTP) => {
                    setcodeOTP(codeOTP)
                }}
                value={codeOTP}
            />
            <Text style={styles.codeerror}>{codeOTPerror}</Text>

            <View style={styles.resendcontainer}>
                <Text> Didn't receive an OTP ?</Text>
                <ResendButton style={styles.resendbutton} />
            </View>
            <TouchableOpacity>
                <CreateAccountButton style={styles.createaccount} onPress={submit} />
            </TouchableOpacity>
        </View>

    )
}

export default OTPVerification

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
    codesent: {
        fontFamily: 'Arimo-Regular',
        fontSize: 14,
        marginLeft: 27,
    },
    phonenumber: {
        fontFamily: 'Arimo-Regular',
        fontSize: 14,
        fontWeight: 'bold'

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
        alignSelf: 'center'
    },
    resendcontainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 27

    },
    codeerror: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red',
        alignSelf: 'center'
    },
    resendbutton: {
        paddingLeft: 300
    },
    createaccount: {
        alignSelf: 'center',
        marginTop: windowHeight * 0.4,
    }


})
