import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchBanners} from "./api";
import {RootState} from "@/app/configureStore";
import {LoadBannersResponse, selectBannersLoading} from "./index";

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
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectBannersLoading(state);
        }
    }
)
