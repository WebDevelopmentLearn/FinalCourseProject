import {ImageCropperModalProps} from "../../../utils/Entitys.ts";
import {ImageCropper} from "../../inputs/ImageCropper/ImageCropper.tsx";
import styles from "./ImageCropperModal.module.scss";

export const ImageCropperModal = ({imageSrc, handleClose}: ImageCropperModalProps) => {

    // console.log(imageSrc);
    return (
        <div className={styles.image_cropper_modal_overlay} onClick={handleClose}>
            <div className={styles.image_cropper_modal} onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className={styles.image_cropper_modal_header}>
                    <h1>Edit image</h1>
                </div>
                <div className={styles.image_cropper_modal_content}>
                    <ImageCropper handleClose={handleClose} imageSrc={imageSrc} shape="rect" permittedAspects={["1:1", "4:5", "16:9"]} />
                </div>
            </div>
        </div>
    )
}