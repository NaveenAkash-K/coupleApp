import {Image, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import TextStyle, {TextStyles} from "../../constants/TextStyle";

const TimelineItem = (props) => {
    return <View style={{flexDirection: "row"}}>
        <View style={{alignItems: "center", marginHorizontal: 15}}>
            <Text
                style={[TextStyle.bodyMedium]}>Wed</Text>
            <Text style={[TextStyle.titleLarge, TextStyles.bold]}>30</Text>
        </View>
        <View style={{
            flex: 1,
            marginRight: 10,
            overflow: "hidden",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.gray["300"],
            backgroundColor: Colors.primaryContainer,
            elevation: 1
        }}>
            <Image
                source={{uri: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"}}
                height={175}/>
            <View style={{height: 90, padding: 10, gap: 2}}>
                <Text style={[TextStyle.titleMedium, {color: Colors.onPrimaryContainer}]} numberOfLines={1}>Title Title
                    Title Title Title Title Title Title
                    Title Title </Text>
                <Text numberOfLines={3} ellipsizeMode={"tail"}
                      style={[TextStyle.bodySmall, {overflow: "hidden", color: Colors.onPrimaryContainer}]}>Lorem
                    Ipsum is simply
                    dummy text of the
                    printing and typesetting
                    industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </View>
        </View>
    </View>
}

export default TimelineItem