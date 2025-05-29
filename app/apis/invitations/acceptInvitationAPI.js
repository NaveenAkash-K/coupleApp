import axios from "axios";
import * as SecureStore from "expo-secure-store";

const acceptInvitationAPI = async (data) => {
    const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URI + "/invitation/accept", {...data}, {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })
    return response;
}

export default acceptInvitationAPI