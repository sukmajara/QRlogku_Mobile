import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native'
import { HeaderCardProfile } from "../../asset";
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/core";

const HeaderProfile = () => {

    const navigation = useNavigation();

    const [data, setData] = useState([])
    const [Loading, setLoading] = useState(true)

    const getprofile = async () => {

        const tokenJWT = await SecureStore.getItemAsync("token")

        fetch('https://qrlogku.herokuapp.com/user/profile', {
        // fetch('http://192.168.0.11:2030/user/profile', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenJWT,
                Accept: "*/*",
            },
        })
            .then((response) => {
                const status = response.status
                if (status == 401) {
                    navigation.navigate("Pin");
                }
                else{
                  return  response.json();
                }
            })
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
            <View style={styles.card}>
                {/* <Image source={ProfilePicture} style={styles.profileimage} /> */}
                <View style={styles.info}>
                    <Text style={styles.nama}>{data.name}</Text>
                    <Text style={styles.email}>{data.email}</Text>
                    <Text style={styles.notelfon}>+62{data.phoneNumber}</Text>
                </View>
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
    card:{
        alignSelf:'center',
        flexDirection: 'row',
        alignContent : 'center',
    },
    profileimage: {
        alignSelf: 'center',
        borderRadius: 100,
        width: 120,
        height: 120
    },
    info: {
        alignSelf: 'center',
        alignItems: 'center',
        flexShrink: 1,
        flex:1
    },
    nama: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Arimo-Regular'
    },
    email: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Arimo-Regular',

    },
    notelfon: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Arimo-Regular'
    }
})
