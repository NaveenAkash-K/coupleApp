import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getMemoryImageAPI = async (imageId) => {
    const response = await axios.get(process.env.EXPO_PUBLIC_BACKEND_URI + "/memoryTimeline/image/" + imageId, {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })

    return response
}

export default getMemoryImageAPI