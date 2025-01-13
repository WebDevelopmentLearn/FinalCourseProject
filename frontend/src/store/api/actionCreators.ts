import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ILoginData, IRegisterData} from "../../utils/Entitys.ts";
import API from "../../api/API.ts";

axios.defaults.withCredentials = true;
export const BACKEND_URL: string = "http://localhost:3400/api";

export const registerUser = createAsyncThunk("auth/registerUser", async (data: IRegisterData) => {
    try {
        const response = await API.post(`/auth/register`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (data: ILoginData, { rejectWithValue }) => {
    try {
        // configure header's Content-Type as JSON
        const response = await API.post(`/auth/login`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
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
        console.log("User logged out successfully");
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getUser = createAsyncThunk("auth/getUser", async () => {
    try {
        const response = await API.get(`/user/profile`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});