import {useNavigate} from "react-router-dom";
import {FC, ReactNode, useEffect} from "react";
import API from "../../api/API.ts";
import {AxiosError} from "axios";
import {getUser} from "../../store/api/actionCreators.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/ichgramStore.ts";

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

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log("Checking access token");
                await API.get("/auth/check-access-token"); // Проверка токена на сервере
            } catch (error) {
                if (error instanceof AxiosError) {
                   // console.log("Error during token check:", error.response?.status);
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        navigate("/signin", {
                            state: {message: "You need to sign in to access this page"}
                        }); // Перенаправление на страницу логина
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