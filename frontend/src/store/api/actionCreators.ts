import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

import {ILoginData, IRegisterData} from "../../utils/Entitys.ts";
import API from "../../api/API.ts";

axios.defaults.withCredentials = true;
export const BACKEND_URL: string = "http://localhost:3400/api";

export const registerUser = createAsyncThunk("auth/registerUser", async (data: IRegisterData, { rejectWithValue }) => {
    try {
        const response = await API.post(`/auth/register`, data);
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

export const loginUser = createAsyncThunk("auth/loginUser", async (data: ILoginData, { rejectWithValue }) => {
    try {
        const response = await API.post(`/auth/login`, data);
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

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    try {
        const response = await API.post(`/auth/logout`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getUser = createAsyncThunk("auth/getUser", async () => {
    try {
        const response = await API.get(`/user/profile`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getUserById = createAsyncThunk("auth/getUserById", async ({userId}: {userId: string}) => {
    try {
        console.log("Userid: ", userId);
        const response = await API.get(`/user/profile/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export type CreatePost = {
    photos: FileList,
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

export const updatePost = createAsyncThunk("post/updatePost", async ({postId, photos, content}: {postId: string, photos: FileList, content: string}, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        formData.append('photos', photos[0]);
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

export const getAllPosts = createAsyncThunk("post/getAllPosts", async (page: number) => {
    try {
        // const response = await API.get(`/posts/all-posts`);
        const limit = 4; // Лимит постов на страницу
        const response = await API.get(`/posts/all-posts`, { params: { page, limit } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getAllPostsByUser = createAsyncThunk("post/getAllPostsByUser", async ({userId}: {userId: string | undefined}) => {
    try {
        const response = await API.get(`/posts/posts-by-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getPostById = createAsyncThunk("post/getPostById", async ({postId}: {postId: string | undefined}) => {
    try {
        const response = await API.get(`/posts/post-by-id/${postId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});


export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async (
    {avatar, username, bio, website}: {avatar?: File, username?: string, bio?: string, website?: string},
    {rejectWithValue}) => {
    try {
        const formData = new FormData();
        if (avatar) formData.append("avatar", avatar);
        if (username) formData.append("username", username);
        if (bio) formData.append("bio", bio);
        if (website) formData.append("website", website);

        const response = await API.put(`/user/update-profile/`, formData, {
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
    }
});
