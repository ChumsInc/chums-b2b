import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import rootReducer from "@/app/root-reducer";
import type {PreloadedStateV2a} from "@/types/ui-features.ts";


export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector;


const createServerSideStore = (preload: PreloadedStateV2a) => configureStore({
    reducer: rootReducer,
    preloadedState: {
        ...preload,
    },
});

export default createServerSideStore;
