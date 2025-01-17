import {useCallback, useState} from "react";
import {AppDispatch} from "../../store/ichgramStore.ts";
import {useDispatch} from "react-redux";
import Cropper from "react-easy-crop";
import styles from "./ImageCropper.module.scss";
import {getCroppedImg} from "../../utils/Utils.ts";
import {ImageCropperProps} from "../../utils/Entitys.ts";
import {updateImage} from "../../store/reducers/imagesSlice.ts";


export const ImageCropper = ({handleClose, imageSrc}: ImageCropperProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [aspect, setAspect] = useState<number>(1); // Соотношение сторон по умолчанию 1:1
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const dispatch = useDispatch<AppDispatch>();

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
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        console.log("Cropped Image:", croppedImage);
        dispatch(updateImage({oldImage: imageSrc, newImage: croppedImage}))
        handleClose();
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