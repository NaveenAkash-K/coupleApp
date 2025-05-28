import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getReceivedInvitationsAPI = async () => {
    const response = await axios.get(process.env.EXPO_PUBLIC_BACKEND_URI + "/invitation/received", {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })
    return response;
}

export default getReceivedInvitationsAPI