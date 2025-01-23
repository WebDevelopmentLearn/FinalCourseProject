
import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {getUser, updateUserProfile} from "../api/actionCreators.ts";
import {IUserState} from "../types.ts";


const initialState: IUserState = {
    user: null,
    userStatus: "IDLE",
    userError: null,

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
        })
    }
});

export default userSlice.reducer;