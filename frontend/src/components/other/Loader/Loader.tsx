import {CSSProperties} from "react";

import styles from "./Loader.module.scss";

export const Loader = ({size = "40px", color = "black", speed = "0.9s", stroke = "5px",}) => {

    const style: CSSProperties = {
        "--uib-size": size,
        "--uib-color": color,
        "--uib-speed": speed,
        "--uib-stroke": stroke,
    } as CSSProperties; // Explicit cast to allow custom properties.

    return (
        <div className={styles.loader} style={style}></div>
    );
};