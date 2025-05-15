import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import Colors from "../constants/Colors";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import OtpSignupScreen from "../screens/auth/OtpSignupScreen";

const AuthNavigator = () => {
    const Stack = createStackNavigator()

    return <Stack.Navigator initialRouteName={"signupScreen"}
                            screenOptions={{
                                headerShown: false,
                                cardStyle: {backgroundColor: Colors.background},
                            }}>
        <Stack.Screen name={"signupScreen"}
                      component={SignupScreen}/>
        <Stack.Screen name={"loginScreen"}
                      component={LoginScreen}/>
        <Stack.Screen name={"otpSignupScreen"}
                      component={OtpSignupScreen}/>
    </Stack.Navigator>
}

export default AuthNavigator