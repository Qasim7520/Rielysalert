import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: Cookies.get('token') || Cookies.get('googleToken') ? true : false
    },
    reducers: {
        login(state) {
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
            Cookies.remove('token');
            Cookies.remove('UserId');
        },
    },
});
export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer,
});
