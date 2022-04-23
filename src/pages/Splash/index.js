import React,{useEffect} from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { LogoAppsWhite, SplashBG } from '../../asset/Images'

const Splash = ({navigation}) => {

     useEffect(()=>{
         setTimeout(()=>{
             navigation.replace('Pin');
         },3000)
     },[navigation])
     
    return (
        <ImageBackground source={SplashBG} style={styles.background}>   
        <Image source={LogoAppsWhite} style={styles.logo}/>
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
    
})
