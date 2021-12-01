import React from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { IconFirefox, IconChrome, DeleteButton } from "../../asset";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeCard = () => {

    const navigation = useNavigation();

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const Icon = ({ title }) => {
        if (title === 'firefox') return <IconFirefox />
        if (title === 'chrome') return <IconChrome />
        if (title === 'delete') return <DeleteButton style={styles.delete} />

        return <IconFirefox />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.application}>Application</Text>
            <SafeAreaView style={styles.scrollarea}>
                <ScrollView style={styles.scrollarea}>
                    <View style={styles.cardcomponent}>
                        <View style={styles.component}>
                            <View style={styles.cardtitle}>
                                <CheckBox
                                    style={styles.checkbox}
                                    disabled={false}
                                    value={toggleCheckBox}
                                    onValueChange={(toggleCheckBox) => setToggleCheckBox(toggleCheckBox)}
                                />
                                <TouchableOpacity style={styles.loginbutton} onPress={() => {
                                    navigation.navigate("ScanQRlogin")
                                }}>
                                    <Icon title={'chrome'} />
                                    <Text style={styles.name}>PT.Lorem Ipsum</Text>
                                </TouchableOpacity>
                                <Icon title={'delete'} />
                            </View>
                            <View>
                                <Text style={styles.login}>Login On Tanggal</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View >
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default HomeCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 28,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        height: windowHeight * 0.49,
        width: windowWidth * 0.95,
        alignSelf: 'center'
    },
    application: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 26,
        color: 'black',
        marginLeft: 26,
        marginTop: 10
    },
    scrollarea: {
        flex: 1
    },
    cardcomponent: {
        marginLeft: 30,
        flex: 1
    },
    component: {
        borderBottomWidth: 1,
        marginRight: 30
    },
    loginbutton: {
        flexDirection: 'row',
    },
    cardtitle: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%'
    },
    checkbox: {
        marginRight: 5,
        alignSelf: 'center'

    },
    name: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
        marginLeft: 10
    },
    delete: {
        alignSelf: 'center',
        marginLeft: 25
    },
    login: {
        marginLeft: 90,
        marginBottom: 10
    }

})
