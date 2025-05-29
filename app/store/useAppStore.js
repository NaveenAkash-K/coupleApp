import {create} from "zustand/index";
import authSlice from "./authSlice";
import memoryTimelineSlice from "./memoryTimelineSlice";
import coupleSlice from "./coupleSlice";

const createSliceSetter = (sliceKey, set) => {
    return (partial) =>
        set((state) => ({
            [sliceKey]: {
                ...state[sliceKey],
                ...partial,
            },
        }));
}

const useAppStore = create()((set, get, api) => {
    return {
        authSlice: authSlice(createSliceSetter("authSlice", set), get, api),
        memoryTimelineSlice: memoryTimelineSlice(createSliceSetter("memoryTimelineSlice", set), get, api),
        coupleSlice: coupleSlice(createSliceSetter("coupleSlice", set), get, api),
    }
})

export default useAppStore;