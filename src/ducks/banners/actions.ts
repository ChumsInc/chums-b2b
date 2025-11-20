import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Banner} from "chums-types/b2b";
import {fetchBanners} from "./api.js";
import {type RootState} from "@/app/configureStore.js";
import {selectBannersStatus} from "@/ducks/banners/bannersSlice.js";


export interface LoadBannersResponse {
    list: Banner[],
    updated: number,
}


export const loadBanners = createAsyncThunk<LoadBannersResponse, void, { state: RootState }>(
    'banners/load',
    async () => {
        const banners = await fetchBanners();
        return {
            list: banners,
            updated: new Date().valueOf()
        }
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectBannersStatus(state) === 'idle';
        }
    }
)
