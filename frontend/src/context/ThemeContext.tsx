import React, {createContext, Dispatch, FC, SetStateAction, useContext, useState} from "react";

interface ThemeContextType {
    theme: string;
    setTheme(theme: string): Dispatch<SetStateAction<string>>;
}

/**
 * Контекст переключения темы приложения
 */
// const ThemeContext: Context<string> = createContext("light");
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: React.ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children  }) => {
    const [theme, setTheme] = useState('light'); // Значение по умолчанию



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