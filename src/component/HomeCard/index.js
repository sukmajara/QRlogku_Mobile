import React, { useEffect } from 'react'
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { IconFirefox, IconChrome, DeleteButton } from "../../asset";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';


const HomeCard = () => {

    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [data, setdata] = useState([])

    const [dataUser, setdataUser] = useState([])
    const [LoginDate, setloginDate] = useState([])
    // const concat = dataUser.concat(LoginDate)

    const Getinfo = async () => {
        const tokenJWT = await SecureStore.getItemAsync("token")
        fetch('http://192.168.0.9:2030/mobile/', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenJWT,
                Accept: "*/*",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result.dataUser)
                setdata(result.dataUser)
                // setdataUser(result.dataUser)
                // setloginDate(result.loginDate)
            })
            .catch((error) => console.error(error))

    }
    useEffect(() => {
        const home = navigation.addListener("focus", () => {
            getinfo();
        });

    });

    const Icon = ({ title }) => {
        if (title === 'firefox') return <IconFirefox />
        if (title === 'chrome') return <IconChrome />
        if (title === 'delete') return <DeleteButton style={styles.delete} />
        return <IconFirefox />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.application}>Application</Text>
            <FlatList
                nestedScrollEnabled={true}
                data={data}
                keyExtractor={({ data }, index) => index}
                renderItem={({ item }) => {
                    console.log(item)
                    return (
                        <View style={styles.component}>
                            <View style={styles.card}>
                                <View style={styles.cardtitle}>
                                    <CheckBox
                                        style={styles.checkbox}
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(toggleCheckBox) => setToggleCheckBox(toggleCheckBox)}
                                    />
                                    <TouchableOpacity style={styles.loginbutton} onPress={() => {
                                        navigation.navigate('ScanQRlogin', { item })
                                    }}>
                                        {/* <Icon title={'chrome'} /> */}
                                        <Text style={styles.name}>{item.clientInfo}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.deletcontainer}>
                                    <Icon title={'delete'} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.username}>{item.clientId}</Text>
                                <Text style={styles.login}>{item.loginDate}</Text>
                            </View>

                        </View>
                    )
                }}>
                <View style={styles.cardcomponent}>
                </View>
            </FlatList>
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
    error: {
        alignSelf: 'center',
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 26,
        color: 'gray',
        marginLeft: 26,
        marginTop: "30%"
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
        marginRight: 30,
        width: "100%"

    },
    loginbutton: {
        flexDirection: 'row',
    },
    deletcontainer: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 10,
    },
    card: {
        flexDirection: "row",
    },
    cardtitle: {
        marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1

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
        marginLeft: 5
    },
    delete: {
        alignSelf: 'center',
    },
    username: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 45,
        marginBottom: 10
    },
    login: {
        marginLeft: 45,
        marginBottom: 10
    }

})
