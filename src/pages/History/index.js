import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackButton } from '../../asset';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { DeleteButton } from "../../asset";




const History = (props) => {

    const navigation = useNavigation();
    const { clientId } = props.route.params.item
    const [data, setdata] = useState([])

    const GetHistory = async () => {
        const tokenJWT = await SecureStore.getItemAsync("token")
        fetch('http://192.168.0.10:2030/mobile/history/' + clientId, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenJWT,
                Accept: "*/*",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                setdata(result.message)
            })
            .catch((error) => console.error(error))
    }
    useEffect(() => {
        const home = navigation.addListener("focus", () => {
            GetHistory();
        });
    });

    const terminate = async (id) => {
        const tokenJWT = await SecureStore.getItemAsync("token")
        try {
            fetch('http://192.168.0.10:2030/mobile/terminate', {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + tokenJWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deviceId: id
                })
            })
                .then((response) => response.json())
                .then((result) => {

                })
        } catch (error) {
            console.warn(error)
        }
    }

    const empty = () => {
        return (
            <View style={styles.emptycontainer}>
                <Text style={styles.empty}>You are not login in any website</Text>
                <Text style={styles.empty}>Please Scan QR!</Text>
            </View>
        )
    }

    const Icon = ({ title }) => {
        if (title === 'delete') return <DeleteButton style={styles.delete} />
        return <IconFirefox />
    }

    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        GetHistory();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.page}>
            <TouchableOpacity style={styles.backbutton}>
                <BackButton onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={styles.name}>History Login</Text>

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
                    console.log(item)
                    return (
                        <View style={styles.container}>
                            <View style={styles.infocontainer}>
                                <View style={styles.textcontainer}>
                                <Text style={styles.deviceId}>{item.deviceId}</Text>
                                </View>
                                <TouchableOpacity style={styles.deletcontainer} onPress={() => {
                                    terminate(item.deviceId);
                                    GetHistory();
                                }}>
                                    <View>
                                    <Icon title={'delete'} />
                                    </View>
                                </TouchableOpacity> 
                            </View>
                        </View>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}

export default History

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        flex: 1
    },
    backbutton: {
        paddingTop: 20,
        paddingLeft: 20
    },
    name: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 32,
        color: 'black',
        marginLeft: windowWidth * 0.07,
        marginTop: windowHeight * 0.03
    },
    emptycontainer: {
        marginTop: windowHeight * 0.08,
    },
    empty: {
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#CDCBCB',
        alignSelf: 'center',
    },
    infocontainer:{
        marginLeft:26,
        marginRight:26,
        marginTop:20,
        borderWidth:1,
        borderRadius:10,
        flexDirection:'row'
    },
    textcontainer:{
        margin:10,
    },
    deviceId:{
        fontFamily: 'Arimo-Regular',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
    },
    delete:{
        alignSelf: 'flex-end',
        marginRight:5
    },
    deletcontainer:{
        alignSelf:'center',
        flex:1
    }
    

})
