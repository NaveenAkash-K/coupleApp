import axios from "axios";
import * as SecureStore from "expo-secure-store";

const deleteMemoryAPI = async (memoryId) => {
    const response = await axios.delete(process.env.EXPO_PUBLIC_BACKEND_URI + "/memoryTimeline/" + memoryId, {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })

    return response
}

export default deleteMemoryAPI