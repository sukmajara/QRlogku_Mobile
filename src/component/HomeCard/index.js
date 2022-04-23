import React, { useEffect } from 'react'
import { Dimensions, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconFirefox, IconChrome, DeleteButton } from "../../asset";
import { useState } from 'react';
import { blue_main, second_color } from '../../utils/constant'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


const HomeCard = () => {

    const navigation = useNavigation();

    const [data, setdata] = useState([])
    const [show, setshow] = useState(false)

    const [dataUser, setdataUser] = useState([])
    const [LoginDate, setloginDate] = useState([])

    const Getinfo = async () => {
        const tokenJWT = await SecureStore.getItemAsync("token")
        
        fetch('https://qrlogku.herokuapp.com/mobile/home', {
        // fetch('http://192.168.0.11:2030/mobile/home', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenJWT,
                Accept: "*/*",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                setdata(result.dataUser)
            })
            .catch((error) => console.error(error))

    }
    useEffect(() => {
        const home = navigation.addListener("focus", () => {
            Getinfo();
        });
    });

    const terminate = async (id) => {
        const tokenJWT = await SecureStore.getItemAsync("token")
        try {
            fetch('https://qrlogku.herokuapp.com/mobile/terminate', {
            // fetch('http://192.168.0.11:2030/mobile/terminate', {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + tokenJWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: id
                })
            })
                .then((response) => response.json())
                .then((result) => {

                })
        } catch (error) {
            console.warn(error)
        }
    }

    const Icon = ({ title }) => {
        if (title === 'firefox') return <IconFirefox />
        if (title === 'chrome') return <IconChrome />
        if (title === 'delete') return <DeleteButton style={styles.delete} />
        return <IconFirefox />
    }

    const empty = () => {
        return (
            <View style={styles.emptycontainer}>
                <Text style={styles.empty}>Application data not available</Text>
                <Text style={styles.empty}>Please Scan QR!</Text>
            </View>
        )
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Getinfo();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.application}>Application</Text>
            <FlatList
                nestedScrollEnabled={true}
                data={data}
                ListEmptyComponent={empty}
                keyExtractor={({ data }, index) => index}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item }) => {
                    return (
                        <View style={styles.component}>
                            <View style={styles.cardtitle}>
                                <Text style={styles.name}>{item.clientInfo}</Text>
                            </View>
                            {/* <TouchableOpacity style={styles.deletcontainer} onPress={() => {
                                    terminate(item.clientId);
                                    Getinfo();
                                }}>
                                    <View>
                                    <Icon title={'delete'} />
                                    </View>
                                </TouchableOpacity> */}

                            <Text style={styles.username}>{item.clientId}</Text>

                            <View style={styles.card}>
                                    <TouchableOpacity style={styles.loginbutton} onPress={() => {
                                        navigation.navigate('ScanQRlogin', { item })
                                    }}>
                                        <View style={styles.buttonLogin}>
                                            <Text style={styles.logintext}>Login</Text>
                                        </View>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.historybutton} onPress={() => {
                                        navigation.navigate('History', { item })
                                    }}>
                                        <View style={styles.Buttonhistory}>
                                            <Text style={styles.logintext}>History</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>

                            <Text style={styles.login}>{item.status}</Text>
                        </View>
                    )
                }}>
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
    deletcontainer: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 10,
    },
    card: {
        flexDirection: "row",
        marginLeft:26
    },
    cardtitle: {
        marginTop: 20,
        flexDirection: 'row',
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
        marginLeft: 26
    },
    delete: {
        alignSelf: 'center',
    },
    username: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 26,
        marginBottom: 10
    },
    login: {
        marginLeft: 26,
        marginBottom: 10
    },
    emptycontainer: {
        marginTop: windowHeight * 0.14
    },
    empty: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#CDCBCB',
        alignSelf: 'center',
        
    },
    loginbutton: {
        flexDirection: 'row',
    },
    historybutton: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonLogin: {
        width: 100,
        borderRadius: 10,
        backgroundColor: blue_main,
        marginBottom: 5,
    },
    Buttonhistory: {
        width: 100,
        borderRadius: 10,
        backgroundColor: blue_main,
        marginBottom: 5,
        marginLeft:100
    },
    logintext: {
        color: 'white',
        alignSelf: 'center'
    }
    
    
})
