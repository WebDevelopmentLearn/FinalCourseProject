import {FC, ReactNode, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

import API from "../../../api/API.ts";
import {getUser} from "../../../store/api/actionCreators.ts";
import {AppDispatch} from "../../../store/ichgramStore.ts";
import {useAuth} from "../../../utils/CustomHooks.ts";

type ProtectedRouteProps = {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({children}: ProtectedRouteProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(getUser());
                if (getUser.fulfilled.match(result)) {
                    console.log("getUser.fulfilled");
                }
            } catch (error) {
                console.log("getUser.rejected");
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             console.log("Checking access token");
    //             await API.get("/auth/check-access-token"); // Проверяем актуальность токена
    //         } catch (error) {
    //            if (error instanceof AxiosError && error.response?.status === 401) {
    //                try {
    //                    console.log("Refreshing access token");
    //                    await API.post("/auth/refresh-access-token"); // Обновляем токен
    //                } catch (refreshError) {
    //                    console.error("Failed to refresh access token");
    //                    navigate("/signin", {
    //                        state: { message: "Session expired. Please log in again." },
    //                    });
    //                }
    //            } else {
    //                console.error("Error during auth check:", error);
    //            }
    //         }
    //     };
    //
    //     // Вызов асинхронной функции внутри useEffect
    //     checkAuth();
    // }, [navigate]); // Перезапускаем эффект, если navigate меняется

    useAuth();
    return (
        <>
            {children}
        </>
    );
};