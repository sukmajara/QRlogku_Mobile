import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import {GradientBG} from '../../asset'
import { HeaderHome } from '../../component'
import HomeCard from '../../component/HomeCard'

const Home = () => {
    return (
            <ImageBackground source={GradientBG} style={styles.page}>
               <HeaderHome/>
               <HomeCard/>
            </ImageBackground>
    )
}

export default Home

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page : {
        flex : 1
    },
})
