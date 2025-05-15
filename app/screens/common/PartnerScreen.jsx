import {View} from "react-native";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

const PartnerScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "UserUser ❤️ UserUser"
        })
    }, []);


    return <View style={{flex: 1}}>
        <View style={{
            margin: 15,
            backgroundColor: Colors.primaryContainer,
            height: "20%",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <View style={{flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-evenly"}}>
                <View style={{
                    height: 70,
                    width: 70,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    borderRadius: 1000
                }}/>
                <Ionicons name="heart" size={40} color={Colors.primary}/>
                <View style={{
                    height: 70,
                    width: 70,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    borderRadius: 1000
                }}/>
            </View>
        </View>
    </View>
}

export default PartnerScreen