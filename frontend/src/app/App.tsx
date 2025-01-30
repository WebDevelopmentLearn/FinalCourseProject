import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

import './App.css'
import {MainRoute} from "../route/MainRoute.tsx";

import {CreatePostModal, Footer, Sidebar, Wrapper} from "../components";
import {setupInterceptors} from "../api/API.ts";
import {RootState} from "../store/ichgramStore.ts";
import {ToastContainer} from "react-toastify";
import {useTheme} from "../context/ThemeContext.tsx";

function App() {

    const routesWithoutNavbar = ["/signin", "/signup", "/forgot_password"];

    const location = useLocation();
    const {createPostModalIsOpen} = useSelector((state: RootState) => state.modalReducer);
    const navigate = useNavigate();
    const {theme} = useTheme();

    useEffect(() => {
        document.documentElement.className = theme === 'light' ? '' : 'dark-theme';
    }, [theme]);

    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

    return (
        <div className="app">
            <div className="sidebar_and_wrapper">
                <ToastContainer theme={theme === "dark" ? "light" : "dark"} />
                {!routesWithoutNavbar.includes(location.pathname) && <Sidebar/>}
                {!routesWithoutNavbar.includes(location.pathname) ? (<div className="wrapper_and_footer">
                    <Wrapper>
                        <MainRoute/>
                        {createPostModalIsOpen && (
                                <CreatePostModal />
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
