import React, {FC} from "react";
import styles from "./CustomInput.module.scss";

type CustomInputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";


type CustomInputProps = {
    type: CustomInputType;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

export const CustomInput: FC<CustomInputProps> = ({type = "text", value = "", placeholder = "", onChange, style, className}) => {
    return (
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} style={style} className={`${className ?? ""} ${styles.custom_input}`}/>
    );
};