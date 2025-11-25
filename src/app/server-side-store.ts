import {configureStore} from "@reduxjs/toolkit";
import type {PreloadedState} from "chums-types/b2b";
import {useDispatch, useSelector} from "react-redux";
import rootReducer from "@/app/root-reducer";
import {getPreloadedBannersState} from "@/ducks/banners/bannersSlice";


export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector;


const createServerSideStore = (preload: PreloadedState) => configureStore({
    reducer: rootReducer,
    preloadedState: {
        ...preload,
        banners: getPreloadedBannersState(preload.banners),
    },
});

export default createServerSideStore;
