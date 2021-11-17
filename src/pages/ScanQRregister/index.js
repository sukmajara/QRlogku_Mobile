import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { TurnoffFlash, TurnonFlash, BackbuttonWhite, BackButton } from "../../asset";
import { blue_main } from "../../utils/constant";
import { RNCamera } from 'react-native-camera';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ScanQRregister = () => {
    const navigation = useNavigation();

    const [onread, setonread] = useState(true)
    const [data, setdata] = useState([])
    const [iconflash, seticonflash] = useState(false)
    const [backbutton, setbackbutton] = useState(false)
    const [TokenJWT, setTokenJWT] = useState("")

    const BackbuttonIcon = () => {
        if (iconflash == true) {
            return <BackbuttonWhite />
        }
        else { return <BackButton /> }
    }

    const Icon = () => {
        if (iconflash == true) {
            return <TurnonFlash />
        }
        else { return <TurnoffFlash /> }
    }

    const valTokenJWT = async () => {
        const JWT = await SecureStore.getItemAsync("token")
        setTokenJWT(JWT)
    }

    const scanqr = (qr) => {
        if (onread) {
            setonread(false);
            checkid(qr.data);
        }
    }

    const checkid = (id) => {
        try {
            fetch('http://192.168.0.9:2030/mobile/register', {
                method: 'POST',
                Headers: {
                    Authorization: "Bearer " + TokenJWT,
                },
                body: JSON.stringify({
                    auth: id
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // setdata(responseJson);
                    console.log(responseJson)
                })
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onBarCodeRead={(qr) => {scanqr(qr)}}>

                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <BackbuttonIcon styles={styles.backbutton} onPress={() => {
                                setbackbutton(!backbutton)
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flash} onPress={() => seticonflash(!iconflash)}>
                            <Icon />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.scan}>{data}</Text>
                        <Text style={styles.scan}>Scan QR to Register</Text>
                    </View>
                </RNCamera>
            </View>
        </View>
    )
}


export default ScanQRregister

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },

    flash: {
        marginLeft: windowWidth * 0.7,
    },

    container: {
        width: '100%',
        height: '100%',

    },
    preview: {
        width: '100%',
        height: '100%',
    },
    card: {
        backgroundColor: blue_main,
        alignSelf: 'center',
        width: windowWidth,
        height: 200,
        borderRadius: 10,
        marginTop: windowWidth * 1.3
    },
    scan: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 15,
        fontSize: 24
    },
    backbutton: {
    },
    button: {
        flexDirection: 'row',
        marginTop: windowHeight * 0.03,
        marginLeft: windowHeight * 0.02,
    }
})