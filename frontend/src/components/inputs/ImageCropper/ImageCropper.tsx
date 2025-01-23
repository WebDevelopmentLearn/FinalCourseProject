import {useCallback, useState} from "react";
import Cropper from "react-easy-crop";
import styles from "./ImageCropper.module.scss";
import {getCroppedImg} from "../../../utils/Utils.ts";
import {ImageCropperProps} from "../../../utils/Entitys.ts";
import {useImages} from "../../../context/ImageContext.tsx";


export const ImageCropper = ({handleClose, imageSrc}: ImageCropperProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [aspect, setAspect] = useState<number>(1); // Соотношение сторон по умолчанию 1:1
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const { saveCroppedImage } = useImages();

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleAspectChange = (e) => {
        const value = e.target.value;
        switch (value) {
            case "1:1":
                setAspect(1);
                break;
            case "4:5":
                setAspect(4 / 5);
                break;
            case "16:9":
                setAspect(16 / 9);
                break;
            default:
                setAspect(1);
        }
    };

    const handleCrop = async () => {
        try {
            const croppedImage: Blob = await getCroppedImg(imageSrc, croppedAreaPixels);
            // const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels, false);
            console.log("Cropped Image:", croppedImage);
            // console.log("Cropped ImageUrl:", croppedImageUrl);
            saveCroppedImage(croppedImage); // Сохраняем Blob через контекст
            handleClose();
        } catch (error) {
            console.error("Error with handleCrop: ", error);
        }
    };

    return (
        <div>
            <div className={styles.cropper}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onMediaLoaded={({ width, height }) => {
                        console.log(`Image width: ${width}, height: ${height}`);
                    }}
                    style={{
                        containerStyle: { height: "100%", width: "100%" },
                        mediaStyle: { objectFit: "contain" },
                    }}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className={styles.cropper_control}>
                <div className={styles.cropper_control__aspect_select}>
                    <label htmlFor="aspect-select">Соотношение сторон: </label>
                    <select id="aspect-select" onChange={handleAspectChange}>
                        <option value="1:1">1:1</option>
                        <option value="4:5">4:5</option>
                        <option value="16:9">16:9</option>
                    </select>
                </div>
                <div className={styles.cropper_control__zoom_range}>
                    <label htmlFor="zoom-range">Масштаб: </label>
                    <input
                        id="zoom-range"
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                    />
                </div>
                <button className={styles.cropper_control__crop_btn} onClick={handleCrop}>
                    Обрезать
                </button>
            </div>
        </div>
    );
};