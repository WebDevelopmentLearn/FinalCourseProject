import {ImageCropper} from "../../inputs/ImageCropper/ImageCropper.tsx";
import styles from "./UploadAvatarModal.module.scss";
import {UploadImageIcon} from "../../../assets/icons/UploadImageIcon.tsx";
import {useImages} from "../../../context/ImageContext.tsx";

export const UploadAvatarModal = ({setIsOpenUploadAvatarModal}: {setIsOpenUploadAvatarModal: any}) => {
    const {currentImage, addImageForEditing, clearImages } = useImages();

    const handleFileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const blob = new Blob([file], { type: file.type });
            addImageForEditing(blob);
        }
        event.target.value = "";
    };

    const handleCloseModal = () => {
        setIsOpenUploadAvatarModal(false);
        clearImages("currentImage");
    }

    return (
        <div className={styles.image_cropper_modal_overlay} onClick={handleCloseModal}>
            <div className={styles.image_cropper_modal} onClick={(e) => {
                e.stopPropagation();
            }}>
                <h1>Upload Avatar</h1>
                {currentImage ? (
                    <ImageCropper singleMode={true} className={styles.image_cropper_avatar} permittedAspects={["1:1"]} handleClose={handleCloseModal} imageSrc={currentImage.url} shape={"round"}/>
                ) : (
                    <div className={`${styles.card__input_container}`}>
                        <UploadImageIcon className={styles.card_input__icon}/>
                        <input type="file" onChange={handleFileChange}/>
                    </div>
                )}
            </div>

        </div>
    );
};