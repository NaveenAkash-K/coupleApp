import {StyleSheet, Text, TextInput, View} from "react-native";
import Colors from "../../constants/Colors";
import TextStyle from "../../constants/TextStyle";

const CustomTextInput = (props) => {
    return <View style={{position: "relative"}}>
        {props.label && <Text style={{
            position: "absolute",
            backgroundColor: Colors.background,
            top: -10,
            left: 15,
            zIndex: 1,
            paddingHorizontal: 5,
        }}>{props.label}</Text>}
        <TextInput placeholderTextColor={Colors.gray["400"]} {...props}
                   style={[TextStyle.bodyMedium, styles.textInput, props.textInputStyle]}/>
    </View>
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 13,
        borderColor: Colors.gray["400"],
    },
})

export default CustomTextInput;