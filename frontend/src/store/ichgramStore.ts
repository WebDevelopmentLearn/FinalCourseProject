import {combineReducers, configureStore} from "@reduxjs/toolkit";

import modalReducer from "./reducers/modalSlice";
import authReducer from "./reducers/authSlice.ts";
import userReducer from "./reducers/userSlice.ts";
import postReducer from "./reducers/postSlice.ts";

const rootReducer = combineReducers({
    modalReducer,
    authReducer,
    userReducer,
    postReducer
});

const ichgramStore = configureStore({
    reducer: rootReducer,
    devTools: true
});

export type RootState = ReturnType<typeof ichgramStore.getState>;
export type AppDispatch = typeof ichgramStore.dispatch;

export default ichgramStore;