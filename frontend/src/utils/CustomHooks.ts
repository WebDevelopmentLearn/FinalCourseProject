import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {AppDispatch} from "../store/ichgramStore.ts";
import {RootState} from "@reduxjs/toolkit/query";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import API from "../api/API.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// Типизированный selector
export const useAppSelector: TypedUseSelectorHook<RootState<any, any, any>> = useSelector;


export const useCheckMyAccess = (targetUserId: string | undefined, secondTargetUserId: string | undefined) => {
    return targetUserId !== undefined && secondTargetUserId !== undefined && targetUserId === secondTargetUserId;
}


export const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log("Checking access token...");
                // Проверяем валидность accessToken через сервер
                await API.get("/auth/check-access-token");
            } catch (error: any) {
                console.error("Access token is invalid or expired");
                if (error.response?.status === 401) {
                    try {
                        console.log("Refreshing access token...");
                        // Если accessToken истек, обновляем его через refreshToken
                        await API.post("/auth/refresh-access-token");
                        console.log("Access token refreshed successfully.");
                    } catch (refreshError) {
                        console.error("Refresh token is invalid or expired");
                        // Редирект на страницу логина, если обновление не удалось
                        navigate("/signin", {
                            state: { message: "Session expired. Please log in again." },
                        });
                    }
                }
            }
        };

        checkAuth();
    }, [navigate]);
};
