import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SplashBG, GetStartedButton } from "../../asset";
import { blue_main } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';



const GetStarted = () => {
    const navigation = useNavigation();
    return (

        <View style={styles.background}>
            <TouchableOpacity >
                <GetStartedButton style={styles.startbutton} onPress={() => navigation.navigate('Welcome')} />
            </TouchableOpacity>
        </View>

    )
}

export default GetStarted


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: blue_main
    },
    startbutton: {
        alignSelf: 'center',
        marginTop: windowHeight * 0.8

    }
})
