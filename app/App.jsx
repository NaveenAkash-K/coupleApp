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

    enableScreens();

    const isLoggedIn = true

    return (
        <SafeAreaProvider style={{backgroundColor: Colors.background}}>
            <NavigationContainer>
                <StatusBar backgroundColor={Colors.background} barStyle="dark-content"/>
                {isLoggedIn ? <MainStackNavigator/> : <AuthNavigator/>}
            </NavigationContainer>
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
