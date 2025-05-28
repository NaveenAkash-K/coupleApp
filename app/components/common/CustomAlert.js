import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet, ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors";
import TextStyle from "../../constants/TextStyle";
import PrimaryButton from "./PrimaryButton";

/**
 * CustomAlert Component
 * Props:
 * - visible: boolean
 * - title: string
 * - message: string
 * - onConfirm: function
 * - onCancel: function (optional)
 * - confirmText: string (default: 'Yes')
 * - cancelText: string (default: 'Cancel')
 */
const CustomAlert = ({
                         visible,
                         title,
                         message,
                         onConfirm,
                         onCancel,
                         confirmText = "Yes",
                         cancelText = "Cancel",
                         isLoading
                     }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={styles.alertBox}>
                            <Text style={[TextStyle.titleMedium, styles.title]}>{title}</Text>
                            <Text style={[TextStyle.bodyMedium, styles.message]}>{message}</Text>

                            <View style={styles.buttonRow}>
                                <PrimaryButton onPress={() => {
                                    if (isLoading) return
                                    onCancel()
                                }} container={{borderRadius: 100}} pressable={[styles.button]}>
                                    {isLoading ? <ActivityIndicator color={Colors.primary} style={{width:60}}/> : <Text style={[TextStyle.labelLarge, styles.cancel]}>
                                        {cancelText}
                                    </Text>}
                                </PrimaryButton>
                                <PrimaryButton onPress={() => {
                                    if (isLoading) return
                                    onConfirm()
                                }} container={{borderRadius: 100}} style={[styles.button]}>
                                    {isLoading ? <ActivityIndicator color={Colors.primary} style={{width:60}}/> : <Text style={[TextStyle.labelLarge, styles.confirm]}>
                                        {confirmText}
                                    </Text>}
                                </PrimaryButton>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CustomAlert;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    alertBox: {
        width: "80%",
        backgroundColor: Colors.background,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
    },
    title: {
        marginBottom: 10,
        color: Colors.onBackground,
    },
    message: {
        marginBottom: 20,
        color: Colors.onBackground,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    cancel: {
        color: Colors.error
    },
    confirm: {
        color: Colors.primary
    },
});
