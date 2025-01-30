import React, {FC, forwardRef} from "react";

import styles from "./CustomInput.module.scss";

type CustomInputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color" | "file";

interface CustomInputProps {
    type: CustomInputType;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number | string;
    max?: number | string;
    id?: string;
}

export const CustomInput: FC<CustomInputProps> = forwardRef<HTMLInputElement, CustomInputProps>(({type = "text", placeholder = "", style, className, min = 3, max = 2000, id, ...rest}, ref) => {
    return (
        <input ref={ref} type={type} placeholder={placeholder}  style={style} className={`${className ?? ""} ${styles.custom_input}`} {...rest} min={min} max={max} id={id}/>
    );
});