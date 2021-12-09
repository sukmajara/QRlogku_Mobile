import React from 'react'
import { StyleSheet, Text, View, title, Dimensions, ScrollView } from 'react-native'
import Auth from '../../component/auth'
import ButtonIconProfile from '../../component/ButtonIconProfile'
import HeaderProfile from '../../component/HeaderProfile'

const Profile = () => {
    return (
        <View style={styles.page}>
            <Text style={styles.pagename}>Profile</Text>
            <HeaderProfile />
            <View>
                <ButtonIconProfile title={'ChangeProfile'} />
                <ButtonIconProfile title={'ChangePassword'} />
                <ButtonIconProfile title={'Signout'} />
                {/* <ButtonIconProfile title={'ActiveDevice'} /> */}
                <Auth loadingindicator={true}/>

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
