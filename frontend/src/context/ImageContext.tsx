import {createContext, useContext, useState} from "react";
import {IImage} from "../utils/types.ts";
import {ClearType, IImageProvider, ImageProviderProps} from "./types.ts";



const ImageContext = createContext<IImageProvider | undefined>(undefined);



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

    const urlToBlob = async (url: string): Promise<Blob | null> => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }
            return await response.blob();
        } catch (error) {
            console.error("Error fetching image:", error);
            return null;
        }
    };

    const addImageFromUrl = async (image: { _id: string; url: string }): Promise<void> => {
        const blob = await urlToBlob(image.url);

        if (blob) {
            const newImage = {
                _id: image._id,
                blob,
                url: image.url, // оставляем оригинальный URL
            };
            setImages((prev) => [...prev, newImage]);
        } else {
            console.error("Failed to convert URL to Blob");
        }
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
                addImageFromUrl
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};