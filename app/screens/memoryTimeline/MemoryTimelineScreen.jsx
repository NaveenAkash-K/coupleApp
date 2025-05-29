import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    SectionList,
    Text,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import {StackActions, useNavigation} from "@react-navigation/native";
import {useEffect, useLayoutEffect, useState} from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import {Octicons} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import useAppStore from "../../store/useAppStore";
import Memory from "../../components/memoryTimelineScreen/Memory";
import Colors from "../../constants/Colors";
import TextStyle from "../../constants/TextStyle";

const MemoryTimelineScreen = () => {
    const navigation = useNavigation();
    const {memories, loadMemories} = useAppStore(state => state.memoryTimelineSlice)
    const {isLinked} = useAppStore(state => state.authSlice)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const verifyPartner = async () => {
            console.log("isLinked")
            console.log(isLinked)
            if (!isLinked) {
                setTimeout(() => {
                    navigation.dispatch(StackActions.replace("noPartnerScreen"))
                }, 50)
            }
        }
        verifyPartner()
    }, [navigation]);

    const refreshMemories = async () => {
        setIsLoading(true)
        await loadMemories()
        setIsLoading(false)
    }

    useEffect(() => {
        refreshMemories();
    }, []);

    const renderSectionHeader = ({section}) => {
        return <Text style={[TextStyle.titleMedium, TextStyle.bold, {
            backgroundColor: Colors.background,

            paddingVertical: 10,
            paddingHorizontal: 15
        }]}>
            {section.date}
        </Text>
    };

    return <View style={{flex: 1}}>
        {isLoading ? <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                <ActivityIndicator color={Colors.onBackground} size={"large"}/>
            </View> :
            memories.length === 0 ?
                <View style={{justifyContent: "center", alignItems: "center", flex: 1, padding: 20}}>
                    <Image
                        source={require("../../assets/images/couple_illustration.png")} // Replace with your asset
                        style={{width: 200, height: 200, marginBottom: 20}}
                        resizeMode="contain"
                    />
                    <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 10}}>
                        No memories yet
                    </Text>
                    <Text style={{fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20}}>
                        Start by adding your first memory to relive special moments anytime.
                    </Text>
                    <PrimaryButton
                        onPress={() => {
                            navigation.navigate("addMemoryScreen", {edit: false})
                        }} // define this to navigate or open modal
                        container={{backgroundColor: Colors.primary, borderRadius: 100}}
                        pressable={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 15
                        }}
                    >
                        <Octicons name="plus" size={20} color={Colors.onPrimary}/>
                        <Text style={[TextStyle.titleSmall, {color: Colors.onPrimary}]}>Create Memory</Text>
                    </PrimaryButton>
                </View> :
                <SectionList
                    contentContainerStyle={{gap: 10}}
                    sections={memories}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <Memory memory={item}/>}
                    renderSectionHeader={renderSectionHeader}
                    stickySectionHeadersEnabled={true} // Optional, true by default
                />}
    </View>
}

export default MemoryTimelineScreen