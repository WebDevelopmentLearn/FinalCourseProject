import React, {FC, useEffect, useState} from "react";

import styles from "./ThemeSwitcher.module.scss";

type ThemeSwitcherProps = {
    onClick(event: React.MouseEvent<HTMLInputElement>): void;
    currentTheme: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({onClick}) => {
    const initialTheme = localStorage.getItem("theme") ?? "light";

    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleChange = (e) => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
        if (onClick) {
            onClick(e);
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