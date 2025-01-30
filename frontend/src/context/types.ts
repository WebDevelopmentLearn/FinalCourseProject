import {IImage} from "../utils/types.ts";
import React, {Dispatch, ReactNode, SetStateAction} from "react";

export type ClearType = "currentImage" | "images" | "all";

export type IImageProvider = {
    images: IImage[];
    currentImage: IImage | null;
    addImageForEditing: (blob: Blob) => void;
    saveCroppedImage: (blob: Blob) => void;
    addSingleImage: (blob: Blob) => void;
    removeImage: (index: number) => void;
    clearImages: (clearType: ClearType) => void;
};

export type ImageProviderProps = {
    children: ReactNode;
};

export interface ThemeContextType {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
}

export type ThemeProviderProps = {
    children: React.ReactNode
}