
const authSlice = (set, get, api) => ({
    isLoggedIn: false,
    userId: null,
    inviteId: null,
    username: null,
    isLinked: false,

    setAuthState: (bool) => set({isLoggedIn: bool}),
    modifyAuthSlice: (key, value) => set({[key]: value}),
    clearAuthSlice: () => {
        set({isLoggedIn: false})
        set({userId: null})
        set({inviteId: null})
        set({username: null})
        set({isLinked: false})
    }
})

export default authSlice