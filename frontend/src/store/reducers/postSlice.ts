import {IPostState} from "../../utils/Entitys.ts";
import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {createPost, getAllPosts} from "../api/actionCreators.ts";


const initialState: IPostState = {
    posts: [],
    postsStatus: "IDLE",
    postsError: null,
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder:  ActionReducerMapBuilder<IPostState>) => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.postsStatus = "LOADING";
            state.postsError = null;
        }).addCase(getAllPosts.fulfilled, (state, action) => {
            state.postsStatus = "SUCCESS";
            state.posts = action.payload;
        }).addCase(getAllPosts.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.error.message;
        }).addCase(createPost.pending, (state) => {
            state.postsStatus = "LOADING";
            state.postsError = null;
        }).addCase(createPost.fulfilled, (state, action) => {
            state.postsStatus = "SUCCESS";
            state.posts.push(action.payload);
        }).addCase(createPost.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.error.message;
        });
    }
});

export default postSlice.reducer;