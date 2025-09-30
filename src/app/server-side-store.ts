import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "@/app/root-reducer";
import {PreloadedState} from "b2b-types";

const createServerSideStore = (preload: PreloadedState) => configureStore({
    reducer: rootReducer,
    preloadedState: preload,
});

export default createServerSideStore;
