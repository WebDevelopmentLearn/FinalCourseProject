import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../api/API.ts";
import {AxiosError} from "axios";
import {IImage} from "../../utils/types.ts";


export type CreatePost = {
    photos: FileList,
    content: string,
}

export type IUpdatePost = {
    postId: string,
    photos: FileList | IImage[],
    content: string,
}

export const createPost = createAsyncThunk("post/createPost", async ({photos, content}: CreatePost, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        const files = Array.from(photos);
        files.forEach((el) => {
            formData.append("photos", el);
        });
        formData.append('content', content);
        const response = await API.post(`/posts/create-post`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

});




export const updatePost = createAsyncThunk("post/updatePost", async ({postId, photos, content}: IUpdatePost, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        // @ts-ignore
        const files = Array.from(photos);
        files.forEach((el) => {
            // @ts-ignore
            formData.append("photos", el);
        });
        formData.append('content', content);
        const response = await API.put(`/posts/update-post/${postId}`, formData);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
});

///delete-post/:postId

export const deletePost = createAsyncThunk("post/deletePost", async ({postId}: {postId: string}, {rejectWithValue}) => {
    try {
        const response = await API.delete(`/posts/delete-post/${postId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
});


export const getAllPosts = createAsyncThunk("post/getAllPosts", async (page: number ) => {
    try {
        // const response = await API.get(`/posts/all-posts`);
        const limit = 4; // Лимит постов на страницу
        const response = await API.get(`/posts/all-posts`, { params: { page, limit } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getAllPostsByUser = createAsyncThunk("post/getAllPostsByUser", async ({userId}: {userId: string | undefined}) => {
    try {
        const response = await API.get(`/posts/posts-by-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getPostById = createAsyncThunk("post/getPostById", async ({postId}: {postId: string | undefined}) => {
    try {
        const response = await API.get(`/posts/post-by-id/${postId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
