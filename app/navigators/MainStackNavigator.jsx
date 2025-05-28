import {createStackNavigator} from "@react-navigation/stack";
import MemoryTimelineScreen from "../screens/memoryTimeline/MemoryTimelineScreen";
import AddMemoryTimelineScreen from "../screens/memoryTimeline/AddMemoryTimelineScreen";
import PrimaryButton from "../components/common/PrimaryButton";
import {MaterialIcons, Octicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import Colors from "../constants/Colors";
import {Pressable, Text, View} from "react-native";
import PartnerScreen from "../screens/common/PartnerScreen";
import TextStyle from "../constants/TextStyle";
import NoPartnerScreen from "../screens/common/NoPartnerScreen";
import ViewMemoryScreen from "../screens/memoryTimeline/ViewMemoryScreen";

const MainStackNavigator = () => {
    const Stack = createStackNavigator()
    const navigation = useNavigation()

    return <Stack.Navigator initialRouteName={"memoryTimelineScreen"}
                            screenOptions={{
                                headerShown: true,
                                headerTitleAlign: "center",
                                headerStyle: {backgroundColor: Colors.background},
                                cardStyle: {backgroundColor: Colors.background},
                                headerTitleStyle: {color: Colors.onBackground},
                            }}>
        <Stack.Screen name={"memoryTimelineScreen"}
                      options={{
                          headerTitle: "Memory Timeline",
                          headerLeft: () => <PrimaryButton onPress={() => navigation.navigate("partnerScreen")}
                                                           container={{
                                                               borderRadius: 100,
                                                               marginLeft: 8,
                                                               position: "relative"
                                                           }}
                                                           pressable={{
                                                               flexDirection: "row",
                                                               paddingVertical: 10,
                                                               paddingHorizontal: 5,
                                                           }}>
                              <View
                                  style={{
                                      height: 30,
                                      width: 30,
                                      backgroundColor: Colors.primary,
                                      borderRadius: 100,
                                      borderWidth: 1
                                  }}/>
                              <View
                                  style={{
                                      zIndex: 1,
                                      marginLeft: -15,
                                      height: 30,
                                      width: 30,
                                      backgroundColor: Colors.primary,
                                      borderRadius: 100,
                                      borderWidth: 1
                                  }}/>
                              {/*<Text style={{*/}
                              {/*    zIndex: 2,*/}
                              {/*    position: "absolute",*/}
                              {/*    top: "60%",*/}
                              {/*    left: "35%",*/}
                              {/*    fontSize: 10*/}
                              {/*}}>❤️</Text>*/}
                          </PrimaryButton>,
                          headerRight: () => <PrimaryButton
                              onPress={() => {
                                  navigation.navigate("addMemoryScreen",{edit:false})
                              }}
                              container={{borderRadius: 500}}
                              pressable={{paddingHorizontal: 18, paddingVertical: 15}}>
                              <Octicons name="plus" size={22} color="black"/>
                          </PrimaryButton>
                      }}
                      component={MemoryTimelineScreen}/>
        <Stack.Screen name={"addMemoryScreen"}
                      options={{
                          headerTitle: "Add Memory",
                      }}
                      component={AddMemoryTimelineScreen}/>
        <Stack.Screen name={"partnerScreen"}
                      options={{
                          headerTitle: "Your Partner",
                      }}
                      component={PartnerScreen}/>
        <Stack.Screen name={"viewMemoryScreen"}
                      options={{
                          headerTitle: "View Memory",
                      }}
                      component={ViewMemoryScreen}/>
        <Stack.Screen name={"noPartnerScreen"} options={{
            headerShown: false,
            headerTitle: "Join with your partner",
        }} component={NoPartnerScreen}/>
    </Stack.Navigator>
}

export default MainStackNavigator