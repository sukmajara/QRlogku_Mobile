import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, TextInput, Image, Button, ImagePickerIOS, ImageBackground } from 'react-native'
import { BackButton, ChangePictureButton, ContinueButton } from '../../asset';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Auth from '../../component/auth';
import * as SecureStore from 'expo-secure-store';

const ChangeProfile = () => {

    const navigation = useNavigation();
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phonenumber, setphonenumber] = useState()
    const [image, setimage] = useState("profilepicture")

    const [error, seterror] = useState("")
    const [nameError, setnameError] = useState("")
    const [phonenumberError, setphonenumberError] = useState("")
    const [emailError, setemailError] = useState("")

    const [continuebutton, setcontinuebutton] = useState(false)



    const choosePhotoLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setimage(image.path)
        });
    }
    const dataform = async () => {
        const tokenJWT = await SecureStore.getItemAsync("token")

        fetch('http://192.168.0.10:2030/user/profile', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenJWT,
                Accept: "*/*",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                setname(result.name)
                setemail(result.email)
                setphonenumber(result.phoneNumber.toString())
            })
            .catch((error) => console.error(error))
    }
    useEffect(() => {
        const autofill = navigation.addListener("focus", () => {
            dataform();
        });
    });

    const submit = async () => {
        try {
            const tokenJWT = await SecureStore.getItemAsync("token")

            fetch('http://192.168.0.10:2030/user/changeprofile', {
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
                .then((response) => {
                    const statuscode = response.status
                    response.json()
                    if (statuscode == 200) {
                        navigation.navigate("Profile")
                    }
                    else
                    {
                        seterror("Email / Phone number already registered")
                    }
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
            <Text style={styles.pagename}> Edit Profile</Text>
            <Text style={styles.error}>{error}</Text>
            <View style={styles.form}>
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
                {/* <Text style={styles.labelchangeprofilepicture}>Change Profile Picture</Text>
                        <TouchableOpacity>
                            <ImageBackground style={styles.imagecontainer} source={{ uri: image }}>
                                <ChangePictureButton style={styles.changepicturebutton} onPress={choosePhotoLibrary} />
                            </ImageBackground>
                        </TouchableOpacity> */}
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

export default ChangeProfile

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
    labelphonenumber: {
        fontFamily: 'Arimo-Regular',
        marginTop: 30,
        fontWeight: 'bold'
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
    labelchangeprofilepicture: {
        fontFamily: 'Arimo-Regular',
        marginTop: 20,
        fontWeight: 'bold'
    },
    imagecontainer: {
        width: 95,
        height: 95,
        marginTop: 10
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
    errorcontainer: {
        alignSelf: 'center'
    }
})
