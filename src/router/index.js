import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    Home, 
    Profile, 
    ScanQRregister, 
    ScanQRlogin, 
    Splash, 
    Login, 
    ChangeProfile, 
    ChangePassword, 
    ActiveDevice, 
    GetStarted, 
    Register, 
    OTPVerification,
    Welcome,
    OTP,
    MenuQr, 
    History,
    Pin,
    PinChange
} from '../pages';
import { ButtomNavigation } from '../component';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <ButtomNavigation {...props}/>}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Scan QR" component={ScanQRregister} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName={Splash} tabBarOptions={{}}>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
            <Stack.Screen name="MenuQR" component={MenuQr} options={{ headerShown: false }} />
            <Stack.Screen name="ScanQRlogin" component={ScanQRlogin} options={{ headerShown: false }} />
            <Stack.Screen name="ScanQRregister" component={ScanQRregister} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeProfile" component={ChangeProfile} options={{ headerShown: false }} />
            <Stack.Screen name="ActiveDevice" component={ActiveDevice} options={{ headerShown: false }} />
            <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
            <Stack.Screen name="Pin" component={Pin} options={{ headerShown: false }} />
            <Stack.Screen name="PinChange" component={PinChange} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({
    
})
