import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import Colors from "../../constants/Colors";
import PrimaryButton from "../../components/common/PrimaryButton";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

const LoginScreen = () => {
    const navigation = useNavigation();

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
                    <View style={{position: "relative"}}>
                        <Text style={{
                            position: "absolute",
                            backgroundColor: Colors.background,
                            top: -10,
                            left: 15,
                            zIndex: 1,
                            paddingHorizontal: 5,
                        }}>Email</Text>
                        <TextInput style={[TextStyle.bodyMedium, styles.textInput]}/>
                    </View>
                    <View style={{position: "relative"}}>
                        <Text style={{
                            position: "absolute",
                            backgroundColor: Colors.background,
                            top: -10,
                            left: 15,
                            zIndex: 1,
                            paddingHorizontal: 5,
                        }}>Password</Text>
                        <TextInput style={[TextStyle.bodyMedium, styles.textInput]}/>
                    </View>
                </View>
            </View>
            <PrimaryButton
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
                <PrimaryButton onPress={() => navigation.navigate("signupScreen")}>
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