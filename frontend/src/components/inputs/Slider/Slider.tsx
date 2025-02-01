import {ChangeEvent, CSSProperties, useCallback, useState} from "react";

import styles from "./Slider.module.scss";
import {UploadImageIcon} from "../../../assets/icons/UploadImageIcon.tsx";
import {ImageCropperModal} from "../../modals/ImageCropperModal/ImageCropperModal.tsx";
import {useImages} from "../../../context/ImageContext.tsx";

interface SliderProps {
    style?: CSSProperties;
    className?: string;
    inModal?: boolean;
    isEditModal?: boolean;
    maxWidth?: number;
    maxImages?: number;
}

export const Slider = ({style, className, maxWidth = 500, maxImages = 5}: SliderProps) => {
    const [currentImg, setCurrentImg] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {currentImage, images, addImageForEditing, removeImage } = useImages();

    const handleClose = () => {
        setIsOpen(false);
    }

    const handlePrevious = useCallback(() => {
        if (images.length === maxImages) {
            setCurrentImg((prev) => prev === 0 ? 0 : prev - 1);
        } else {
            setCurrentImg((prev) => (prev === 0 ? images.length : prev - 1));
        }
    }, [images.length, maxImages]);
    //prev === postImages.length - 1 ? 0 : prev + 1


    const handleNext = useCallback(() => {
        if (images.length === maxImages) {
            setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        } else {
            setCurrentImg((prev) => (prev === images.length ? 0 : prev + 1));
        }
    }, [images.length, maxImages]);


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file: File = event.target.files[0];
            const blob = new Blob([file], { type: file.type });
            addImageForEditing(blob);

            setIsOpen(true);
        }
        event.target.value = "";
    };

    const handleDelete = (imageIndex: number): void => {
        removeImage(imageIndex)
    }

    console.log("Images: ", images);

    return (
        <div style={style} className={`${styles.slider} ${className}`}>
            <div className={styles.cards} style={{transform: `translateX(${-currentImg * maxWidth}px)`, width: (images.length > 0 ? maxWidth * images.length : maxWidth) + maxWidth}}>
                {images.map((image, index) => (
                    <div key={index} className={styles.card} style={{backgroundImage: `url(${image.url})`, width: `${maxWidth}px`,}}>
                        <button className={styles.card__delete_btn} onClick={() => handleDelete(index)}>X</button>
                        {/*<CustomButton title="X" onClick={() => handleDelete(index)} className={styles.card__delete_btn}/>*/}
                    </div>
                ))}

                {/* Last slide with file input */}
                <div style={{width: `${maxWidth}px`,}} className={`${styles.card__input_container} ${images.length >= maxImages ? styles.hidden_input : ""}`}>
                    <UploadImageIcon className={styles.card_input__icon}/>
                    <input type="file" onChange={handleFileChange}/>
                </div>
            </div>

            {(images.length > 0 && currentImg > 0) && (
                <button className={styles.previousImageBtn} onClick={handlePrevious}>
                    &lt;
                </button>
            )}

            {(images.length > 0 && currentImg !== images.length) && (
                <button className={`${styles.nextImageBtn} `} onClick={handleNext}>
                    &gt;
                </button>
            )}

            {images.length > 0 && (
                <div className={styles.rounds}>
                    {images.map((_, index) => (
                        <button key={index} className={`${styles.round} ${index === currentImg ? styles.active : ""}`} onClick={() => setCurrentImg(index)}>
                            {index + 1}
                        </button>
                    ))}
                    <button className={`${styles.round} ${currentImg === images.length ? styles.active : ""} ${images.length >= maxImages ? styles.hidden_input : ""}`} onClick={() => setCurrentImg(images.length)}>
                        {images.length + 1}
                    </button>
                </div>
            )}
            {(isOpen && currentImage) && (
                <ImageCropperModal handleClose={handleClose} imageSrc={currentImage?.url}/>
            )}
        </div>
    );
};