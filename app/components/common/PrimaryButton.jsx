import {Pressable, View, StyleSheet, Platform} from "react-native";

const PrimaryButton = (props) => {
    return (
        <View style={[{overflow: "hidden"}, props.container]}>
            <Pressable
                onPress={props.onPress}
                android_ripple={{color: "rgba(0,0,0,0.1)", borderless: false}}
                style={({pressed}) => [
                    (Platform.OS === "ios" && pressed) && styles.pressed, // For iOS feedback
                    props.pressable
                ]}
                {...props}
            >
                {props.children}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },
});

export default PrimaryButton;