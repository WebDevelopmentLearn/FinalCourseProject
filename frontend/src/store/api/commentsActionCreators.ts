import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../api/API.ts";


export const getCommentsByPostId = createAsyncThunk("comments/getCommentsByPostId", async (postId: string) => {
    try {
        const response = await API.get(`/comments/get-comments/${postId}`);
        return response.data;

    } catch (error: unknown) {
        console.log("Error in getCommentsByPostId: ", error);
        throw error;
    }
});


export const createComment = createAsyncThunk("post/createComment", async ({postId, content}: {postId: string, content: string}) => {
    try {
        const formData = new FormData();
        formData.append('content', content);
        for (const [key, value] of formData.entries()) {
            console.log(`[createComment] ${key}:`, value);
        }
        const response = await API.post(`/comments/create-comment/${postId}`, formData);
        console.log(response.data);
        return response.data;
        // const response = await API.get(`/posts/create-comment/`);

    } catch (error) {
        console.log(error);
        throw error;
    }
});