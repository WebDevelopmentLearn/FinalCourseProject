import React, {ChangeEvent, CSSProperties, useCallback, useState} from "react";

import styles from "./SimpleSlider.module.scss";
import {UploadImageIcon} from "../../../assets/icons/UploadImageIcon.tsx";
import {useImages} from "../../../context/ImageContext.tsx";
import {ImageCropperModal} from "../../modals/ImageCropperModal/ImageCropperModal.tsx";
import {IImage} from "../../../utils/types.ts";

type SliderTypes = "ViewPostModal" | "EditPostModal" | "CreatePostModal" | "ViewPost";

interface SimpleSliderProps {
    sliderType: SliderTypes;
    style?: CSSProperties;
    className?: string;
    inModal?: boolean;
    maxWidth?: number;
    maxImages?: number;
    postImages?: IImage[];
}

export const SimpleSlider = ({style, className, maxWidth = 200, maxImages = 5, postImages = [], inModal = false, sliderType = "ViewPost"}: SimpleSliderProps) => {
    const [currentImg, setCurrentImg] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {currentImage, images, addImageForEditing, removeImage } = useImages();

    const handlePrevious = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        setCurrentImg((prev) => {
            return prev === postImages.length - 1 ? 0 : prev - 1;
        });
    }, [postImages.length]);

    const handleNext = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        setCurrentImg((prev) => {
            return prev === postImages.length - 1 ? 0 : prev + 1;
        })
    }, [postImages.length]);


    //=======================[CREATE POST MODAL FUNCS START]=======================\\
    const handleClose = () => {
        setIsOpen(false);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
    //=======================[CREATE POST MODAL FUNCS END]=======================\\

    const getMaxWidthByType = (): string => {
        switch (sliderType) {
            case "ViewPostModal":
                return "100%";
            case "EditPostModal":
                return "100%";
            case "CreatePostModal":
                return "100%";
            default:
                return "100%";
        }
    }

    const styleCards = {
        transform: `translateX(${-currentImg * maxWidth}px)`,
        height: getMaxWidthByType(),
        maxWidth: postImages?.length > 0 ? maxWidth * postImages.length : maxWidth
    }

    return (
        <div style={style} className={`${styles.slider} ${className}`}>
            <div className={`${styles.cards} ${inModal ? styles.cards_height : ""}`} style={styleCards}>
                {(sliderType === "CreatePostModal" ? images : postImages).map((image: IImage, index: number) => {
                   return sliderType === "CreatePostModal" ? (
                        <div key={index} className={styles.card}
                             style={{backgroundImage: `url(${image?.url})`, maxWidth: `${maxWidth}px`,}}>
                            <button className={styles.card__delete_btn} onClick={() => handleDelete(index)}>X</button>
                        </div>
                    ) : (
                        <img className={styles.card} key={index} src={image?.url} alt=""/>
                    )
                })}

                {sliderType === "CreatePostModal" && (
                    <div  style={{maxWidth: `${maxWidth}px`}}
                          className={`${styles.card__input_container} ${images.length >= maxImages ? styles.hidden_input : ""}`}>
                        <UploadImageIcon className={styles.card_input__icon}/>
                        <input type="file" onChange={handleFileChange}/>
                    </div>
                )}
            </div>

            {(postImages.length > 1 && currentImg > 0) && (
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
            {isOpen && (
                <ImageCropperModal handleClose={handleClose} imageSrc={currentImage?.url}/>
            )}
        </div>
    );
};