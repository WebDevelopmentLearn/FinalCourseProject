import {FC, forwardRef} from "react";
import styles from "./CustomInput.module.scss";
import {CustomInputProps} from "../../utils/Entitys.ts";


export const CustomInput: FC<CustomInputProps> = forwardRef<HTMLInputElement, CustomInputProps>(({type = "text", placeholder = "", style, className, min = 3, max = 2000, id, ...rest}, ref) => {
    return (
        <input ref={ref} type={type} placeholder={placeholder}  style={style} className={`${className ?? ""} ${styles.custom_input}`} {...rest} min={min} max={max} id={id}/>
    );
});