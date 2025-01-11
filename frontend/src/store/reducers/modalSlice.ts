import {createSlice} from "@reduxjs/toolkit";


interface InitialState {
    createPostModalIsOpen: boolean;
    // status: "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED";
    // error: null | string | undefined;
}

const initialState: InitialState = {
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