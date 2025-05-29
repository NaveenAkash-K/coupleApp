import axios from "axios";
import * as SecureStore from "expo-secure-store";

const sendInvitationAPI = async (data) => {
    const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URI + "/invitation/send", {...data}, {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })
    return response
}

export default sendInvitationAPI