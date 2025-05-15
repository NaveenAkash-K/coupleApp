import React, {useEffect, useState} from "react";
import {Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import Colors from "../../constants/Colors";
import coupleIllustrationImage from "../../assets/images/couple_illustration.png";
import CustomTextInput from "../../components/common/CustomTextInput";
import PrimaryButton from "../../components/common/PrimaryButton";

const NoPartnerScreen = (props) => {
    const [myInviteId, setMyInviteId] = useState("ABC123"); // Replace with real invite id from user
    const [inputInviteId, setInputInviteId] = useState("");
    const [status, setStatus] = useState("received"); // none, waiting, received
    const [incomingInviteFrom, setIncomingInviteFrom] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate checking for invite status
        checkInviteStatus();
    }, []);

    const checkInviteStatus = async () => {
        // Replace this with actual Firebase / API logic
        // Example mock:
        const hasIncoming = false;
        const hasSentInvite = false;

        if (hasIncoming) {
            setIncomingInviteFrom("DEF456");
            setStatus("received");
        } else if (hasSentInvite) {
            setStatus("waiting");
        }
    };

    const handleSendInvite = async () => {
        if (!inputInviteId.trim()) return Alert.alert("Enter a valid Invite ID");

        setLoading(true);
        try {
            // Call backend / Firebase to send invitation
            // await sendInvite(inputInviteId);
            setStatus("waiting");
            Alert.alert("Invitation sent", `Waiting for user ${inputInviteId} to accept.`);
        } catch (e) {
            Alert.alert("Error", "Failed to send invite");
        }
        setLoading(false);
    };

    const handleAccept = async () => {
        // Accept logic here
        Alert.alert("Connected", `You are now paired with ${incomingInviteFrom}`);
        // Proceed to home or update user context
    };

    const handleReject = async () => {
        setIncomingInviteFrom(null);
        setStatus("none");
        Alert.alert("Rejected", "You rejected the invite.");
        // Backend call to reject invite if needed
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, marginHorizontal: 15}}>
                <View style={{backgroundColor: Colors.primaryContainer, borderRadius: 15, padding: 20}}>
                    <Image source={coupleIllustrationImage}
                           style={{height: 250, width: "100%", resizeMode: "contain"}}/>
                    <Text style={[TextStyle.headlineMedium, TextStyle.bold, {
                        color: Colors.primary,
                        textAlign: "center",
                        marginBottom: 10
                    }]}>
                        Join with your partner
                    </Text>

                    {/* Show user's Invite ID */}
                    <View style={{alignItems: "center"}}>
                        <Text style={[{textAlign: "center"}, TextStyles.titleMedium]}>
                            Your Invite ID
                        </Text>
                        <Text style={[TextStyle.titleLarge, TextStyle.bold]}>{myInviteId}</Text>
                    </View>
                </View>
                <View style={{marginTop: 30, marginBottom: 20, gap: 20, justifyContent: "center"}}>
                    {status === "none" && (
                        <>
                            {/* Input for other’s Invite ID */}
                            <CustomTextInput placeholder="Enter Partner's Invite ID"
                                             label={"Partner's ID"}
                                             value={inputInviteId}
                                             autoCapitalize="characters"
                                             textInputStyle={[TextStyle.titleMedium, {
                                                 borderRadius: 100,
                                                 paddingVertical: 20,
                                                 paddingHorizontal: 20
                                             }]}
                                             onChangeText={setInputInviteId}/>
                            {/*<TextInput autoCapitalize={""}*/}
                            <PrimaryButton
                                container={{
                                    backgroundColor: Colors.primary,
                                    borderRadius: 100,
                                }}
                                pressable={{paddingVertical: 20, width: "100%"}}
                                onPress={handleSendInvite}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="#fff"/> :
                                    <Text
                                        style={[TextStyle.titleMedium, {color: Colors.onPrimary, textAlign: "center"}]}>Send
                                        Invite</Text>}
                            </PrimaryButton>
                        </>
                    )}

                    {status === "waiting" && (
                        <Text style={{marginTop: 20, textAlign: "center", color: Colors.primary}}>
                            Waiting for your partner to accept the invite...
                        </Text>
                    )}

                    {status === "received" && (
                        <>
                            <Text style={{marginTop: 20, textAlign: "center", color: Colors.primary}}>
                                You received an invite from ID: <Text
                                style={{fontWeight: "bold"}}>{incomingInviteFrom}</Text>
                            </Text>

                            <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 20}}>
                                <TouchableOpacity onPress={handleAccept}
                                                  style={{backgroundColor: "green", padding: 12, borderRadius: 10}}>
                                    <Text style={{color: "#fff"}}>Accept</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleReject}
                                                  style={{backgroundColor: "red", padding: 12, borderRadius: 10}}>
                                    <Text style={{color: "#fff"}}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NoPartnerScreen;
