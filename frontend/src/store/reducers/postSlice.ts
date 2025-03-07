import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";

import {IPostState} from "../types.ts";
import {createComment, getCommentsByPostId} from "../api/commentsActionCreators.ts";
import {
    createPost,
    deletePost,
    getAllPosts,
    getAllPostsByUser,
    getPostById,
    updatePost
} from "../api/postsActionCreators.ts";

const initialState: IPostState = {
    posts: [],
    loading: false,
    hasMore: true,
    page: 1,
    limit: 10,

    postsByUser: [],

    currentPost: null,
    postsStatus: "IDLE",
    postsError: null,

    currentPostStatus: "IDLE",
    currentPostError: null,

    createCommentStatus: "IDLE",
    createCommentError: null,

    deletePostStatus: "IDLE",
    deletePostError: null,

    currentPostComments: [],
    currentPostCommentsStatus: "IDLE",
    currentPostCommentsError: null
}


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearStatus: (state, action) => {
            // @ts-ignore
            state[action.payload] = "IDLE";
        }
    },
    extraReducers: (builder:  ActionReducerMapBuilder<IPostState>) => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.postsStatus = "LOADING";
            state.postsError = null;
            state.loading = true;
        }).addCase(getAllPosts.fulfilled, (state, action) => {
            if (!action.payload) return;
            // state.postsStatus = "SUCCESS";
            // state.posts = action.payload;
            const { posts, totalPages } = action.payload;
            state.postsStatus = "SUCCESS";
            state.posts = [...state.posts, ...posts]; // Добавляем новые посты к текущим
            state.hasMore = state.page < totalPages; // Проверяем, есть ли еще посты
            state.page += 1; // Увеличиваем номер страницы
            state.loading = false;
        }).addCase(getAllPosts.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.error.message;
            state.loading = false;
        }).addCase(createPost.pending, (state) => {
            state.postsStatus = "LOADING";
            state.postsError = null;
        }).addCase(createPost.fulfilled, (state, action) => {
            if (!action.payload) return;
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
        }).addCase(deletePost.pending, (state) => {
            state.deletePostStatus = "LOADING";
            state.deletePostError = null;
        }).addCase(deletePost.fulfilled, (state, action) => {
            state.deletePostStatus = "SUCCESS";
            state.deletePostError = null;
            state.posts = state.posts.filter(post => post._id !== action.payload.postId);
        }).addCase(deletePost.rejected, (state, action) => {
            state.deletePostStatus = "FAILED";
            state.deletePostError = action.error.message;
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
            state.postsByUser = [];
        }).addCase(getAllPostsByUser.fulfilled, (state, action) => {
            state.postsStatus = "SUCCESS";
            state.postsError = null;
            state.postsByUser = action.payload.posts;
        }).addCase(getAllPostsByUser.rejected, (state, action) => {
            state.postsStatus = "FAILED";
            state.postsError = action.payload;
        }).addCase(createComment.pending, (state) => {
            state.createCommentStatus = "LOADING";
            state.createCommentError = null;
        }).addCase(createComment.fulfilled, (state, action) => {
            state.createCommentStatus = "SUCCESS";
            state.createCommentError = null;
            state.currentPostComments.push(action.payload.newComment);
        }).addCase(createComment.rejected, (state, action) => {
            state.createCommentStatus = "LOADING";
            state.createCommentError = action.payload;
        }).addCase(getCommentsByPostId.pending, (state) => {
            state.currentPostCommentsStatus = "LOADING";
            state.currentPostCommentsError = null;
        }).addCase(getCommentsByPostId.fulfilled, (state, action) => {
            state.currentPostCommentsStatus = "SUCCESS";
            state.currentPostCommentsError = null;
            state.currentPostComments = action.payload.comments;
        }).addCase(getCommentsByPostId.rejected, (state, action) => {
            state.currentPostCommentsStatus = "FAILED";
            state.currentPostCommentsError = action.payload;
        });
    }
});

export const {clearStatus} = postSlice.actions;

export default postSlice.reducer;