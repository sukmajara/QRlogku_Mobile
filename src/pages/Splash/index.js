import React,{useEffect} from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { LogoApps, SplashBG } from '../../asset/Images'

const Splash = ({navigation}) => {
     useEffect(()=>{
         setTimeout(()=>{
             navigation.replace('MainApp');
         },3000)
     },[navigation])
     
    return (
        <ImageBackground source={SplashBG} style={styles.background}>   
        <Image source={LogoApps} style={styles.logo}/>
        </ImageBackground>

    )
}

export default Splash

const styles = StyleSheet.create({
    background:{
        flex: 1, 
        alignItems: 'center',
        justifyContent : 'center' 
    },
    logo:{
        width:85,
        height:25
    }
})
