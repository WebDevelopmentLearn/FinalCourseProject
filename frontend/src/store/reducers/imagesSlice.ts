import {createSlice} from "@reduxjs/toolkit";
import {IImagesState} from "../../utils/Entitys.ts";

const initialState: IImagesState = {
    images: [],
}

const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addImage: (state, action) => {
            state.images.push(action.payload);
        },
        removeImage: (state, action) => {
            state.images = state.images.filter((el) => el !== action.payload);
        },
        updateImage: (state, action) => {
            const { oldImage, newImage } = action.payload; // Ожидаем старое и новое изображение
            const targetIndex = state.images.findIndex((el) => el === oldImage); // Ищем индекс старого изображения
            if (targetIndex !== -1) {
                state.images[targetIndex] = newImage; // Обновляем, если старое изображение найдено
            }
        }
    }
});

export const {addImage, removeImage, updateImage} = imagesSlice.actions;
export default imagesSlice.reducer;