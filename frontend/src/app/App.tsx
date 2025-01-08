
import './App.css'
import {MainRoute} from "../route/MainRoute.tsx";
import {Wrapper} from "../wrapper/Wrapper.tsx";
import {Footer, Sidebar} from "../components";
import {useLocation} from "react-router-dom";

function App() {

    const location = useLocation();
    // Список маршрутов, где нужно отобразить элемент
    const routesWithNavbar = ["/signin", "/signup", "/forgot_password"];

    return (
        <div className="app">
            <div className="sidebar_and_wrapper">
                {!routesWithNavbar.includes(location.pathname) && <Sidebar/>}
                {!routesWithNavbar.includes(location.pathname) ? (<div className="wrapper_and_footer">
                    <Wrapper>
                        <MainRoute/>
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
