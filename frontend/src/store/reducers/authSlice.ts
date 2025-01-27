import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";

import {loginUser, logoutUser, registerUser} from "../api/actionCreators.ts";
import {IAuthState} from "../types.ts";

const initialState: IAuthState = {
    registerStatus: "IDLE",
    loginStatus: "IDLE",
    logoutStatus: "IDLE",

    registerError: null,
    loginError: null,
    logoutError: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearStatus: (state, action) => {
            state[action.payload] = "IDLE";
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<IAuthState>) => {
        builder.addCase(registerUser.pending, (state) => {
            state.registerError = null;
            state.registerStatus = "LOADING";
        }).addCase(registerUser.fulfilled, (state) => {
            state.registerStatus = "SUCCESS";
            state.registerError = null;
        }).addCase(registerUser.rejected, (state, action) => {
            state.registerStatus = "FAILED";
            state.registerError = action.payload;
        }).addCase(loginUser.pending, (state) => {
            state.loginError = null;
            state.loginStatus = "LOADING";
        }).addCase(loginUser.fulfilled, (state) => {
            state.loginStatus = "SUCCESS";
            state.loginError = null;
        }).addCase(loginUser.rejected, (state, action) => {
            state.loginStatus = "FAILED";
            state.loginError = action.payload;
        }).addCase(logoutUser.pending, (state) => {
            state.logoutError = null;
            state.logoutStatus = "LOADING";
        }).addCase(logoutUser.fulfilled, (state) => {
            state.logoutStatus = "SUCCESS";
            state.logoutError = null;
        }).addCase(logoutUser.rejected, (state, action) => {
            state.logoutStatus = "FAILED";
            state.logoutError = action.error;
        });

    }
});

export const {clearStatus} = authSlice.actions;
export default authSlice.reducer;