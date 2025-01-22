import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {ILoginData, IRegisterData} from "../../utils/Entitys.ts";
import API from "../../api/API.ts";

axios.defaults.withCredentials = true;
export const BACKEND_URL: string = "http://localhost:3400/api";

export const registerUser = createAsyncThunk("auth/registerUser", async (data: IRegisterData, { rejectWithValue }) => {
    try {
        const response = await API.post(`/auth/register`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response && error.response.data.message) {
                console.log("Error message1:", error.response.data.message);
                return rejectWithValue(error.response.data.message)
            } else {
                console.log("Error message2:", error.message);
                return rejectWithValue(error.message)
            }
        }
    }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (data: ILoginData, { rejectWithValue }) => {
    try {
        // configure header's Content-Type as JSON
        const response = await API.post(`/auth/login`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response && error.response.data.message) {
                console.log("Error message1:", error.response.data.message);
                return rejectWithValue(error.response.data.message)
            } else {
                console.log("Error message2:", error.message);
                return rejectWithValue(error.message)
            }
        }
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    try {
        const response = await API.post(`/auth/logout`);
        console.log("User logged out successfully");
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

export type CreatePost = {
    photo: FileList,
    content: string,
}

export const createPost = createAsyncThunk("post/createPost", async ({photo, content}: CreatePost, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        const files = Array.from(photo);
        files.forEach((el) => {
            formData.append("photo", el);
        });
        formData.append('content', content);
        for (const [key, value] of formData.entries()) {
            console.log(`[createPost] ${key}:`, value);
        }
        const response = await API.post(`/posts/create-post`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response && error.response.data.message) {
                console.log("Error message1:", error.response.data.message);
                return rejectWithValue(error.response.data.message)
            } else {
                console.log("Error message2:", error.message);
                return rejectWithValue(error.message)
            }
        }
    }

});

export const updatePost = createAsyncThunk("post/updatePost", async ({postId, photo, content}: {postId: string, photo: FileList, content: string}, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        formData.append('photo', photo[0]);
        formData.append('content', content);
        const response = await API.put(`/posts/update-post/${postId}`, formData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response && error.response.data.message) {
                console.log("Error message1:", error.response.data.message);
                return rejectWithValue(error.response.data.message)
            } else {
                console.log("Error message2:", error.message);
                return rejectWithValue(error.message)
            }
        }
    }
});

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
    try {
        const response = await API.get(`/posts/all-posts`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getAllPostsByUser = createAsyncThunk("post/getAllPostsByUser", async ({userId}: {userId: string | undefined}) => {
    try {
        const response = await API.get(`/posts/posts-by-user/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getPostById = createAsyncThunk("post/getPostById", async ({postId}: {postId: string | undefined}) => {
    try {
        const response = await API.get(`/posts/post-by-id/${postId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});