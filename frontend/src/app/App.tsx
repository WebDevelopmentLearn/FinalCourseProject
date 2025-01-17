
import './App.css'
import {MainRoute} from "../route/MainRoute.tsx";
import {Wrapper} from "../wrapper/Wrapper.tsx";
import {CreatePostModal, Footer, Sidebar} from "../components";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppSelector} from "../utils/CustomHooks.ts";
import API, {setupInterceptors} from "../api/API.ts";
import {AxiosError} from "axios";
import {userData} from "../store/selectors.ts";
import {RootState} from "../store/ichgramStore.ts";
import {ImageProvider} from "../context/ImageContext.tsx";

function App() {

    const location = useLocation();
    // Список маршрутов, где нужно отобразить элемент
    const routesWithNavbar = ["/signin", "/signup", "/forgot_password"];

    const {createPostModalIsOpen} = useSelector((state: RootState) => state.modalReducer);

    const user = useSelector(userData);
    const navigate = useNavigate();
    useEffect(() => {
        setupInterceptors(navigate); // Передаём navigate в интерсептор
    }, [navigate]);

    return (
        <div className="app">
            <div className="sidebar_and_wrapper">
                {!routesWithNavbar.includes(location.pathname) && <Sidebar/>}
                {!routesWithNavbar.includes(location.pathname) ? (<div className="wrapper_and_footer">
                    <Wrapper>
                        <MainRoute/>
                        {createPostModalIsOpen && (
                            <ImageProvider>
                                <CreatePostModal />
                            </ImageProvider>
                        )}
                    </Wrapper>
                    <Footer/>
                </div>) : (
                    <div className="without_wrapper">
                        <MainRoute/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
