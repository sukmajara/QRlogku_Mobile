import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import { HeaderCard } from '../../asset'
import { blue_main, second_color } from '../../utils/constant'
import { ProfilePicture } from "../../asset";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/core";
import { useState } from 'react';

const HeaderHome = () => {

    const navigation = useNavigation();

    const [data, setData] = useState([])

    const gethome = async () => {
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
        const home = navigation.addListener("focus", () => {
            gethome();
        });
    });

    return (
        <View >
            <ImageBackground source={HeaderCard} style={styles.container}>
                <View style={styles.headertext}>
                    <Text style={styles.welcome}>Welcome,</Text>
                    <Text style={styles.Name}>{data.name}</Text>
                </View>
                <View style={styles.headerimage}>
                    <Image source={ProfilePicture} style={styles.profileimage} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({

    container: {
        paddingLeft: 20,
        paddingTop: 10,
        marginTop: 30,
        alignSelf: 'center',
        width: 321,
        height: 156,
        flexDirection: 'row'
    },
    headertext: {
        paddingRight: 20,
        flexShrink: 1,
        width: '55%'
    },
    welcome: {
        fontSize: 32,
        color: blue_main,
        fontFamily: 'Arimo-Regular'
    },
    Name: {
        fontSize: 32,
        color: blue_main,
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold'
    },
    profileimage: {
        alignSelf: 'center',
        borderRadius: 100,
        width: 125,
        height: 125,
    },
    headerimage: {
    }
})
