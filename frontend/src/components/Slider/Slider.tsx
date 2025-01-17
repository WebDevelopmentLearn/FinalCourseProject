import {useCallback, useEffect, useState} from "react";
import {AppDispatch, RootState} from "../../store/ichgramStore.ts";
import {useDispatch, useSelector} from "react-redux";
import {SliderProps} from "../../utils/Entitys.ts";
import styles from "./Slider.module.scss";
import {UploadImageIcon} from "../../assets/icons/UploadImageIcon.tsx";
import {addImage, removeImage} from "../../store/reducers/imagesSlice.ts";
import {ImageCropperModal} from "../ImageCropperModal/ImageCropperModal.tsx";

export const Slider = ({style, className, maxWidth = 500, maxImages = 5}: SliderProps) => {
    const [currentImg, setCurrentImg] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {images} = useSelector((state: RootState) => state.imagesReducer);
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        setIsOpen(false);
    }

    const handlePrevious = useCallback(() => {
        setCurrentImg((prev) => (prev === 0 ? images.length : prev - 1));
    }, [images.length]);


    const handleNext = useCallback(() => {
        setCurrentImg((prev) => (prev === images.length ? 0 : prev + 1));
    }, [images.length]);

    const handleKeyDown = useCallback((event) => {
        console.log("handleKeyDown")
        if (event.key === "ArrowLeft") handlePrevious();
        if (event.key === "ArrowRight") handleNext();
    }, [handleNext, handlePrevious]);

    const handleFileChange = (event) => {
        const files = event.target.files;

        // Проверка на наличие файлов
        if (files && files[0]) {
            const file = files[0];

            // Проверяем, что это действительно файл (Blob)
            if (file instanceof Blob) {
                const fileUrl = URL.createObjectURL(file); // Создаем временный URL для отображения изображения

                // Добавляем файл в состояние
                dispatch(addImage(fileUrl));

                // Открываем модальное окно
                setIsOpen(true);
            } else {
                console.error("Selected item is not a valid file.");
            }
        } else {
            console.error("No file selected.");
        }

        // Сбрасываем значение input после обработки
        event.target.value = "";
    };

    const handleDelete = (image) => {
        dispatch(removeImage(image))
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div style={style} className={`${styles.slider} ${className}`}>
            <div className={styles.cards} style={{transform: `translateX(${-currentImg * maxWidth}px)`, width: maxWidth * images.length}}>
                {images.map((image, index) => (
                    <div key={index} className={styles.card} style={{backgroundImage: `url(${image})`, maxWidth: `${maxWidth}px`,}}>
                        <button className={styles.card__delete_btn} onClick={() => handleDelete(image)}>X</button>
                    </div>
                ))}

                {/* Last slide with file input */}
                <div className={`${styles.card__input_container} ${images.length >= maxImages ? styles.hidden_input : ""}`}>
                    <UploadImageIcon className={styles.card_input__icon}/>
                    <input type="file" onChange={handleFileChange}/>
                </div>
            </div>

            {images.length > 0 && (
                <button className={styles.previousImageBtn} onClick={handlePrevious}>
                    &lt;
                </button>
            )}

            {images.length > 0 && (
                <button className={`${styles.nextImageBtn} ${images.length >= maxImages ? styles.hidden_input : ""}`} onClick={handleNext}>
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
            {isOpen && (
                <ImageCropperModal handleClose={handleClose} imageSrc={images[images.length - 1]}/>
            )}
        </div>
    );
};