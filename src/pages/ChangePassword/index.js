import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { BackButton, ContinueButton } from "../../asset";
import { useNavigation } from '@react-navigation/native';


const ChangePassword = () => {
    const navigation = useNavigation();
    
    const [currentpassword, setcurrentpassword] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    const submit = async () => {
        try {
            const tokenJWT = await SecureStore.getItemAsync("token")

            fetch('http://192.168.0.11:2030/user/changepassword', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenJWT
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phoneNumber: phonenumber,
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    navigation.navigate('Profile')
                })
        } catch (error) {
            console.warn(error)
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
                        setcurrentpassword(currentpassword)
                    }}
                    value={currentpassword}
                />
                <Text style={styles.labelcurrentpassword}>New Password</Text>
                <TextInput
                    style={styles.newpassword}
                    placeholder={'Enter New Password'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                    onChangeText={(newpassword) => {
                        setnewpassword(newpassword)
                    }}
                    value={newpassword}
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
            <ContinueButton style={styles.continuebutton} onPress={submit} />
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
    }


})
