import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginData, IRegisterData} from "../../utils/types.ts";
import API from "../../api/API.ts";
import {AxiosError} from "axios";


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