import {createContext, ReactNode, useContext, useState} from "react";

type ClearType = "currentImage" | "images" | "all";

type IImageProvider = {
    images: IImage[];
    currentImage: IImage | null;
    addImageForEditing: (blob: Blob) => void;
    saveCroppedImage: (blob: Blob) => void;
    addSingleImage: (blob: Blob) => void;
    removeImage: (index: number) => void;
    clearImages: (clearType: ClearType) => void;
};

const ImageContext = createContext<IImageProvider | undefined>(undefined);

type IImage = {
    blob: Blob;
    url: string;
};

type ImageProviderProps = {
    children: ReactNode;
};

export const useImages = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImages must be used within an ImageProvider");
    }
    return context;
};

export const ImageProvider = ({ children }: ImageProviderProps) => {
    const [images, setImages] = useState<IImage[]>([]);
    const [currentImage, setCurrentImage] = useState<IImage | null>(null);

    const addImageForEditing = (blob: Blob): void => {
        setCurrentImage({
            blob,
            url: URL.createObjectURL(blob),
        });
    };

    const saveCroppedImage = (blob: Blob): void => {
        if (!currentImage) return;

        const croppedUrl = URL.createObjectURL(blob);
        setImages((prev) => [
            ...prev,
            { blob, url: croppedUrl },
        ]);

        URL.revokeObjectURL(currentImage.url);
        setCurrentImage(null);
    };

    const addSingleImage = (blob: Blob): void => {
        // Очистка предыдущего изображения
        images.forEach((image) => URL.revokeObjectURL(image.url));
        const newImage = {
            blob,
            url: URL.createObjectURL(blob),
        };
        setImages([newImage]); // Всегда один элемент в массиве
    };

    const clearImages = (clearType: ClearType): void => {
        switch (clearType) {
            case "currentImage":
                setCurrentImage(null);
                break;
            case "images":
                images.forEach((image) => URL.revokeObjectURL(image.url));
                setImages([]);
                break;
            case "all":
                images.forEach((image) => URL.revokeObjectURL(image.url));
                setImages([]);
                setCurrentImage(null);
                break;
            default:
                setCurrentImage(null);
                setImages([]);
                break;
        }
    };

    const removeImage = (index: number): void => {
        const imageToRemove = images[index];
        if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.url);
        }
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <ImageContext.Provider
            value={{
                images,
                currentImage,
                addImageForEditing,
                saveCroppedImage,
                addSingleImage,
                removeImage,
                clearImages,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};