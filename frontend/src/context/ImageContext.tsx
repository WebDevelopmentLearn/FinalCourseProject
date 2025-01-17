import {createContext, useContext, useState} from "react";

const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null); // Текущее изображение для обрезки

    // Добавить изображение в редактор (но не в массив)
    const addImageForEditing = (blob) => {
        setCurrentImage({
            blob,
            url: URL.createObjectURL(blob),
        });
    };

    // Сохранить обрезанное изображение
    const saveCroppedImage = (blob) => {
        if (!currentImage) return;

        const croppedUrl = URL.createObjectURL(blob);
        setImages((prev) => [
            ...prev,
            { blob, url: croppedUrl },
        ]);

        // Освобождаем память для временного URL
        URL.revokeObjectURL(currentImage.url);
        setCurrentImage(null);
    };

    const addImage = (blob) => {
        if (!(blob instanceof Blob)) {
            console.error("The provided object is not a Blob:", blob);
            return;
        }
        const url = URL.createObjectURL(blob);
        setImages((prev) => [...prev, { blob, url }]);
    };


    const removeImage = (index) => {
        const imageToRemove = images[index];
        if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.url);
        }
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <ImageContext.Provider value={{
            images,
            currentImage,
            addImageForEditing,
            saveCroppedImage,
            removeImage,
        }}>
            {children}
        </ImageContext.Provider>
    );
};