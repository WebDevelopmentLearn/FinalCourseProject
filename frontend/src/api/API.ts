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
    // Добавляем интерсептор для обработки ответов
    // API.interceptors.response.use(
    //     // Первый аргумент: успешные ответы
    //     (response: AxiosResponse) => {
    //         return response; // Просто возвращаем ответ без изменений
    //     },
    //     // Второй аргумент: обработка ошибок
    //     async (error): Promise<AxiosResponse<any, any>> => {
    //         const originalRequest = error.config;
    //         // Проверяем статус ошибки (401) и отсутствие флага _retry, чтобы не зациклить запрос
    //         if (error.response?.status === 401 && !originalRequest._retry) {
    //             originalRequest._retry = true; // Помечаем запрос, чтобы он не повторялся несколько раз
    //             try {
    //                 // Попытка обновления токена
    //                 // Здесь вызывается endpoint для обновления accessToken
    //                 await API.post("/auth/refresh-access-token");
    //                 // После успешного обновления токена повторяем исходный запрос
    //                 return API(originalRequest);
    //             } catch (refreshError) {
    //                 console.error("Failed to refresh token. Redirecting to sign-in.");
    //                 // Если обновление токена не удалось, проверяем статус ответа
    //                 if (
    //                     refreshError instanceof AxiosError &&
    //                     (refreshError.response?.status === 401 || refreshError.response?.status === 403)
    //                 ) {
    //                     // Перенаправляем пользователя на страницу входа
    //                     navigate("/signin", {
    //                         state: { message: "Session expired. Please log in again." }, // Сообщение для пользователя
    //                     });
    //                 }
    //                 // Отклоняем промис с ошибкой обновления токена
    //                 return Promise.reject(refreshError);
    //             }
    //         }
    //         // Если ошибка не связана с 401 или _retry, отклоняем промис с исходной ошибкой
    //         return Promise.reject(error);
    //     }
    // );


    API.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    // Обновляем токен через refreshToken
                    await API.post("/auth/refresh-access-token");
                    return API(originalRequest); // Повторяем исходный запрос
                } catch (refreshError) {
                    console.error("Failed to refresh token. Redirecting to login...");
                    // window.location.href = "/signin";
                    navigate("/signin", {
                        state: { message: "Session expired. Please log in again." }, // Сообщение для пользователя
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

