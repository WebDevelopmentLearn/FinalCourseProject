import {IUser} from "../../utils/Entitys.ts";
import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {getUser} from "../api/actionCreators.ts";

interface IUserState {
    user: IUser | null;
    userStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    userError: any;
}

const initialState: IUserState = {
    user: null,
    userStatus: "IDLE",
    userError: null
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
        })
    }
});

export default userSlice.reducer;