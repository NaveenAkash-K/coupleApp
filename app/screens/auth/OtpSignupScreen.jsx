import {Text, View} from "react-native";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import Colors from "../../constants/Colors";
import {OtpInput} from "react-native-otp-entry";
import {MaterialIcons} from "@expo/vector-icons";
import PrimaryButton from "../../components/common/PrimaryButton";
import {useState} from "react";
import verifyOtpAPI from "../../apis/auth/verifyOtpAPI";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import {useNavigation} from "@react-navigation/native";
import useAppStore from "../../store/useAppStore";

const OtpSignupScreen = () => {
    const [otp, setOtp] = useState("")
    const navigation = useNavigation();
    const [isOtpVerifyLoading, setIsOtpVerifyLoading] = useState(false)
    const {setAuthState} = useAppStore(state => state.authSlice);

    const handleOtpVerify = async () => {
        try {
            setIsOtpVerifyLoading(true)
            const response = await verifyOtpAPI({
                userId: await SecureStore.getItemAsync("userId"),
                otp
            })
            await SecureStore.setItemAsync("jwt", response.data.token);
            await SecureStore.setItemAsync("userId", response.data.user._id);
            await SecureStore.setItemAsync("inviteId", response.data.user.inviteId);
            await SecureStore.setItemAsync("username", response.data.user.username);
            await SecureStore.setItemAsync("isLinked", response.data.user.isLinked.toString());
            navigation.navigate("loginScreen")
            setAuthState(true);
            Toast.show({
                type: 'success',
                text1: response.data.message,
            })
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: e.response.data.message,
            })
        } finally {
            setIsOtpVerifyLoading(false)
        }

    }

    return <View style={{justifyContent: "center", alignItems: "center", flex: 0.88, gap: 20}}>
        <MaterialIcons name="verified-user" size={50} color={Colors.primary}/>
        <Text style={[TextStyle.headlineMedium, TextStyle.bold, {color: Colors.primary, textAlign: "center"}]}>OTP
            Verification</Text>
        <Text style={[TextStyle.bodySmall, {color: Colors.primary, textAlign: "center"}]}>OTP has
            been sent to your email</Text>
        <View style={{width: "70%"}}>
            <OtpInput
                onTextChange={(text) => {
                    setOtp(text)
                }}
                numberOfDigits={4}
                focusColor={Colors.primary}
                autoFocus={true}
                hideStick={true}
                theme={{
                    pinCodeContainerStyle: {borderWidth: 2},
                    pinCodeTextStyle: {...TextStyles.headlineSmall, color: Colors.primary}
                }}
            />
        </View>
        <PrimaryButton
            onPress={handleOtpVerify}
            container={{backgroundColor: Colors.primary, width: "50%", alignSelf: "center", borderRadius: 10}}
            pressable={{paddingVertical: 10}}>
            <Text style={[TextStyle.titleMedium, {color: Colors.onPrimary, textAlign: "center"}]}>Submit</Text>
        </PrimaryButton>
    </View>
}

export default OtpSignupScreen;