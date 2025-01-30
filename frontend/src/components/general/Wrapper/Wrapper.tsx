import React, {FC} from "react";

import styles from "./Wrapper.module.scss";

interface WrapperProps {
    children: React.ReactNode,
}

export const Wrapper: FC<WrapperProps> = ({children}) => {

    return (
        <main className={`${styles.wrapper}`}>
            {children}
        </main>
    );
};