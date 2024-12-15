import React, {FC, forwardRef} from "react";
import styles from "./CustomInput.module.scss";

type CustomInputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";


type CustomInputProps = {
    type: CustomInputType;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}



export const CustomInput: FC<CustomInputProps> = forwardRef<HTMLInputElement, CustomInputProps>(({type = "text", placeholder = "", style, className, ...rest}, ref) => {
    return (
        <input ref={ref} type={type} placeholder={placeholder}  style={style} className={`${className ?? ""} ${styles.custom_input}`} {...rest}/>
    );
});