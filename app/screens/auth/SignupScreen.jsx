import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import Colors from "../../constants/Colors";
import PrimaryButton from "../../components/common/PrimaryButton";
import {StackActions, useNavigation} from "@react-navigation/native";
import otpSignupScreen from "./OtpSignupScreen";
import {SafeAreaView} from "react-native-safe-area-context";
import signupAPI from "../../apis/auth/signupAPI";
import CustomTextInput from "../../components/common/CustomTextInput";
import React, {useState} from "react";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import useAppStore from "../../store/useAppStore";

const SignupScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSignupLoading, setIsSignupLoading] = useState(false)
    const {modifyAuthSlice} = useAppStore(state => state.authSlice);

    const handleSignup = async () => {
        try {
            setIsSignupLoading(true)
            const response = await signupAPI({
                username, email, password, confirmPassword
            })

            modifyAuthSlice("userId",response.data.userId)
            navigation.dispatch(StackActions.replace("otpSignupScreen"))

        } catch (e) {
            Toast.show({
                type: 'error',
                text1: e.response.data.message,
            })
        } finally {
            setIsSignupLoading(false)
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
            <Text style={[TextStyle.headlineMedium, TextStyle.bold, {color: Colors.primary, textAlign: "center"}]}>Sign
                Up</Text>
            <View style={{
                width: 50,
                height: 3,
                backgroundColor: Colors.primary,
                alignSelf: "center",
                marginVertical: 10
            }}></View>
            <View style={{marginTop: 40, marginBottom: 30, marginHorizontal: 30, gap: 20}}>
                <CustomTextInput
                    label={"Your Name"}
                    value={username}
                    onChangeText={setUsername}/>
                <CustomTextInput
                    label={"Email"}
                    value={email}
                    onChangeText={setEmail}/>
                <CustomTextInput
                    label={"Password"}
                    value={password}
                    onChangeText={setPassword}/>
                <CustomTextInput
                    label={"Confirm Password"}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}/>
            </View>
            <PrimaryButton
                onPress={handleSignup}
                container={{backgroundColor: Colors.primary, width: "50%", alignSelf: "center", borderRadius: 10}}
                pressable={{paddingVertical: 10}}>
                <Text style={[TextStyle.titleMedium, {color: Colors.onPrimary, textAlign: "center"}]}>Sign Up</Text>
            </PrimaryButton>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                flexDirection: "row",
                gap: 5,
                marginBottom: 20
            }}>
                <Text style={[TextStyle.bodyMedium, {margin: 5}]}>Already have an account?</Text>
                <PrimaryButton onPress={() =>
                    navigation.dispatch(StackActions.replace("loginScreen"))
                } pressable={{padding: 5}}>
                    <Text
                        style={[TextStyle.bodyMedium, TextStyles.semiBold, {color: Colors.primary}]}>Login</Text>
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

export default SignupScreen;