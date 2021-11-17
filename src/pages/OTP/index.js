import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { BackButton,VerifyButton,ResendButton } from "../../asset";
import { useNavigation } from '@react-navigation/native';

const OTP = () => {
    const navigation = useNavigation();
    const [phonenumber, setphonenumber] = useState("")
    const [verifOTPcode, setverifOTPcode] = useState("")
    const [codeOTP, setcodeOTP] = useState("")
    const [codeOTPerror, setcodeOTPerror] = useState("")

    const [counter, setcounter] = useState(59);
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setcounter(counter - 1)
        }, 1000);
        return () => clearInterval(timer)

    }, [counter])

    return (
        <View style={styles.page}>
            <TouchableOpacity style={styles.backbutton}>
                <BackButton onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={styles.otpverification}>Please Enter OTP verification </Text>
            <Text style={styles.phonenumber}>Code was Sent to Nomor telefon</Text>
            <Text style={styles.phonenumber}>
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


            <View style={styles.resendcontainer}>
                <Text> Didn't receive an OTP ?</Text>
                <ResendButton style={styles.resendbutton} />
            </View>
            <TouchableOpacity style={styles.backbutton}>
                <VerifyButton style={styles.verifybutton} onPress={() => navigation.navigate('MainApp')} />
            </TouchableOpacity>
        </View>
    )
}

export default OTP

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
        marginTop:20
    },
    resendbutton: {
        paddingLeft: 300
    },
    verifybutton:{
        alignSelf:'center',
        marginTop: windowHeight * 0.4,
    }
})
