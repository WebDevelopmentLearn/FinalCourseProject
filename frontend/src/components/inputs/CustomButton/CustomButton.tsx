import {CSSProperties, FC} from "react";

import styles from "./CustomButton.module.scss";

interface CustomButtonProps {
    title?: string;
    type?: "button" | "submit" | "reset";
    styles?: CSSProperties;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({type = "button", onClick, className, title = "Sign up", disabled = false}) => {
    return (
        <button disabled={disabled} type={type} className={`${className} ${styles.custom_button}`} style={styles} onClick={onClick}>{title}</button>
    );
};