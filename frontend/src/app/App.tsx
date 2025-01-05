
import './App.css'
import {MainRoute} from "../route/MainRoute.tsx";
import {Wrapper} from "../wrapper/Wrapper.tsx";
import {ThemeProvider, useTheme} from "../context/ThemeContext.tsx";
import React, {useCallback} from "react";
import {Footer, Sidebar, ThemeSwitcher} from "../components";
import {useLocation} from "react-router-dom";


function App() {



    const location = useLocation();
    // Список маршрутов, где нужно отобразить элемент
    const routesWithNavbar = ["/signin", "/signup", "/forgot_password"];

    return (
        <div className="app">
            {/*<div className="test">*/}
            {!routesWithNavbar.includes(location.pathname) && <Sidebar/>}

                <Wrapper>
                    {/*<ThemeSwitcher onClick={onButtonClick} currentTheme={theme}/>*/}
                    <MainRoute/>
                </Wrapper>
            {!routesWithNavbar.includes(location.pathname) && <Footer/>}
            {/*</div>*/}
            {/*<Footer />*/}
        </div>
    )
}

export default App
