import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { GradientBG } from '../../asset'
import { HeaderHome } from '../../component'
import Auth from '../../component/auth'
import HomeCard from '../../component/HomeCard'

const Home = () => {
    return (
        <ImageBackground source={GradientBG} style={styles.page}>
            <HeaderHome />
            <HomeCard />
            <View style={styles.loading}>
                <Auth loadingindicator={true}/>
            </View>
        </ImageBackground>
    )
}

export default Home

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    loading: {
        justifyContent: "center",
        position: "absolute",
    }
})
