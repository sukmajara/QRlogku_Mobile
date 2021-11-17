import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActiveDeviceButton, ChangeProfileButton, ChangePasswordButton } from "../../asset";
import { useNavigation } from '@react-navigation/native';



const ButtonIconProfile = ({title}) => {

    const navigation = useNavigation();
    const Icon = () => {
        if (title === "ChangeProfile") return <ChangeProfileButton style={styles.button} onPress={()=> navigation.navigate('ChangeProfile')} />
        if (title === "ChangePassword") return <ChangePasswordButton style={styles.button} onPress={()=> navigation.navigate('ChangePassword')}/>
        if (title === "ActiveDevice") return <ActiveDeviceButton style={styles.button} onPress={()=> navigation.navigate('ActiveDevice')}/>
        return <ChangeProfileButton/>
    }
    
    return (
        <View>
            <TouchableOpacity>
            <Icon style={styles.button}/>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonIconProfile

const styles = StyleSheet.create({
    button :{
        padding:40
    },
})
