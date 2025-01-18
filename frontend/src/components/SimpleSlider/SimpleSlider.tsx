import {SliderProps} from "../../utils/Entitys.ts";
import {useCallback, useState} from "react";
import styles from "./SimpleSlider.module.scss";

export const SimpleSlider = ({style, className, maxWidth, maxImages = 5, postImages = [], inModal = false}: SliderProps) => {
    const [currentImg, setCurrentImg] = useState<number>(0);

    const handlePrevious = useCallback((event) => {
        event.stopPropagation();
        setCurrentImg((prev) => {
            return prev === postImages.length - 1 ? 0 : prev - 1;
        });
    }, [postImages.length]);


    const handleNext = useCallback((event) => {
        event.stopPropagation();
        // setCurrentImg((prev) => (prev === postImages.length ? 0 : prev + 1));
        setCurrentImg((prev) => {
            return prev === postImages.length - 1 ? 0 : prev + 1;
        })
    }, [postImages.length]);

    return (
        <div style={style} className={`${styles.slider} ${className}`}>
            <div className={`${styles.cards} ${inModal ? styles.cards_height : ""}`} style={{transform: `translateX(${-currentImg * maxWidth}px)`, maxWidth: maxWidth * postImages.length}}>
                {postImages.length > 0 && postImages.map((image, index) => (
                    // <div key={index} className={styles.card} style={{backgroundImage: `url(${image})`, maxWidth: `${maxWidth}px`,}}>
                    //     {/*<button className={styles.card__delete_btn} onClick={() => handleDelete(image.url)}>X</button>*/}
                    // </div>
                    <img className={styles.card} key={index} src={image} alt=""/>
                ))}
            </div>

            {(postImages.length > 1 &&  currentImg > 0) && (
                <button className={styles.previousImageBtn} onClick={handlePrevious}>
                    &lt;
                </button>
            )}

            {(postImages.length > 1 && currentImg !== postImages.length - 1) && (
                <button className={`${styles.nextImageBtn} ${postImages.length >= maxImages ? styles.hidden_input : ""}`} onClick={handleNext}>
                    &gt;
                </button>
            )}

            {postImages.length > 1 && (
                <div className={styles.rounds}>
                    {postImages.map((_, index) => (
                        <button key={index} className={`${styles.round} ${index === currentImg ? styles.active : ""}`} onClick={() => setCurrentImg(index)}>
                            {index + 1}
                        </button>
                    ))}

                </div>
            )}
            {/*{isOpen && (*/}
            {/*    <ImageCropperModal handleClose={handleClose} imageSrc={currentImage.url}/>*/}
            {/*)}*/}
        </div>
    );
};