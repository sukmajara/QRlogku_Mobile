import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BackButton } from '../../asset';
import { useNavigation } from '@react-navigation/native';

const ActiveDevice = () => {
    
    const navigation = useNavigation();

    return (
        <View style={styles.page}>
        <TouchableOpacity style={styles.backbutton}>
            <BackButton onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <Text style={styles.pagename}>Active Device</Text>
    </View>
    )
}

export default ActiveDevice

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    pagename: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 32,
        color: 'black',
        paddingTop: 20,
        paddingLeft: 30
    },
    backbutton: {
        paddingTop: 20,
        paddingLeft: 20
    }
})
