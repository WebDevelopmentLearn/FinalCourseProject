
import styles from "./CustomButton.module.scss";
import {CSSProperties, FC} from "react";

type CustomButtonProps = {
    title?: string;
    type?: "button" | "submit" | "reset";
    styles?: CSSProperties;
    onClick?: () => void;
    className?: string;
}


export const CustomButton: FC<CustomButtonProps> = ({type = "button", onClick, className, title = "Sign up"}) => {


    return (
        <button type={type} className={`${className} ${styles.custom_button}`} style={styles} onClick={onClick}>{title}</button>
    );
};