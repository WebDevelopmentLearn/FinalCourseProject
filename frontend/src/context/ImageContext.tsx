import {createContext, ReactNode, useContext, useState} from "react";

type IImageProvider = {
     images: IImage[];
     currentImage: IImage | null;
     addImageForEditing: (blob: Blob) => void;
     saveCroppedImage: (blob: Blob) => void;
     removeImage: (index: number) => void;
}

// @ts-ignore
const ImageContext = createContext<IImageProvider>();

type IImage = {
    blob: Blob;
    url: string;
}

type ImageProviderProps = {
    children: ReactNode;
}

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }: ImageProviderProps) => {
    const [images, setImages] = useState<IImage[]>([]);
    const [currentImage, setCurrentImage] = useState<IImage | null>(null); // Текущее изображение для обрезки

    // Добавить изображение в редактор (но не в массив)
    const addImageForEditing = (blob: Blob): void => {
        setCurrentImage({
            blob,
            url: URL.createObjectURL(blob),
        });
    };

    // Сохранить обрезанное изображение
    const saveCroppedImage = (blob: Blob): void => {
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

    // const addImage = (blob: Blob): void => {
    //     if (!(blob instanceof Blob)) {
    //         console.error("The provided object is not a Blob:", blob);
    //         return;
    //     }
    //     const url = URL.createObjectURL(blob);
    //     setImages((prev) => [...prev, { blob, url }]);
    // };


    const removeImage = (index: number): void => {
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