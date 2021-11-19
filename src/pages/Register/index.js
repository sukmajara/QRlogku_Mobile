import React from 'react'
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { LogoApps, ContinueButton, BackButton } from "../../asset";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


const Register = () => {
    const navigation = useNavigation();
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [continuebutton, setcontinuebutton] = useState("")
    const [inputerror, setinputerror] = useState("")

    const submit = () => {
        //triger api 
        // if (phonenumber.length > 9 && phonenumber.length < 13 && phonenumber.substr(0, 1) == '8' && !isNaN(phonenumber))
        //     setcontinuebutton(false)
        // else {
        //     setcontinuebutton(true)
        // }
        try {
            fetch('http://192.168.0.9:2030/mobile/register', {
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
                    if (name == "") {
                        setinputerror('Please check again your form')
                    } else {
                        navigation.navigate('OTPVerification', { phonenumber, OTPcode: 123456 })
                    }
                })
        } catch (error) {
            console.warn(error)
        }

    }
    return (
        <SafeAreaView >
            <ScrollView>
                <View style={styles.page}>
                    <TouchableOpacity style={styles.backbutton}>
                        <BackButton onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Image source={LogoApps} style={styles.logo} />
                    <View style={styles.form}>
                        <Text style={styles.labelname}>Full Name</Text>
                        <TextInput
                            style={styles.name}
                            placeholder={'Enter Full Name'}
                            keyboardType={'default'}
                            onChangeText={(name) => {
                                setname(name)
                            }}
                            value={name}
                        />
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
                        <Text style={styles.labelphonenumber}>Phone Number</Text>
                        <View style={styles.phonecontainer}>
                            <Text style={styles.phonecode}>+62</Text>
                            <TextInput
                                style={styles.phonenumber}
                                placeholder={'Enter Phone Number'}
                                keyboardType={'numeric'}
                                onChangeText={(phonenumber) => {
                                    setphonenumber(phonenumber)

                                }}
                                value={phonenumber}
                            />
                        </View>
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
                        <Text style={styles.labelconfirmpassword}>Confirm Password</Text>
                        <TextInput
                            style={styles.confirmpassword}
                            placeholder={'Enter Confirm Password'}
                            secureTextEntry={true}
                            keyboardType={'default'}
                            onChangeText={(confirmpassword) => {
                                setconfirmpassword(confirmpassword)
                            }}
                            value={confirmpassword}
                        />
                    </View>
                    <View style={styles.errorcontainer}>
                        <Text styles={styles.error}>{inputerror}</Text>
                    </View>
                    <ContinueButton
                        style={styles.continuebutton}
                        onPress={submit}
                    // disabled={continuebutton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register

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
    logo: {
        alignSelf: 'center',
        marginTop: windowHeight * 0.1
    },
    form: {
        marginTop: 70,
        marginLeft: windowWidth * 0.08,
        marginRight: windowWidth * 0.08,
        backgroundColor: 'white'
    },
    labelname: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
    },
    name: {
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    labelemail: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
    },
    email: {
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    phonecontainer: {
        flexDirection: 'row',
    },
    labelphonenumber: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
    },
    phonecode: {
        marginTop: 13,
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderRightColor: 'black',
    },
    phonenumber: {
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flex: 1
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
    labelconfirmpassword: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
    },
    confirmpassword: {
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    continuebutton: {
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 80
    },
    error: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'red',
        alignSelf: 'center'
    },
    errorcontainer: {
        alignSelf: 'center'
    }
})
