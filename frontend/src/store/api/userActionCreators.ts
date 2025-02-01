import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import API from "../../api/API.ts";

export const getUser = createAsyncThunk("auth/getUser", async () => {
    try {
        const response = await API.get(`/user/profile`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
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
        throw error;
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


export const followUser = createAsyncThunk("user/followUser", async ({userId}: {userId: string}) => {
    try {
        const response = await API.put(`/user/follow/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});