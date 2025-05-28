import * as SecureStore from "expo-secure-store";

const authSlice = (set, get, api) => ({
    isLoggedIn: false,
    // userId: null,
    // inviteId: null,
    // username: null,
    // isLinked: false,

    setAuthState: (bool) => set({isLoggedIn: bool}),
    // modifyAuthSlice: (key, value) => set({[key]: value}),
})

export default authSlice