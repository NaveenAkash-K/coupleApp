import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getSentInvitationsAPI = async () => {
    const response = await axios.get(process.env.EXPO_PUBLIC_BACKEND_URI + "/invitation/sent", {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })
    return response
}

export default getSentInvitationsAPI