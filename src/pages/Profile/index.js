import React from 'react'
import { StyleSheet, Text, View, title, Dimensions, ScrollView } from 'react-native'
import ButtonIconProfile from '../../component/ButtonIconProfile'
import HeaderProfile from '../../component/HeaderProfile'

const Profile = () => {
    return (
        <View style={styles.page}>
            <Text style={styles.pagename}> Profile</Text>
            <HeaderProfile />
            <View style={styles.button}>
                <ButtonIconProfile title={'ChangeProfile'} />
                <ButtonIconProfile title={'ChangePassword'} />
                <ButtonIconProfile style={styles.signout} title={'Signout'} />
                {/* <ButtonIconProfile title={'ActiveDevice'} /> */}
            </View>
        </View>
    )
}

export default Profile

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        marginLeft:windowWidth*0.07,
        marginTop: windowHeight*0.05
        
        
    },
    
  
})
