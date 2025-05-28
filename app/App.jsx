import {KeyboardAvoidingView, Platform} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from 'react-native';
import './gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import MainStackNavigator from "./navigators/MainStackNavigator";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';
import Colors from "./constants/Colors";
import AuthNavigator from "./navigators/AuthNavigator";
import {enableScreens} from "react-native-screens";
import {useEffect, useLayoutEffect} from "react";
import Toast from "react-native-toast-message";
import TextStyle from "./constants/TextStyle";

import useAppStore from "./store/useAppStore";
import * as SecureStore from "expo-secure-store";

export default function App() {
    const [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    const {isLoggedIn, setAuthState} = useAppStore(state => state.authSlice)

    useLayoutEffect(() => {
        const checkAuth = async () => {
            // await SecureStore.deleteItemAsync("jwt")
            // await SecureStore.deleteItemAsync("userId")
            // await SecureStore.deleteItemAsync("inviteId")
            // await SecureStore.deleteItemAsync("username")
            // await SecureStore.deleteItemAsync("isLinked")
            // setAuthState(false)
            if (await SecureStore.getItemAsync("jwt")) {
                setAuthState(true)
            }
        }
        checkAuth()
    }, []);

    return (
        <SafeAreaProvider style={{backgroundColor: Colors.background}}>
            <NavigationContainer>
                <StatusBar backgroundColor={Colors.background} barStyle="dark-content"/>
                {isLoggedIn ? <MainStackNavigator/> : <AuthNavigator/>}
            </NavigationContainer>
            <Toast
                position='bottom'
                avoidKeyboard={true}
                bottomOffset={20}
            />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
