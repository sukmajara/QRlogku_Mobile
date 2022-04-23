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
    const [pin, setpin] = useState("")

    const [Error, setError] = useState("")

    const [nameError, setnameError] = useState("")
    const [phonenumberError, setphonenumberError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const [confirmpasswordError, setconfirmpasswordError] = useState("")
    const [emailError, setemailError] = useState("")
    const [pinError, setpinError] = useState("")

    const [continuebutton, setcontinuebutton] = useState(false)


    const submit = () => {
        if (name == "") {
            setnameError('Field name must be filled')
        }
        else if (email == "") {
            setemailError('Field email must be filled')
        }
        else if (phonenumber == "") {
            setphonenumberError('Field Phone Number must be filled')
        }
        else if (password == "") {
            setpasswordError('Field Password must be filled')
        }
        else if (confirmpassword == "") {
            setconfirmpasswordError('Field Confirm Password must be filled')
        }
        else {
            // navigation.navigate('Pin', { name: name, email: email, password: password, phonenumber: phonenumber})
            try {
                fetch('https://qrlogku.herokuapp.com/user/register', {
                    // fetch('http://192.168.0.11:2030/user/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phoneNumber: phonenumber,
                        password: password,
                        userPin: pin
                    })
                })
                    .then((response) => {
                        const status = response.status
                        if (status == 201) {
                            navigation.navigate("MainApp")
                        }
                        else if (status == 400) {
                            setError("Password too weak")
                        }
                        else if (status == 409) {
                            setError("Email Already registered")
                        }
                        else{
                            navigation.navigate("Login")
                        }
                    })
            } catch (error) {
                console.warn(error)
            }
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
                        <Text style={styles.error}>{Error}</Text>
                        <Text style={styles.labelname}>Full Name</Text>
                        <TextInput
                            style={styles.name}
                            placeholder={'Enter Full Name'}
                            keyboardType={'default'}
                            onChangeText={(name) => {
                                if (name.length < 3) {
                                    setnameError('Field name must be at least 3 characters')
                                    setcontinuebutton(true)
                                }
                                else {
                                    setnameError("")
                                    setcontinuebutton(false)
                                }
                                setname(name)
                            }}
                            value={name}
                        />
                        <Text style={styles.error}>{nameError}</Text>

                        <Text style={styles.labelemail}>Email Address</Text>
                        <TextInput
                            style={styles.email}
                            placeholder={'Enter Email Address'}
                            keyboardType={'email-address'}
                            onChangeText={(email) => {
                                let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                                if (regex.test(email) === false) {
                                    setemailError("Email not valid")
                                    setcontinuebutton(true)
                                    setemail(email)
                                }
                                else {
                                    setemailError("")
                                    setcontinuebutton(false)
                                    setemail(email)
                                }
                            }}
                            value={email}
                        />
                        <Text style={styles.error}>{emailError}</Text>

                        <Text style={styles.labelphonenumber}>Phone Number</Text>
                        <View style={styles.phonecontainer}>
                            <Text style={styles.phonecode}>+62</Text>
                            <TextInput
                                style={styles.phonenumber}
                                placeholder={'Enter Phone Number'}
                                keyboardType={'numeric'}
                                onChangeText={(phonenumber) => {
                                    if (phonenumber.substr(0, 1) != '8') {
                                        setphonenumberError("Phone Number must be start with \"8\"")
                                        setcontinuebutton(true)
                                    }
                                    else if (phonenumber.length < 10) {
                                        setphonenumberError("Phone Number must more than 10 digit")
                                        setcontinuebutton(true)
                                    }
                                    else if (phonenumber.length > 13) {
                                        setphonenumberError("Phone Number must less than 13 Digit")
                                        setcontinuebutton(true)
                                    }
                                    else {
                                        setphonenumberError("")
                                        setcontinuebutton(false)
                                    }
                                    setphonenumber(phonenumber)

                                }}
                                value={phonenumber}
                            />
                        </View>
                        <Text style={styles.error}>{phonenumberError}</Text>

                        <Text style={styles.labelpassword}>Password</Text>
                        <TextInput
                            style={styles.password}
                            placeholder={'Enter Password'}
                            secureTextEntry={true}
                            keyboardType={'default'}
                            onChangeText={(password) => {
                                if (password.length < 6) {
                                    setpasswordError('Field Passwrod must be at least 6 characters')
                                    setcontinuebutton(true)
                                }
                                else {
                                    setpasswordError("")
                                    setcontinuebutton(false)
                                }
                                setpassword(password)
                            }}
                            value={password}
                        />
                        <Text style={styles.error}>{passwordError}</Text>

                        <Text style={styles.labelconfirmpassword}>Confirm Password</Text>
                        <TextInput
                            style={styles.confirmpassword}
                            placeholder={'Enter Confirm Password'}
                            secureTextEntry={true}
                            keyboardType={'default'}
                            onChangeText={(confirmpassword) => {
                                if (password != confirmpassword) {
                                    setconfirmpasswordError('Password not match')
                                    setcontinuebutton(true)
                                }
                                else {
                                    setconfirmpasswordError("")
                                    setcontinuebutton(false)
                                }
                                setconfirmpassword(confirmpassword)
                            }}
                            value={confirmpassword}
                        />
                        <Text style={styles.error}>{confirmpasswordError}</Text>
                        <View style = {styles.pincontainer}>

                        <Text style={styles.labelPin}>PIN</Text>
                        </View>
                        <TextInput
                            style={styles.pin}
                            placeholder={'Enter PIN'}
                            secureTextEntry={true}
                            textAlign={'center'}
                            maxLength={6}
                            keyboardType={'numeric'}
                            onChangeText={(pin) => {
                                if (pin.length<6) {
                                    setpinError('Pin Must be 6 Number')
                                    setcontinuebutton(true)
                                }
                                else {
                                    setpinError("")
                                    setcontinuebutton(false)
                                }
                                setpin(pin)
                            }}
                            value={pin}
                        />
                        <Text style={styles.error}>{pinError}</Text>
                    </View>

                    <ContinueButton
                        style={styles.continuebutton}
                        onPress={submit}
                        disabled={continuebutton}
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
    pin: {
        fontFamily: 'Arimo-Regular',
        fontSize: 25,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    labelconfirmpassword: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
    },
    labelPin: {
        fontFamily: 'Arimo-Regular',
        fontSize: 30,
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
        fontSize: 14,
        color: 'red',
        alignSelf: 'center'
    },
    pincontainer: {
        alignSelf: 'center'
    },
    errorcontainer: {
        alignSelf: 'center'
    }
})
