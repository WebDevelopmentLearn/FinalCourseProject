import React, {createContext, Dispatch, FC, SetStateAction, useContext, useState} from "react";

interface ThemeContextType {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
}

type ThemeProviderProps = {
    children: React.ReactNode
}

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