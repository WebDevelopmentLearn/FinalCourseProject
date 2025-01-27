import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";

import {getUser, getUserById, updateUserProfile} from "../api/actionCreators.ts";
import {IUserState} from "../types.ts";


const initialState: IUserState = {
    user: null,
    userStatus: "IDLE",
    userError: null,

    currentUser: null,
    currentUserStatus: "IDLE",
    currentUserError: null,

    updateProfileStatus: "IDLE",
    updateProfileError: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
        builder.addCase(getUser.pending, (state) => {
            state.userStatus = "LOADING";
            state.userError = null;
        }).addCase(getUser.fulfilled, (state, action) => {
            state.userStatus = "SUCCESS";
            state.user = action.payload;

        }).addCase(getUser.rejected, (state, action) => {
            state.userStatus = "FAILED";
            state.userError = action.error;
        }).addCase(updateUserProfile.pending, (state) => {
            state.updateProfileStatus = "IDLE";
            state.updateProfileError = null;
        }).addCase(updateUserProfile.fulfilled, (state) => {
            state.updateProfileStatus = "SUCCESS";
            state.updateProfileError = null;
        }).addCase(updateUserProfile.rejected, (state, action) => {
            state.updateProfileStatus = "FAILED";
            state.updateProfileError = action.payload;
        }).addCase(getUserById.pending, (state) => {
            state.currentUserStatus = "LOADING";
            state.currentUserError = null;
        }).addCase(getUserById.fulfilled, (state, action) => {
            state.currentUserStatus = "LOADING";
            state.currentUserError = null;
            state.currentUser = action.payload;
        }).addCase(getUserById.rejected, (state, action) => {
            state.currentUserStatus = "FAILED";
            state.currentUserError = action.payload;
        });
    }
});

export default userSlice.reducer;