import axios, {AxiosError, AxiosResponse} from "axios";
import {NavigateFunction} from "react-router-dom";


const API = axios.create({
    baseURL: "http://localhost:3400/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});



// API.interceptors.response.use(
//     (response: AxiosResponse<any, any>) => response,
//     (error) => {
//         if (error.response?.status === 401 || error.response?.status === 403) {
//             console.log("Redirecting to login page");
//             window.location.href = "/signin";
//         }
//         return Promise.reject(error);
//     }
// );


//



// Функция для установки интерсептора с передачей navigate
export const setupInterceptors = (navigate: NavigateFunction) => {
    API.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Обновляем accessToken
                    // await API.post("/auth/refresh-access-token");
                    return API(originalRequest); // Повторяем запрос
                } catch (refreshError) {
                    console.error("Failed to refresh token. Redirecting to sign-in.");
                    if (refreshError instanceof AxiosError && (refreshError.response?.status === 401 || refreshError.response?.status === 403)) {
                        navigate("/signin", {
                            state: {message: "Session expired. Please log in again."},
                        });
                    }
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );


};

export default API;

