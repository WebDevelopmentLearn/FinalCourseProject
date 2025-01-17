import {ImageCropperModalProps} from "../../utils/Entitys.ts";
import {ImageCropper} from "../ImageCropper/ImageCropper.tsx";
import styles from "./ImageCropperModal.module.scss";

export const ImageCropperModal = ({imageSrc, handleClose}: ImageCropperModalProps) => {
    return (
        <div className={styles.image_cropper_modal_overlay} onClick={handleClose}>
            <div className={styles.image_cropper_modal} onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className={styles.image_cropper_modal_header}>
                    <h1>Edit image</h1>
                </div>
                <div className={styles.image_cropper_modal_content}>
                    <ImageCropper handleClose={handleClose} imageSrc={imageSrc} />
                </div>
            </div>
        </div>
    )
}