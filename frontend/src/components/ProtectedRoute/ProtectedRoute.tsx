import {useNavigate} from "react-router-dom";
import {FC, ReactNode, useEffect} from "react";
import API from "../../api/API.ts";
import {AxiosError} from "axios";

type ProtectedRouteProps = {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({children}: ProtectedRouteProps) => {

    const navigate = useNavigate();



    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log("Checking access token");
                await API.get("/auth/check-access-token"); // Проверка токена на сервере
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log("Error during token check:", error.response?.status);
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        navigate("/signin"); // Перенаправление на страницу логина
                    }
                } else {
                    console.log(error);
                }
            }
        };

        // Вызов асинхронной функции внутри useEffect
        checkAuth();
    }, [navigate]); // Перезапускаем эффект, если navigate меняется

    return (
        <>
            {children}
        </>
    );
};