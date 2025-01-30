import {createContext, FC, useContext, useState} from "react";
import {ThemeContextType, ThemeProviderProps} from "./types.ts";



export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children  }) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || 'light'); // Значение по умолчанию

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};