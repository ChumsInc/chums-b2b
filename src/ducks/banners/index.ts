import {Banner} from "b2b-types";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadBanners} from "./actions";
import {PreloadedState} from "@/types/preload";

export interface BannersState {
    loading: boolean;
    loaded: boolean;
    updated: number;
}

const extraState: BannersState = {
    loading: false,
    loaded: false,
    updated: 0,
}

const adapter = createEntityAdapter<Banner, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const selectors = adapter.getSelectors();

export const initialBannersState = (preload: PreloadedState) => {
    const emptyState = adapter.getInitialState(extraState);
    if (preload?.banners?.list?.length) {
        const filledState = adapter.setAll(emptyState, preload.banners.list);
        return {
            ...filledState,
            updated: preload.banners?.list?.length ? new Date().valueOf() : 0,
        };
    }
    return emptyState;
}

export interface LoadBannersResponse {
    list: Banner[],
    updated: number,
}

const bannersSlice = createSlice({
    name: 'banners',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadBanners.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.loaded = true;
                state.updated = action.payload.updated;
                adapter.setAll(state, action.payload.list);
            })
            .addCase(loadBanners.rejected, (state) => {
                state.loading = false;
            })
    },
    selectors: {
        selectBannersList: (state) => selectors.selectAll(state),
        selectBannersLoaded: (state) => state.loaded,
        selectBannersLoading: (state) => state.loading,
        selectBannersUpdated: (state) => state.updated,
    }
});

export const {
    selectBannersList,
    selectBannersUpdated,
    selectBannersLoading,
    selectBannersLoaded
} = bannersSlice.selectors;

export default bannersSlice
