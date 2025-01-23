
import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {createPost, getAllPosts, getAllPostsByUser, getPostById, updatePost} from "../api/actionCreators.ts";
import {IPostState} from "../types.ts";


const initialState: IPostState = {
    posts: [],
    currentPost: null,
    postsStatus: "IDLE",
    postsError: null,

    currentPostStatus: "IDLE",
    currentPostError: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearStatus: (state, action) => {
            state[action.payload] = "IDLE";
        }
    },
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
            state.currentPostStatus = "LOADING";
            state.currentPostError = null;
        }).addCase(getPostById.fulfilled, (state, action) => {
            state.currentPostStatus = "SUCCESS";
            state.currentPostError = null;
            state.currentPost = action.payload;
        }).addCase(getPostById.rejected, (state, action) => {
            state.currentPostStatus = "FAILED";
            state.postsError = action.error.message;
        }).addCase(getAllPostsByUser.pending, (state) => {
            state.postsStatus = "LOADING";
            state.postsError = null;
        }).addCase(getAllPostsByUser.fulfilled, (state, action) => {
            state.postsStatus = "SUCCESS";
            state.postsError = null;
            state.posts = action.payload;
        }).addCase(getAllPostsByUser.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.payload;
        });
    }
});

export const {clearStatus} = postSlice.actions;

export default postSlice.reducer;