import {useEffect, useState} from "react";

import styles from "./Phone.module.scss";
import screenshot1 from "../../assets/signin/screenshot1-2x.png"
import screenshot2 from "../../assets/signin/screenshot2-2x.png"
import screenshot3 from "../../assets/signin/screenshot3-2x.png"
import screenshot4 from "../../assets/signin/screenshot4-2x.png"

const imageArray: string[] = [screenshot1, screenshot2, screenshot3, screenshot4];

export const Phone = () => {
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
        }, 5000);

        return () => clearInterval(interval);

    }, [imageArray.length]);

    return (
        <div className={styles.signin_image_container}>
            {imageArray.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    loading={"lazy"}
                    alt={`Slide ${index}`}
                    className={`${styles.slider_image} ${
                        index === currentIndex ? styles.fade_in : styles.fade_out
                    }`}
                />
            ))}
        </div>
    );
};