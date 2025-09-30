import {Banner} from "b2b-types";
import {createReducer} from "@reduxjs/toolkit";
import {bannerSorter} from "./utils";
import {loadBanners} from "./actions";

export interface BannersState {
    list: Banner[];
    loading: boolean;
    loaded: boolean;
    updated: number;
}

export interface LoadBannersResponse {
    list: Banner[],
    updated: number,
}

export const initialBannersState: BannersState = {
    list: [],
    loading: false,
    loaded: false,
    updated: 0,
}


const bannersReducer = createReducer(initialBannersState, (builder) => {
    builder
        .addCase(loadBanners.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.list.sort(bannerSorter);
            state.updated = action.payload.updated;
        })
        .addCase(loadBanners.rejected, (state) => {
            state.loading = false;
        })
});

export default bannersReducer;
