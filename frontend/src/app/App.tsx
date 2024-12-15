
import './App.css'
import {MainRoute} from "../route/MainRoute.tsx";
import {Wrapper} from "../wrapper/Wrapper.tsx";
import {ThemeProvider, useTheme} from "../context/ThemeContext.tsx";
import React, {useCallback} from "react";


function App() {
    const { theme, setTheme } = useTheme();
    const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        console.log('theme', theme);
        document.documentElement.className = theme === 'light' ? 'dark-theme' : '';
    }, [theme, setTheme]);


    return (
        <div className="flex justify-center items-center">
                <Wrapper>
                    <MainRoute/>
                    {/*<button onClick={onButtonClick}>Toggle Theme</button>*/}
                </Wrapper>
        </div>
    )
}

export default App
