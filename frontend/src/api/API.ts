import axios, {AxiosResponse} from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";


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
// API.interceptors.request.use(async (config) => {
//     const originalRequest = config;
//
//     try {
//         // Проверяем, не истёк ли токен
//         const response = await API.post('/auth/refresh-access-token');
//         console.log("Access token refreshed successfully: ", response.data.accessToken);
//         if (response.data.accessToken) {
//             // Обновление токена прошло успешно
//             originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
//         }
//     } catch (error) {
//         // Если refresh тоже истёк, перенаправляем на логин
//         window.location.href = "/signin";
//     }
//
//     return originalRequest;
// });


// Функция для установки интерсептора с передачей navigate
export const setupInterceptors = (navigate: NavigateFunction) => {
    API.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate("/signin"); // Используем navigate для редиректа
            }
            return Promise.reject(error);
        }
    );
};

export default API;

