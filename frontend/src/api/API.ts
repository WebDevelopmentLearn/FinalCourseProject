import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {NavigateFunction} from "react-router-dom";


const API: AxiosInstance = axios.create({
    baseURL: "http://192.168.2.48:3400/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


export const setupInterceptors = (navigate: NavigateFunction): void => {
    API.interceptors.response.use(
        (response) => response,
        async (error): Promise<AxiosResponse<any, any>> => {
            const originalRequest = error.config;

            if (error.response?.status === 401) {
                navigate("/signin", {
                    state: {message: "Session expired. Please log in again."},
                });
                // originalRequest._retry = true;
                //
                // try {
                //     // Обновляем accessToken
                //     // await API.post("/auth/refresh-access-token");
                //     return API(originalRequest); // Повторяем запрос
                // } catch (refreshError) {
                //     console.error("Failed to refresh token. Redirecting to sign-in.");
                //     if (refreshError instanceof AxiosError && (refreshError.response?.status === 401 || refreshError.response?.status === 403)) {
                //         navigate("/signin", {
                //             state: {message: "Session expired. Please log in again."},
                //         });
                //     }
                //     return Promise.reject(refreshError);
                // }
            }

            return Promise.reject(error);
        }
    );
};

export default API;

