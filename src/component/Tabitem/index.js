import { useIsFocused } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {IconScan,Iconhome,IconhomeAktif,Iconprofile,IconprofileAktif, IconscanAktif} from '../../asset'
import {blue_main,second_color} from '../../utils/constant' 

const Tabitem = ({isFocused, onPress, onLongPress, label}) => {
    const Icon =()=>{
        if(label==="Home") return isFocused ? <IconhomeAktif/> : <Iconhome/>
        if(label==="Profile") return isFocused ? <IconprofileAktif/> : <Iconprofile/>
        if(label==="MenuQR") return isFocused ? <IconscanAktif/> : <IconScan/>

        return <Iconhome/>

    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon/>
            <Text style={styles.text(isFocused)}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Tabitem

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',

    },
    text: (isFocused)=> ({
        fontSize : 13,
        color : isFocused ? blue_main : second_color,
        
    })
})
