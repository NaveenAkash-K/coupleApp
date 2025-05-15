import {create} from 'zustand';
import authSlice from "./authSlice";

const useAppStore = create()((...args) => ({
    ...authSlice(...args)
}));

export default useAppStore;