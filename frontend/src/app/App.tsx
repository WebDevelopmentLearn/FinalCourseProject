import {useEffect} from "react";
import {useLocation, useNavigate, Location, NavigateFunction} from "react-router-dom";

import './App.css'
import {MainRoute} from "../route/MainRoute.tsx";

import {CreatePostModal, Footer, Sidebar, Wrapper} from "../components";
import {setupInterceptors} from "../api/API.ts";
import {ToastContainer} from "react-toastify";
import {useTheme} from "../context/ThemeContext.tsx";
import {useAppSelector} from "../utils/CustomHooks.ts";

function App() {

    const routesWithoutNavbar: string[] = ["/signin", "/signup", "/forgot_password"];

    const location: Location<any> = useLocation();
    const {createPostModalIsOpen} = useAppSelector(state => state.modalReducer);
    const navigate: NavigateFunction = useNavigate();
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
                <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
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
