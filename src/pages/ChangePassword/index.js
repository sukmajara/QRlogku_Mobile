import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { BackButton, ContinueButton } from "../../asset";
import { useNavigation } from '@react-navigation/native';
import Auth from '../../component/auth';
import * as SecureStore from 'expo-secure-store';


const ChangePassword = () => {
    const navigation = useNavigation();

    const [currentpassword, setcurrentpassword] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    const [currentpassworderror, setcurrentpassworderror] = useState("")
    const [newpassworderror, setnewpassworderror] = useState("")
    const [confirmpassworderror, setconfirmpassworderror] = useState("")


    const [continuebutton, setcontinuebutton] = useState(false)

    const submit = async () => {
        if (currentpassword == "") {
            setcurrentpassworderror("Current Password Field must be filled")
        }
        if (newpassword == "") {
            setnewpassworderror("New Password Field must be filled")
        }
        if (confirmpassword == "") {
            setconfirmpassworderror("Confirm Password Field must be filled")
        }
        else {

            try {
                const tokenJWT = await SecureStore.getItemAsync("token")

                fetch('http://192.168.0.9:2030/user/changepassword', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + tokenJWT
                    },
                    body: JSON.stringify({
                        password: currentpassword,
                        newpassword: newpassword,
                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
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
            <View style={styles.pagenamecontainer}>
                <Text style={styles.pagename}>Change Password</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.labelcurrentpassword}>Current Password</Text>
                <TextInput
                    style={styles.currentpassword}
                    placeholder={'Enter Current Password'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                    onChangeText={(currentpassword) => {
                        setcurrentpassworderror("")
                        setcurrentpassword(currentpassword)
                    }}
                    value={currentpassword}
                />
                <Text style={styles.error}>{currentpassworderror}</Text>

                <Text style={styles.labelcurrentpassword}>New Password</Text>
                <TextInput
                    style={styles.newpassword}
                    placeholder={'Enter New Password'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                    onBlur={() => {
                        if (currentpassword == newpassword) {
                            setnewpassworderror('New Password can\'t be same as before')
                            setcontinuebutton(true)
                        }
                    }}
                    onChangeText={(newpassword) => {
                        if (newpassword.length < 6) {
                            setnewpassworderror('Field Passwrod must be at least 6 characters')
                            setcontinuebutton(true)
                        }
                        else {
                            setnewpassworderror("")
                            setcontinuebutton(false)
                        }
                        setnewpassword(newpassword)
                    }}
                    value={newpassword}
                />
                <Text style={styles.error}>{newpassworderror}</Text>
                <Text style={styles.labelconfirmpassword}>Confirm Password</Text>
                <TextInput
                    style={styles.confirmpassword}
                    placeholder={'Enter Confirm Password'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                    onBlur={() => {
                        if (newpassword != confirmpassword) {
                            setconfirmpassworderror('Password not match')
                            setcontinuebutton(true)
                        }
                        else {
                            setconfirmpassworderror("")
                            setcontinuebutton(false)
                        }
                    }}
                    onChangeText={(confirmpassword) => {
                        setconfirmpassword(confirmpassword)
                    }}
                    value={confirmpassword}
                />
                <Text style={styles.error}>{confirmpassworderror}</Text>
            </View>
            <ContinueButton
                style={styles.continuebutton}
                onPress={submit}
                disabled={continuebutton}
            />
            <Auth loadingindicator={true} />
        </View>
    )
}

export default ChangePassword

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    pagenamecontainer: {
        width: 200

    },
    pagename: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 32,
        color: 'black',
        paddingTop: 20,
        paddingLeft: 30
    },
    form: {
        marginTop: 8,
        marginLeft: windowWidth * 0.08,
        marginRight: windowWidth * 0.08,
        backgroundColor: 'white'
    },
    backbutton: {
        paddingTop: 20,
        paddingLeft: 20
    },
    labelcurrentpassword: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
    },
    currentpassword: {
        fontFamily: 'Arimo-Regular',
        fontSize: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    labelnewpassword: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
    },
    newpassword: {
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
        fontSize: 14,
        color: 'red',
        alignSelf: 'center'
    }


})
