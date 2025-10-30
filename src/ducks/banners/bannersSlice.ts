import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {Banner} from "b2b-types";
import {loadBanners} from "@/ducks/banners/actions";
import {bannerSorter} from "@/ducks/banners/utils";

const adapter = createEntityAdapter<Banner, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
})

const selectors = adapter.getSelectors();

export interface BannersState {
    status: 'idle' | 'loading' | 'rejected';
    updated: number;
}

const extraState: BannersState = {
    status: 'idle',
    updated: 0,
}

export function getPreloadedBannersState(arg:Banner[]) {
    return adapter.getInitialState({
        ...extraState,
        updated: arg.length > 0 ? new Date().valueOf() : 0,
    }, arg)
}

const bannersSlice = createSlice({
    name: 'banners',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadBanners.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadBanners.fulfilled, (state, action) => {
                state.status = 'idle'
                adapter.setAll(state, action.payload.list)
                state.updated = action.payload.updated;
            })
            .addCase(loadBanners.rejected, (state) => {
                state.status = 'rejected';
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectBannersLoaded: (state) => state.updated > 0,
        selectBannersStatus: (state) => state.status,
        selectBannersUpdated: (state) => state.updated,
    }
})

export default bannersSlice;
export const {
    selectAll,
    selectBannersLoaded,
    selectBannersStatus,
    selectBannersUpdated
} = bannersSlice.selectors;
export const selectBannersList = createSelector(
    [selectAll],
    (banners) => {
        return [...banners]
            .sort(bannerSorter)
    }
)

