import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { HeaderCardProfile, ProfilePicture } from "../../asset";
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/core";

const HeaderProfile = () => {

    const navigation = useNavigation();

    const [data, setData] = useState([])
    const [Loading, setLoading] = useState(true)

    const getprofile = async () => {
        const tokenJWT = await SecureStore.getItemAsync("token")
        fetch('http://192.168.0.8:2030/user/profile', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenJWT,
                Accept: "*/*",
            },
        })
            .then((response) => response.json())
            .then((result) => setData(result))
            .catch((error) => console.error(error))
    }
    useEffect(() => {
        const profile = navigation.addListener("focus", () => {
            getprofile();
        });
    });
    return (
        <ImageBackground source={HeaderCardProfile} style={styles.container}>
            <Image source={ProfilePicture} style={styles.profileimage} />
            <View style={styles.info}>
                <Text style={styles.nama}>{data.name}</Text>
                <Text style={styles.email}>{data.email}</Text>
                <Text style={styles.notelfon}>+62{data.phoneNumber}</Text>
            </View>

        </ImageBackground>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default HeaderProfile

const styles = StyleSheet.create({
    container: {
        width: 353,
        height: 180,
        padding: 20,
        marginTop: 30,
        alignSelf: 'center',
        width: 350,
        height: 180,
        flexDirection: 'row'


    },
    profileimage: {
        alignSelf: 'center',
        borderRadius: 100,
        width:120,
        height:120
    },
    info: {
        padding:20,
        alignSelf: 'center',
        alignItems: 'center',
        width:"100%",
        flexShrink: 1,
        

    },
    nama: {
        fontSize: 16,
        color: 'white',
        fontWeight:'bold',
        fontFamily: 'Arimo-Regular'
    },
    email: {
        fontSize: 16,
        color: 'white',
        fontWeight:'bold',
        fontFamily: 'Arimo-Regular'

    },
    notelfon: {
        fontSize: 16,
        color: 'white',
        fontWeight:'bold',
        fontFamily: 'Arimo-Regular'
    }
})
