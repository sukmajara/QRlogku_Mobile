import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


const Auth = ({ loadingindicator, screen }) => {

    const navigation = useNavigation();
    const [loading, setloading] = useState(true)

    const validatesession = async () => {

        const tokenJWT = await SecureStore.getItemAsync("token")

        if (tokenJWT) {
            try {
                fetch('http://192.168.0.10:2030/user/session', {
                    headers: {
                        Authorization: 'Bearer ' + tokenJWT,
                        Accept: '*/*',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    const status = response.status
                    if (status == 200) {
                        // console.log('valid')
                        setTimeout(() => {
                            setloading(false);
                            if (screen != null) {
                                navigation.navigate(screen)
                                console.log(screen);
                            }
                        }, 3000);
                    } else {
                        navigation.navigate("Login")
                        // console.log("not valid")
                    }
                })

            } catch (error) {
                console.warn(error)
            }
        } else {
            navigation.navigate("Login")
        }
    }
    useEffect(() => {
        const validate = navigation.addListener("focus", () => {
            validatesession();
            // console.log("validate jwt")
        });
    });


    return (
        <View style={styles.view}>
            {loading ? [
                loadingindicator ? (<ActivityIndicator size="large" color="#38436C" key={1} />
                ) : null
            ] : null}
        </View>
    )
}

export default Auth

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        // backgroundColor:"white",
        width:windowWidth,
        height:windowHeight

    }
})
