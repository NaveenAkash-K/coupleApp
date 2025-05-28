import axios from "axios";

const signupAPI = async (data) => {
    const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URI + "/auth/signup",
        {...data}
    );

    return response
}

export default signupAPI