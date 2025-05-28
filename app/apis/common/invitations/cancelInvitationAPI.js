import axios from "axios";
import * as SecureStore from "expo-secure-store";

const cancelInvitationAPI = async (inviteId) => {
    const response = await axios.delete(process.env.EXPO_PUBLIC_BACKEND_URI + "/invitation/cancel/" + inviteId, {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })
    return response;
}

export default cancelInvitationAPI