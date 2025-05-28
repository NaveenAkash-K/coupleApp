import {ActivityIndicator, Image, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import moment from "moment";
import PrimaryButton from "../common/PrimaryButton";
import {useNavigation} from "@react-navigation/native";

const Memory = (props) => {
    const date = moment(props.memory.date);
    const navigation = useNavigation();

    return <View style={{flexDirection: "row"}}>
        <View style={{alignItems: "center", marginHorizontal: 15}}>
            <Text
                style={[TextStyle.bodyMedium]}>{date.format("ddd")}</Text>
            <Text style={[TextStyle.titleLarge, TextStyles.bold]}>{date.format("DD")}</Text>
        </View>
        <PrimaryButton
            onPress={() => navigation.navigate("viewMemoryScreen", props)}
            container={{
                flex: 1,
                marginRight: 10,
                overflow: "hidden",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.gray["300"],
                backgroundColor: Colors.primaryContainer,
                elevation: 1
            }}>
            {props.memory.imageName ? props.memory.base64 ? (
                <Image
                    source={{uri: `data:image/jpeg;base64,${props.memory.base64}`}}
                    style={{height: 175, width: '100%'}}
                    resizeMode="cover"
                />
            ) : <View style={{height: 175, width: '100%', justifyContent: "center"}}>
                <ActivityIndicator size={"large"} color={Colors.onBackground}/>
            </View> : null}
            <View style={{maxHeight: 90, padding: 10, gap: 2}}>
                <Text style={[TextStyle.titleMedium, {color: Colors.onPrimaryContainer}]}
                      numberOfLines={1}>{props.memory.title}</Text>
                <Text numberOfLines={3} ellipsizeMode={"tail"}
                      style={[TextStyle.bodySmall, {
                          overflow: "hidden",
                          color: Colors.onPrimaryContainer
                      }]}>{props.memory.description}</Text>
            </View>
        </PrimaryButton>
    </View>
}

export default Memory