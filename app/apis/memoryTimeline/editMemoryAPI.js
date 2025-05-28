import axios from "axios";
import * as SecureStore from "expo-secure-store";

const editMemoryAPI = async (memoryId, data) => {
    const response = await axios.patch(process.env.EXPO_PUBLIC_BACKEND_URI + "/memoryTimeline/" + memoryId, {...data}, {
        headers: {
            Authorization: "Bearer " + await SecureStore.getItemAsync("jwt")
        }
    })

    return response
}

export default editMemoryAPI