import {ChangeEvent, FC, useEffect, useState} from "react";

import styles from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
    onChange(event: ChangeEvent<HTMLInputElement>): void;
    currentTheme: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({onChange}) => {
    const initialTheme = localStorage.getItem("theme") ?? "light";

    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
        if (onChange) {
            onChange(e);
        }
    };
    return (
        <div className={styles.theme_switcher}>
            <input
                onChange={handleChange}
                className={styles.theme_switcher_input}
                type="checkbox"
                id="switch"
                value="light"
                checked={theme === "dark"}
            />
            <label htmlFor="switch"></label>
        </div>
    );
};