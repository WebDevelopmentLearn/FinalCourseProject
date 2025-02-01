import {Theme} from "emoji-picker-react";
import {PixelCrop} from "./types.ts";

const createImage = (url: string): Promise<CanvasImageSource> => {
    return  new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = url;
    });
}


export const getTimeAgo = (date: string): string => {
    if (!date) {
        return "";
    }

    const dateObj = new Date(date);
    const currentDate = new Date();
    const diff = currentDate.getTime() - dateObj.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    if (seconds < 2) {
        return "Just now";
    } else if (minutes < 1) {
        return `${Math.floor(seconds)} seconds ago`;
    } else if (minutes < 60) {
        return `${Math.floor(minutes)} minutes ago`;
    } else if (hours < 1) {
        return `${Math.floor(minutes)} minutes ago`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} hours ago`;
    } else {
        return `${Math.floor(hours / 24)} days ago`;
    }

}

/**
 * Function that returns the theme of the user
 * [WARNING] The function used the enum Theme from 'emoji-picker-react' library
 * @param userTheme - user theme
 * @returns Theme - user theme in enum format
 */
export function getEnumTheme(userTheme: string): Theme | undefined {
    if (userTheme === Theme.DARK) {
        return Theme.DARK;
    } else if (userTheme === Theme.LIGHT) {
        return Theme.LIGHT;
    }
    return undefined;
}


export const getCroppedImg = async (imageSrc: string, pixelCrop: PixelCrop): Promise<Blob> => {
    const image: CanvasImageSource = await createImage(imageSrc);
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    if (ctx && image) {
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );
    } else {
        return new Promise((_, reject) => {
            reject();
        })
    }

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error("Canvas is empty");
                return;
            }
            resolve(blob);
        }, "image/jpeg");
    });

};

