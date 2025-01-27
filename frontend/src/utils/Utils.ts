import {Theme} from "emoji-picker-react";

const createImage = (url: string): Promise<CanvasImageSource> => {
    return  new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = url;
    });
}


export const getTimeAgo = (date: string): string => {
    const dateObj = new Date(date);
    const currentDate = new Date();
    const diff = currentDate.getTime() - dateObj.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    if (seconds < 2) {
        return "только что";
    } else if (minutes < 1) {
        return `${Math.floor(seconds)} секунд назад`;
    } else if (minutes < 60) {
        return `${Math.floor(minutes)} минут назад`;
    } else if (hours < 1) {
        return `${Math.floor(minutes)} минут назад`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} часов назад`;
    } else {
        return `${Math.floor(hours / 24)} дней назад`;
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


export const getCroppedImg = async (imageSrc, pixelCrop): Promise<Blob> => {
    console.log("ImageSrc: ", typeof imageSrc);
    console.log("pixelCrop: ", typeof pixelCrop);
    const image: CanvasImageSource = await createImage(imageSrc);
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    console.log("ctx: ", typeof ctx);
    console.log("image: ", typeof image);

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

