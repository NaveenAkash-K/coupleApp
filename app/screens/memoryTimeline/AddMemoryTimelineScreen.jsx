import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import Colors from "../../constants/Colors";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import PrimaryButton from "../../components/common/PrimaryButton";
import {MaterialIcons, Octicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {useLayoutEffect, useState} from "react";
import DateTimePicker, {useDefaultStyles} from "react-native-ui-datepicker";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomTextInput from "../../components/common/CustomTextInput";
import addMemoryAPI from "../../apis/memoryTimeline/addMemoryAPI";
import {StackActions, useNavigation, useRoute} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import useAppStore from "../../store/useAppStore";
import moment from "moment";
import editMemoryAPI from "../../apis/memoryTimeline/editMemoryAPI";

const AddMemoryTimelineScreen = () => {
    const route = useRoute();
    const {params} = route;
    const [pickedImage, setPickedImage] = useState(params.edit ? params.memory.base64 : null);
    const [selectedDate, setSelectedDate] = useState(params.edit ? moment(params.memory.date).toDate() : new Date());
    const [title, setTitle] = useState(params.edit ? params.memory.title : "")
    const [description, setDescription] = useState(params.edit ? params.memory.description : "")
    const navigation = useNavigation();
    const {refreshMemories, editMemory} = useAppStore(state => state.memoryTimelineSlice);
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({headerTitle: params.edit ? "Edit Memory" : "Add Memory"})
    }, []);

    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            base64: true,
            quality: 0.2,
        });

        if (result.assets !== null) {
            setPickedImage(result?.assets[0]?.base64);
        }
    };

    const handleEdit = async () => {
        if (!title.trim() || !description.trim()) {
            Toast.show({type: "error", text1: "Please fill in title and description"})
            return;
        }

        setIsLoading(true)

        try {
            const response = await editMemoryAPI(params.memory._id, {
                title: title,
                description: description,
                date: selectedDate.toISOString(),
                image: pickedImage || null,
                deleteImage: (pickedImage === null && params.memory.base64)
            })

            editMemory(response.data.updatedMemory, pickedImage);
            navigation.goBack()
            navigation.dispatch(StackActions.replace("viewMemoryScreen", {
                memory: {
                    _id: params.memory._id,
                    title: title,
                    description: description,
                    date: selectedDate.toISOString(),
                    imageName: pickedImage,
                    base64: pickedImage || null,
                }
            }))

        } catch (e) {
            console.error(e.response.data);
            alert("An error occurred while saving memory.");
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        // if (isLoading) return;
        if (!title.trim() || !description.trim()) {
            Toast.show({type: "error", text1: "Please fill in title and description"})
            return;
        }


        setIsLoading(true)

        try {
            const response = await addMemoryAPI({
                title,
                description,
                date: selectedDate.toISOString(),
                image: pickedImage || null,
            })
            Toast.show({
                type: 'success',
                text1: response.data.message,
            })
            refreshMemories();
            navigation.goBack();
        } catch (error) {
            console.error(error.response.data);
            alert("An error occurred while saving memory.");
        } finally {
            setIsLoading(false)
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
                            source={{uri: `data:image/jpeg;base64,${pickedImage}`}}
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
                <CustomTextInput label={"Title"} placeholder={"Eg: Movie Date"} value={title} onChangeText={setTitle}/>

                {/* Description Input */}
                <CustomTextInput label={"Write what you feel about the day"}
                                 value={description}
                                 onChangeText={setDescription}
                                 textInputStyle={styles.descriptionInput}
                                 placeholder={"What happened today? Pour it out here!"} multiline/>
            </ScrollView>

            {/* Footer Save Button */}
            <View style={styles.footer}>
                <PrimaryButton
                    isLoading={isLoading}
                    onPress={params.edit ? handleEdit : handleSave}
                    container={styles.saveButtonContainer}
                    pressable={styles.saveButtonPressable}
                >
                    {isLoading ? <ActivityIndicator color={Colors.onPrimary}/> :
                        <Text
                            style={[TextStyle.bodyLarge, styles.saveButtonText]}>{params.edit ? "Save changes" : "Add memory"}</Text>}
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
    datePickerWrapper: {},
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
