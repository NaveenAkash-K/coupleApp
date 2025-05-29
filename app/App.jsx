import {ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native';
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
import {useEffect, useLayoutEffect, useState} from "react";
import Toast from "react-native-toast-message";
import TextStyle from "./constants/TextStyle";

import useAppStore from "./store/useAppStore";
import * as SecureStore from "expo-secure-store";
import {PaperProvider} from "react-native-paper";
import checkAuthAPI from "./apis/auth/checkAuthAPI";

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

    const {isLoggedIn, modifyAuthSlice, clearAuthSlice} = useAppStore(state => state.authSlice)
    const [isLoading, setIsLoading] = useState(false)

    useLayoutEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true)
            // await SecureStore.deleteItemAsync("jwt")
            try {
                if (await SecureStore.getItemAsync("jwt")) {
                    const response = await checkAuthAPI()
                    modifyAuthSlice("isLoggedIn", true)
                    modifyAuthSlice("userId", response.data.user._id)
                    modifyAuthSlice("inviteId", response.data.user.inviteId)
                    modifyAuthSlice("username", response.data.user.username)
                    modifyAuthSlice("isLinked", response.data.user.isLinked)
                } else {
                    clearAuthSlice()
                }
            } catch (e) {
                Toast.show({type: "error", text1: e.response.data.message})
                clearAuthSlice()
                await SecureStore.deleteItemAsync("jwt")
            } finally {
                setIsLoading(false)
            }
        }
        checkAuth()
    }, []);

    return (
        <PaperProvider>
            <SafeAreaProvider style={{backgroundColor: Colors.background}}>
                {isLoading && <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><ActivityIndicator
                    color={Colors.primary}/></View>}
                {!isLoading && <NavigationContainer>
                    <StatusBar backgroundColor={Colors.background} barStyle="dark-content"/>
                    {isLoggedIn ? <MainStackNavigator/> : <AuthNavigator/>}
                </NavigationContainer>}
                <Toast
                    position='bottom'
                    avoidKeyboard={true}
                    bottomOffset={20}
                />
            </SafeAreaProvider>
        </PaperProvider>
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
