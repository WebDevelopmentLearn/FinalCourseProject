import {FC, ReactNode, useEffect} from "react";
import {useDispatch} from "react-redux";

import {getUser} from "../../../store/api/actionCreators.ts";
import {AppDispatch} from "../../../store/ichgramStore.ts";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({children}: ProtectedRouteProps) => {

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