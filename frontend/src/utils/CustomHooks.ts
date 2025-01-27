import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {AppDispatch} from "../store/ichgramStore.ts";
import {RootState} from "@reduxjs/toolkit/query";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// Типизированный selector
export const useAppSelector: TypedUseSelectorHook<RootState<any, any, any>> = useSelector;


export const useCheckMyAccess = (targetUserId: string | undefined, secondTargetUserId: string | undefined) => {
    return targetUserId !== undefined && secondTargetUserId !== undefined && targetUserId === secondTargetUserId;
}