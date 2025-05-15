import {ScrollView, Text, View, StyleSheet, Image, TextInput, KeyboardAvoidingView} from "react-native";
import Colors from "../../constants/Colors";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import PrimaryButton from "../../components/common/PrimaryButton";
import {MaterialIcons, Octicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {useState} from "react";
import DateTimePicker, {useDefaultStyles} from "react-native-ui-datepicker";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomTextInput from "../../components/common/CustomTextInput";

const AddMemoryTimelineScreen = () => {
    const [pickedImage, setPickedImage] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            base64: true,
            quality: 0.4,
        });

        if (result.assets !== null) {
            setPickedImage(result);
        }
    };

    return (
        // <KeyboardAvoidingView style={{flex: 1}} behavior={"padding"}>
        <View style={{flex: 1}}>
            <ScrollView style={styles.scrollView}
                        contentContainerStyle={{marginHorizontal: 10, gap: 20, paddingBottom: 30}}>
                {/* Date Picker */}
                <View style={styles.datePickerWrapper}>
                    <DateTimePicker
                        mode="single"
                        date={selectedDate}
                        onChange={({date}) => setSelectedDate(date)}
                        firstDayOfWeek={1}
                        styles={{
                            ...useDefaultStyles(),
                            header: styles.dateHeader,
                            selected_month: styles.selectedMonth,
                            selected: styles.selectedDate,
                            today: styles.todayDate,
                            day_label: TextStyle.labelLarge,
                            selected_month_label: TextStyle.bodyMedium,
                        }}
                    />
                </View>

                {/* Image Picker */}
                {pickedImage ? (
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{uri: pickedImage.assets[0].uri}}
                        />
                        <PrimaryButton
                            onPress={handleImagePick}
                            container={styles.imageEditButtonContainer}
                            pressable={styles.imageEditButtonPressable}
                        >
                            <MaterialIcons name="edit" size={24} color="black"/>
                        </PrimaryButton>
                    </View>
                ) : (
                    <PrimaryButton
                        onPress={handleImagePick}
                        container={styles.imagePickerContainer}
                        pressable={styles.imagePickerPressable}
                    >
                        <Octicons name="plus-circle" size={20} color={Colors.primary}/>
                        <Text style={[TextStyles.titleMedium, styles.addPhotoText]}>Add a memorable photo</Text>
                    </PrimaryButton>
                )}

                {/* Title Input */}
                <CustomTextInput label={"Title"} placeholder={"Eg: Movie Date"}/>

                {/* Description Input */}
                <CustomTextInput label={"Write what you feel about the day"}
                                 textInputStyle={styles.descriptionInput}
                                 placeholder={"What happened today? Pour it out here!"} multiline/>
            </ScrollView>

            {/* Footer Save Button */}
            <View style={styles.footer}>
                <PrimaryButton
                    container={styles.saveButtonContainer}
                    pressable={styles.saveButtonPressable}
                >
                    <Text style={[TextStyle.bodyLarge, styles.saveButtonText]}>Save memory</Text>
                </PrimaryButton>
            </View>
        </View>
        // </KeyboardAvoidingView>
    )

};

const styles = StyleSheet.create({
    container: {flex: 1},
    scrollView: {flex: 1},
    scrollContent: {padding: 10, gap: 15},
    datePickerWrapper: {marginBottom: -40},
    dateHeader: {height: 50},
    selectedMonth: {justifyContent: 'center', alignItems: 'center'},
    selectedDate: {backgroundColor: Colors.primary, borderRadius: 100},
    todayDate: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        height: 150,
        width: "100%",
        borderRadius: 15,
    },
    imageEditButtonContainer: {
        position: "absolute",
        backgroundColor: Colors.primaryContainer,
        borderRadius: 10,
        bottom: 10,
        right: 10,
    },
    imageEditButtonPressable: {
        padding: 10,
    },
    imagePickerContainer: {
        borderRadius: 15,
    },
    imagePickerPressable: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: Colors.primary,
        borderRadius: 15,
    },
    addPhotoText: {
        color: Colors.primary,
    },
    inputGroup: {
        gap: 5,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: Colors.gray["400"],
    },
    descriptionInput: {
        minHeight: 150,
        textAlignVertical: "top",
    },
    footer: {
        backgroundColor: Colors.background,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.gray["300"],
    },
    saveButtonContainer: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
    },
    saveButtonPressable: {
        padding: 12,
    },
    saveButtonText: {
        color: Colors.onPrimary,
        textAlign: "center",
    },
});

export default AddMemoryTimelineScreen;
