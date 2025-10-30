import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "@/app/root-reducer";
import type {PreloadedState} from "b2b-types";
import {getPreloadedBannersState} from "@/ducks/banners/bannersSlice";

const createServerSideStore = (preload: PreloadedState) => configureStore({
    reducer: rootReducer,
    preloadedState: {
        ...preload,
        banners: getPreloadedBannersState(preload.banners?.list ?? []),
    },
});

export default createServerSideStore;
