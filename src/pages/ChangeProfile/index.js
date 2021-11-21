import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, TextInput, Image, Button, ImagePickerIOS, ImageBackground } from 'react-native'
import { BackButton, ChangePictureButton, ContinueButton } from '../../asset';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const ChangeProfile = () => {

    const navigation = useNavigation();
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const [image, setimage] = useState("profilepicture")


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
    // const submit = () => {
    // }
    return (

        <SafeAreaView >
            <ScrollView>
                <View style={styles.page}>
                    <TouchableOpacity style={styles.backbutton}>
                        <BackButton onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text style={styles.pagename}> Edit Profile</Text>
                    <View style={styles.form}>
                        <Text style={styles.labelname}>Full Name</Text>
                        <TextInput
                            style={styles.name}
                            placeholder={'Enter Full Name'}
                            keyboardType={'email-address'}
                            onChangeText={(name) => {
                                setname(name)
                            }}
                            value={name}
                        />
                        <Text style={styles.labelemail}>Email Address</Text>
                        <TextInput
                            style={styles.email}
                            placeholder={'Enter Email Address'}
                            keyboardType={'default'}
                            onChangeText={(email) => {
                                setemail(email)
                            }}
                            value={email}
                        />
                        <Text style={styles.labelphonenumber}>Phone Number</Text>
                        <TextInput
                            style={styles.phonenumber}
                            placeholder={'Enter Phone Number'}
                            keyboardType={'numeric'}
                            onChangeText={(phonenumber) => {
                                setphonenumber(phonenumber)
                            }}
                            value={phonenumber}
                        />
                        <Text style={styles.labelchangeprofilepicture}>Change Profile Picture</Text>
                        <TouchableOpacity>
                            <ImageBackground style={styles.imagecontainer} source={{ uri: image }}>
                                <ChangePictureButton style={styles.changepicturebutton} onPress={choosePhotoLibrary} />
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <ContinueButton style={styles.continuebutton} onPress={() => navigation.navigate('OTP')} />
                </View>
            </ScrollView>
        </SafeAreaView>
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
    phonenumber: {
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
    }
})
