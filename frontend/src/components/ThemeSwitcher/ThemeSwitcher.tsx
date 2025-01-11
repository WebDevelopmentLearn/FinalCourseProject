import styles from "./ThemeSwitcher.module.scss";
import React, {FC} from "react";

type ThemeSwitcherProps = {
    onClick(event: React.MouseEvent<HTMLInputElement>): void;
    currentTheme: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({onClick, currentTheme}) => {

    return (
        <div className={styles.theme_switcher}>
            <input
                onClick={onClick}
                className={styles.theme_switcher_input}
                type="checkbox"
                id="switch"
            />
            <label htmlFor="switch"></label>
        </div>
    );
};