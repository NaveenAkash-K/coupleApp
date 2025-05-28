import {ActivityIndicator, Image, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import moment from "moment";
import PrimaryButton from "../common/PrimaryButton";
import {useNavigation} from "@react-navigation/native";
import {Menu} from "react-native-paper";
import {useState} from "react";
import CustomAlert from "../common/CustomAlert";
import deleteMemoryAPI from "../../apis/memoryTimeline/deleteMemoryAPI";
import Toast from "react-native-toast-message";
import useAppStore from "../../store/useAppStore"; // ✅ Import custom alert

const Memory = (props) => {
    const date = moment(props.memory.date);
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({x: 0, y: 0});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {deleteMemory} = useAppStore(state => state.memoryTimelineSlice);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)

    const openMenu = (e) => {
        const {pageX, pageY} = e.nativeEvent;
        setMenuAnchor({x: pageX, y: pageY});
        setMenuVisible(true);
    };

    const closeMenu = () => setMenuVisible(false);

    const handleDelete = () => {
        closeMenu();
        setShowConfirmModal(true); // ✅ Show confirmation
    };

    const confirmDelete = async () => {
        setIsDeleteLoading(true)
        try {
            const response = await deleteMemoryAPI(props.memory._id);
            deleteMemory(props.memory._id);
            Toast.show({type: "success", text1: response.data.message})
        } catch (e) {
            console.log(e)
        } finally {
            setIsDeleteLoading(false)
            setShowConfirmModal(false);
        }
    };

    return (
        <View style={{flexDirection: "row"}}>
            <View style={{alignItems: "center", marginHorizontal: 15}}>
                <Text style={[TextStyle.bodyMedium]}>{date.format("ddd")}</Text>
                <Text style={[TextStyle.titleLarge, TextStyles.bold]}>{date.format("DD")}</Text>
            </View>

            {/* Paper Menu */}
            <Menu visible={menuVisible} onDismiss={closeMenu} anchor={menuAnchor}>
                <Menu.Item
                    onPress={handleDelete}
                    title="Delete memory"
                    titleStyle={TextStyle.bodyMedium}
                />
            </Menu>

            {/* Memory Card */}
            <PrimaryButton
                onPress={() => navigation.navigate("viewMemoryScreen", props)}
                onLongPress={openMenu}
                container={{
                    flex: 1,
                    marginRight: 10,
                    overflow: "hidden",
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: Colors.gray["300"],
                    backgroundColor: Colors.primaryContainer,
                    elevation: 1,
                }}
            >
                {props.memory.imageName ? (
                    props.memory.base64 ? (
                        <Image
                            source={{uri: `data:image/jpeg;base64,${props.memory.base64}`}}
                            style={{height: 175, width: "100%"}}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={{height: 175, width: "100%", justifyContent: "center"}}>
                            <ActivityIndicator size="large" color={Colors.onBackground}/>
                        </View>
                    )
                ) : null}

                <View style={{maxHeight: 90, padding: 10, gap: 2}}>
                    <Text
                        style={[TextStyle.titleMedium, {color: Colors.onPrimaryContainer}]}
                        numberOfLines={1}
                    >
                        {props.memory.title}
                    </Text>
                    <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={[
                            TextStyle.bodySmall,
                            {overflow: "hidden", color: Colors.onPrimaryContainer},
                        ]}
                    >
                        {props.memory.description}
                    </Text>
                </View>
            </PrimaryButton>

            {/* ✅ Custom Confirmation Alert */}
            <CustomAlert
                visible={showConfirmModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this memory?"
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={confirmDelete}
                cancelText="Cancel"
                confirmText="Delete"
                isLoading={isDeleteLoading}
            />
        </View>
    );
};

export default Memory;
