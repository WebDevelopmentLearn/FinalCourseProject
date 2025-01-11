import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";

const rootReducer = combineReducers({
    modalReducer
});

const ichgramStore = configureStore({
    reducer: rootReducer,
    devTools: true
});

export type RootState = ReturnType<typeof ichgramStore.getState>;
export type AppDispatch = typeof ichgramStore.dispatch;

export default ichgramStore;