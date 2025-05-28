import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getMemoriesAPI = async () => {
    const response = await axios.get(process.env.EXPO_PUBLIC_BACKEND_URI + "/memoryTimeline/", {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })

    return response
}

export default getMemoriesAPI