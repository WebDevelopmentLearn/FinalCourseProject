import {IPostState} from "../../utils/Entitys.ts";
import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {createPost, getAllPosts, getPostById, updatePost} from "../api/actionCreators.ts";


const initialState: IPostState = {
    posts: [],
    currentPost: null,
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
            state.posts.push(action.payload?.newPost);
        }).addCase(createPost.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.error.message;
        }).addCase(updatePost.pending, (state) => {
            state.postsStatus = "LOADING";
            state.postsError = null;
        }).addCase(updatePost.fulfilled, (state, action) => {
            state.postsStatus = "SUCCESS";
            const updatedPost = action.payload?.post;
            const index = state.posts.findIndex(post => post._id === updatedPost._id);
            state.posts[index] = updatedPost;
        }).addCase(updatePost.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.error.message;
        }).addCase(getPostById.pending, (state) => {
            state.postsStatus = "LOADING";
            state.postsError = null;
        }).addCase(getPostById.fulfilled, (state, action) => {
            state.postsStatus = "SUCCESS";
            state.postsError = null;
            state.currentPost = action.payload;
        }).addCase(getPostById.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.error.message;
        });
    }
});

export default postSlice.reducer;