import {createSlice} from "@reduxjs/toolkit";
import {IModalState} from "../types.ts";

const initialState: IModalState = {
    createPostModalIsOpen: false,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openCreatePostModal: (state) => {
            state.createPostModalIsOpen = true;
        },
        closeCreatePostModal: (state) => {
            state.createPostModalIsOpen = false;
        }
    }
});

export const {openCreatePostModal, closeCreatePostModal} = modalSlice.actions;
export default modalSlice.reducer;