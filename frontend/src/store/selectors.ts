import {createSelector} from "@reduxjs/toolkit";

import {RootState} from "./ichgramStore.ts";
import {IPostState, IUserState} from "./types.ts";

const userSlice = (state: RootState) => state.userReducer;
export const userData = createSelector(userSlice, (state: IUserState) => state.user);

const postSlice = (state: RootState) => state.postReducer;
export const posts = createSelector(postSlice, (state: IPostState) => state.posts);

// const authSlice = (state: RootState) => state.authReducer;
// export const registerStatus = createSelector(authSlice, (state: IAuthState) => state.registerStatus);