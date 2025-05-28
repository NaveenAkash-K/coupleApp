import axios from "axios";

const verifyOtpAPI = async (data) => {
    const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URI + "/auth/verifyOtp",
        {...data}
    );

    return response
}

export default verifyOtpAPI