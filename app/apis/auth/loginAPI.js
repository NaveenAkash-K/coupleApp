import axios from "axios";

const loginAPI = async (data) => {
    const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URI + "/auth/login",
        {...data}
    );

    return response
}

export default loginAPI