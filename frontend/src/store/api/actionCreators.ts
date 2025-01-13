import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
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