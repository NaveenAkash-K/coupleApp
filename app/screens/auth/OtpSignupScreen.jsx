import {Text, View} from "react-native";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import Colors from "../../constants/Colors";
import {OtpInput} from "react-native-otp-entry";
import {MaterialIcons} from "@expo/vector-icons";
import PrimaryButton from "../../components/common/PrimaryButton";

const OtpSignupScreen = () => {
    return <View style={{justifyContent: "center", alignItems: "center", flex: 0.88, gap: 20}}>
        <MaterialIcons name="verified-user" size={50} color={Colors.primary}/>
        <Text style={[TextStyle.headlineMedium, TextStyle.bold, {color: Colors.primary, textAlign: "center"}]}>OTP
            Verification</Text>
        <Text style={[TextStyle.bodySmall, {color: Colors.primary, textAlign: "center"}]}>OTP has
            been sent to your email</Text>
        <View style={{width: "70%"}}>
            <OtpInput
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
            container={{backgroundColor: Colors.primary, width: "50%", alignSelf: "center", borderRadius: 10}}
            pressable={{paddingVertical: 10}}>
            <Text style={[TextStyle.titleMedium, {color: Colors.onPrimary, textAlign: "center"}]}>Submit</Text>
        </PrimaryButton>
    </View>
}

export default OtpSignupScreen;