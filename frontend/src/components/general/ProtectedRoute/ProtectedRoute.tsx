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

    //useAuth();//вызов хука для проверки авторизации

    return (
        <>
            {children}
        </>
    );
};