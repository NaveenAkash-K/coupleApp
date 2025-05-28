import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import Colors from "../../constants/Colors";
import PrimaryButton from "../../components/common/PrimaryButton";
import {StackActions, useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import CustomTextInput from "../../components/common/CustomTextInput";
import loginAPI from "../../apis/auth/loginAPI";
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store';

import useAppStore from "../../store/useAppStore";


const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    // const {setAuthState,modifyAuthSlice} = useAppStore(state => state.authSlice)
    const {setAuthState, modifyAuthSlice} = useAppStore(state => state.authSlice)

    const handleLogin = async () => {
        try {
            setIsLoginLoading(true)
            const response = await loginAPI({
                email,
                password
            })

            await SecureStore.setItemAsync("jwt", response.data.token);
            await SecureStore.setItemAsync("userId", response.data.user._id);
            await SecureStore.setItemAsync("inviteId", response.data.user.inviteId);
            await SecureStore.setItemAsync("username", response.data.user.username);
            await SecureStore.setItemAsync("isLinked", response.data.user.isLinked.toString());
            // modifyAuthSlice("userId",response.data.user._id)
            // modifyAuthSlice("inviteId", response.data.user.inviteId)
            // modifyAuthSlice("username", response.data.user.username)
            // modifyAuthSlice("isLinked", response.data.user.isLinked)
            // modifyAuthSlice("isLoggedIn", response.data.user.isLinked)

            setAuthState(true);
        } catch (e) {
            if (e.response.status === 300) {
                navigation.dispatch(StackActions.replace("otpSignupScreen"))
            }
            Toast.show({
                type: 'error',
                text1: e.response.data.message,
            })
        } finally {
            setIsLoginLoading(false)
        }
    }



    return <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
            <View style={{justifyContent: "center", alignItems: "center", marginVertical: 40}}>
                <Text style={[TextStyle.headlineLarge, TextStyle.extraBold, {color: Colors.primary}]}>Memory Nest</Text>
                <Text style={[TextStyle.titleMedium, TextStyle.bold, {color: Colors.primary}]}>Keep all you sweet
                    moments
                    together</Text>
            </View>
            <View style={{marginTop: 40, marginBottom: 30, marginHorizontal: 30}}>
                <Text style={[TextStyle.headlineMedium, TextStyle.bold, {
                    color: Colors.primary,
                    textAlign: "center"
                }]}>Login</Text>
                <View style={{
                    width: 40,
                    height: 3,
                    backgroundColor: Colors.primary,
                    alignSelf: "center",
                    marginVertical: 10
                }}/>
                <View style={{gap: 20, marginTop: 20}}>
                    <CustomTextInput
                        label={"Email"}
                        value={email}
                        onChangeText={setEmail}/>
                    <CustomTextInput
                        label={"Password"}
                        value={password}
                        onChangeText={setPassword}/>
                </View>
            </View>
            <PrimaryButton
                onPress={handleLogin}
                container={{backgroundColor: Colors.primary, width: "50%", alignSelf: "center", borderRadius: 10}}
                pressable={{paddingVertical: 10}}>
                <Text style={[TextStyle.titleMedium, {color: "white", textAlign: "center"}]}>Login</Text>
            </PrimaryButton>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                flexDirection: "row",
                gap: 5,
                marginBottom: 20
            }}>
                <Text style={[TextStyle.bodyMedium, {margin: 5}]}>New user?</Text>
                <PrimaryButton onPress={() => navigation.dispatch(StackActions.replace('signupScreen'))}>
                    <Text
                        style={[TextStyle.bodyMedium, TextStyles.semiBold, {color: Colors.primary, padding: 5}]}>Sign
                        Up</Text>
                </PrimaryButton>
            </View>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderColor: Colors.gray["400"],
    },
})

export default LoginScreen;