import axios, {AxiosInstance} from "axios";
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
        async (error) => {
            const originalRequest = error.config;

            // Проверяем, что ошибка 401 и это не повторный запрос на обновление токена
            if (error.response?.status === 401 && (error.response.data.message === "Refresh token is required" || error.response.data.message === "Access token is required") && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Проверяем, что ошибка была вызвана отсутствием токенов
                    if (error.response.data.message === "Refresh token is required") {
                        console.error("No refresh token found. Redirecting to login...");
                        navigate("/signin", {
                            state: { message: "Session expired. Please log in again." }, // Сообщение для пользователя
                        });
                        return Promise.reject(error);
                    }

                    // Пробуем обновить токен
                    await API.post("/auth/refresh-access-token");
                    return API(originalRequest); // Повторяем исходный запрос
                } catch (refreshError) {
                    console.error("Failed to refresh token. Redirecting to login...");
                    navigate("/signin", {
                        state: { message: "Session expired. Please log in again." },
                    });
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};

// export const setupInterceptors = (navigate: NavigateFunction): void => {
//     API.interceptors.response.use(
//         (response) => response,
//         async (error): Promise<AxiosResponse<any, any>> => {
//             const originalRequest = error.config;
//
//             if (error.response?.status === 401) {
//                 navigate("/signin", {
//                     state: {message: "Session expired. Please log in again."},
//                 });
//                 // originalRequest._retry = true;
//                 //
//                 // try {
//                 //     // Обновляем accessToken
//                 //     // await API.post("/auth/refresh-access-token");
//                 //     return API(originalRequest); // Повторяем запрос
//                 // } catch (refreshError) {
//                 //     console.error("Failed to refresh token. Redirecting to sign-in.");
//                 //     if (refreshError instanceof AxiosError && (refreshError.response?.status === 401 || refreshError.response?.status === 403)) {
//                 //         navigate("/signin", {
//                 //             state: {message: "Session expired. Please log in again."},
//                 //         });
//                 //     }
//                 //     return Promise.reject(refreshError);
//                 // }
//             }
//
//             return Promise.reject(error);
//         }
//     );
// };

export default API;

