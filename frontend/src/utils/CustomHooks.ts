import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {AppDispatch} from "../store/ichgramStore.ts";
import {RootState} from "../store/ichgramStore.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// Типизированный selector

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useCheckMyAccess = (targetUserId: string | undefined, secondTargetUserId: string | undefined) => {
    return targetUserId !== undefined && secondTargetUserId !== undefined && targetUserId === secondTargetUserId;
}

