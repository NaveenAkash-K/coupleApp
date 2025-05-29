import React, {useEffect, useState} from "react";
import {Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TextStyle, {TextStyles} from "../../constants/TextStyle";
import Colors from "../../constants/Colors";
import coupleIllustrationImage from "../../assets/images/couple_illustration.png";
import CustomTextInput from "../../components/common/CustomTextInput";
import PrimaryButton from "../../components/common/PrimaryButton";
import getSentInvitationsAPI from "../../apis/common/invitations/getSentInvitationsAPI";
import getReceivedInvitationsAPI from "../../apis/common/invitations/getReceivedInvitationsAPI";
import sendInvitationAPI from "../../apis/common/invitations/sendInvitationAPI";
import acceptInvitationAPI from "../../apis/common/invitations/acceptInvitationAPI";
import rejectInvitation from "../../apis/common/invitations/rejectInvitation";
import Toast from "react-native-toast-message";
import {StackActions, useNavigation} from "@react-navigation/native";
import useAppStore from "../../store/useAppStore";
import checkLinkedStatus from "../../apis/common/invitations/checkLinkedStatusAPI";
import cancelInvitationAPI from "../../apis/common/invitations/cancelInvitationAPI";

const NoPartnerScreen = (props) => {
    const [myInviteId, setMyInviteId] = useState("ABC123");
    const [inputInviteId, setInputInviteId] = useState("");
    const [status, setStatus] = useState("none");
    const [incomingInviteFrom, setIncomingInviteFrom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [invitation, setInvitation] = useState();
    const navigation = useNavigation();
    const {modifyAuthSlice, inviteId} = useAppStore(state => state.authSlice);

    useEffect(() => {
        checkInviteStatus();
    }, []);

    const checkInviteStatus = async () => {
        let response = await checkLinkedStatus();

        if (!(response.data.couple === null)) {
            modifyAuthSlice("isLinked", true)
            setStatus("none")
            setInvitation(null)
            navigation.dispatch(StackActions.replace("memoryTimelineScreen"))
            Toast.show({
                type: 'success',
                text1: "Invitation Accepted by your partner",
            })
        }

        response = await getSentInvitationsAPI();
        if (response.data.invitation) {
            setStatus("waiting")
            setInvitation(response.data.invitation)
            return;
        }
        response = await getReceivedInvitationsAPI()
        if (response.data.invitation) {
            setStatus("received")
            setInvitation(response.data.invitation)
        }
    };

    const handleSendInvite = async () => {
        if (!inputInviteId.trim()) return Alert.alert("Enter a valid Invite ID");

        setLoading(true);
        try {
            const response = await sendInvitationAPI({inviteId: inputInviteId});
            setInvitation(response.data.invitation)
            setStatus("waiting")
        } catch (e) {
            Alert.alert("Error", "Failed to send invite");
        }
        setLoading(false);
    };

    const handleAccept = async () => {
        try {
            const response = await acceptInvitationAPI({invitationId: invitation._id});
            modifyAuthSlice("isLinked", true)
            setStatus("none")
            setInvitation(null)
            navigation.dispatch(StackActions.replace("memoryTimelineScreen"))
            Toast.show({
                type: 'success',
                text1: response.data.message,
            })
        } catch (e) {
            Alert.alert("Error", "Failed to send invite");
        }
    };

    const handleReject = async () => {
        try {
            const response = await rejectInvitation({invitationId: invitation._id});
            setStatus("none")
            setInvitation(null)
            Toast.show({
                type: 'success',
                text1: response.data.message,
            })
        } catch (e) {
            Alert.alert("Error", "Failed to send invite");
        }
    };

    const cancelInvite = async () => {
        try {
            const response = await cancelInvitationAPI(invitation._id);
            setInvitation(null)
            setStatus("none");
            Toast.show({
                type: 'success',
                text1: response.data.message,
            })
        } catch (e) {
            console.log(e)
            Alert.alert("Error", "Failed to cancel invite");
        }
    }

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
                        <Text
                            style={[TextStyle.titleLarge, TextStyle.bold]}>{inviteId}</Text>
                    </View>
                </View>
                <View style={{marginTop: 10, gap: 20, flex: 1}}>
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
                        <>
                            <Text style={[TextStyle.titleSmall, {color: Colors.onBackground, textAlign: "center"}]}>Invitation
                                Sent to</Text>
                            <View style={{gap: 10}}>
                                <View style={{
                                    alignSelf: "center",
                                    width: 60,
                                    height: 60,
                                    backgroundColor: Colors.primaryContainer,
                                    borderRadius: 1000,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text
                                        style={[TextStyle.titleLarge, {color: Colors.onPrimaryContainer}]}>{invitation.to.username[0].toUpperCase()}</Text>
                                </View>
                                <Text
                                    style={[TextStyle.titleMedium, {textAlign: "center"}]}>{invitation.to.username}</Text>
                            </View>
                            <Text style={[TextStyle.bodySmall, {color: Colors.onBackground, textAlign: "center"}]}>
                                Waiting for your partner to accept the invite...
                            </Text>
                            <View style={{flex: 1}}/>
                            <PrimaryButton
                                onPress={cancelInvite}
                                container={{
                                    marginBottom: 20,
                                    backgroundColor: Colors.primary,
                                    borderRadius: 1000,
                                    justifySelf: ""
                                }}
                                pressable={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: 13
                                }}>
                                <Text style={[TextStyle.bodyLarge, {color: "white"}]}>Cancel Invite</Text>
                            </PrimaryButton>
                        </>
                    )}

                    {status === "received" && (
                        <>
                            <Text style={[TextStyle.titleSmall, {
                                marginTop: 20,
                                textAlign: "center",
                                color: Colors.onBackground
                            }]}>
                                You have received partner invitation from
                            </Text>
                            <View style={{gap: 10}}>
                                <View style={{
                                    alignSelf: "center",
                                    width: 60,
                                    height: 60,
                                    backgroundColor: Colors.primaryContainer,
                                    borderRadius: 1000,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text
                                        style={[TextStyle.titleLarge, {color: Colors.onPrimaryContainer}]}>{invitation.from.username[0].toUpperCase()}</Text>
                                </View>
                                <Text
                                    style={[TextStyle.titleMedium, {textAlign: "center"}]}>{invitation.from.username}</Text>
                            </View>

                            <View style={{flexDirection: "row", gap: 20}}>
                                <PrimaryButton onPress={handleAccept}
                                               container={{
                                                   backgroundColor: Colors.primary,
                                                   borderRadius: 1000,
                                                   flex: 1
                                               }}
                                               pressable={{
                                                   alignItems: "center",
                                                   justifyContent: "center",
                                                   paddingVertical: 10
                                               }}>
                                    <Text style={[TextStyle.bodyLarge, {color: "white"}]}>Accept</Text>
                                </PrimaryButton>

                                <PrimaryButton onPress={handleReject}
                                               container={{
                                                   backgroundColor: Colors.primary,
                                                   borderRadius: 1000,
                                                   flex: 1
                                               }}
                                               pressable={{
                                                   alignItems: "center",
                                                   justifyContent: "center",
                                                   paddingVertical: 10
                                               }}>
                                    <Text style={[TextStyle.bodyLarge, {color: "white"}]}>Reject</Text>
                                </PrimaryButton>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NoPartnerScreen;
