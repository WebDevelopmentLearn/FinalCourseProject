import styles from "./CustomButton.module.scss";
import {FC} from "react";
import {CustomButtonProps} from "../../utils/Entitys.ts";

export const CustomButton: FC<CustomButtonProps> = ({type = "button", onClick, className, title = "Sign up", disabled = false}) => {
    return (
        <button disabled={disabled} type={type} className={`${className} ${styles.custom_button}`} style={styles} onClick={onClick}>{title}</button>
    );
};