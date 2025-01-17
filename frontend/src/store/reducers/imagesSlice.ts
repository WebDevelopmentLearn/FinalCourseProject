import {createSlice} from "@reduxjs/toolkit";
import {IImagesState} from "../../utils/Entitys.ts";

const initialState: IImagesState = {
    images: [],
    imagesUrls: [],
}

const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addImageUrl: (state, action) => {
            state.imagesUrls.push(action.payload);
        },
        removeImageUrl: (state, action) => {
            state.imagesUrls = state.imagesUrls.filter((el) => el !== action.payload);
        },
        updateImageUrl: (state, action) => {
            const { oldImage, newImage } = action.payload; // Ожидаем старое и новое изображение
            const targetIndex = state.imagesUrls.findIndex((el) => el === oldImage); // Ищем индекс старого изображения
            if (targetIndex !== -1) {
                state.imagesUrls[targetIndex] = newImage; // Обновляем, если старое изображение найдено
            }
        },
        addImageBlob: (state, action) => {
            state.images.push(action.payload);
        },
        removeImageBlob: (state, action) => {
            state.images = state.images.filter((el) => el !== action.payload);
        },
        updateImageBlob: (state, action) => {
            const { oldImage, newImage } = action.payload; // Ожидаем старое и новое изображение
            const targetIndex = state.images.findIndex((el) => el === oldImage); // Ищем индекс старого изображения
            if (targetIndex !== -1) {
                state.images[targetIndex] = newImage; // Обновляем, если старое изображение найдено
            }
        }
    }
});

export const {addImageUrl, removeImageUrl, updateImageUrl, addImageBlob, removeImageBlob, updateImageBlob} = imagesSlice.actions;
export default imagesSlice.reducer;