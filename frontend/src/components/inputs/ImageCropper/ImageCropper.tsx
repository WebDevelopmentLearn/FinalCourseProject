import {ChangeEvent, useCallback, useState} from "react";
import Cropper from "react-easy-crop";

import styles from "./ImageCropper.module.scss";
import {getCroppedImg} from "../../../utils/Utils.ts";
import {useImages} from "../../../context/ImageContext.tsx";
import {CustomButton} from "../CustomButton/CustomButton.tsx";
import {PixelCrop} from "../../../utils/types.ts";
import {toast} from "react-toastify";

interface ImageCropperProps  {
    handleClose: () => void;
    imageSrc: string;
    shape: "round" | "rect";
    permittedAspects: string[];
    className?: string;
    singleMode?: boolean;
}

export const ImageCropper = ({handleClose, imageSrc, shape = "rect", permittedAspects, singleMode = false}: ImageCropperProps) => {
    const [crop, setCrop] = useState<{x: number, y: number}>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [aspect, setAspect] = useState<number>(1); // Соотношение сторон по умолчанию 1:1
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
    const { saveCroppedImage, addSingleImage } = useImages();

    const onCropComplete = useCallback((_: PixelCrop, croppedAreaPixels: PixelCrop): void => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleAspectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
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

    const handleCrop = async (): Promise<void> => {
        try {
            if (!croppedAreaPixels) {
                console.error("CroppedAreaPixels is empty");
                return;
            }
            const croppedImage: Blob = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (singleMode) {
                addSingleImage(croppedImage);
            } else {
                saveCroppedImage(croppedImage);
            }
            toast.success("Image cropped successfully", {
                autoClose: 2000,
            });
            handleClose();
        } catch (error) {
            console.error("Error with handleCrop: ", error);
            toast.error("Error with cropping image", {
                autoClose: 2000,
            });
        }
    };

    return (
        <div>
            <div className={`${styles.cropper}`}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    cropShape={shape}
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
                        {permittedAspects.length > 0 && permittedAspects.map((aspect, index) => (
                            <option key={index} value={aspect}>{aspect}</option>
                        ))}
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
                <CustomButton type={"button"} title={"Обрезать"} className={styles.cropper_control__crop_btn} onClick={handleCrop} />
            </div>
        </div>
    );
};