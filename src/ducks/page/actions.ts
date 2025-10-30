import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchPage} from "@/api/page";
import {type RootState} from "@/app/configureStore";
import {selectPageLoadingStatus} from "./selectors";
import type {ContentPage} from "b2b-types";


export const loadPage = createAsyncThunk<ContentPage | null, string|undefined, {state: RootState}>(
    'page/load',
    async (arg) => {
        return await fetchPage(arg!);
    }, {
        condition: (arg, {getState}) => {
            const state = getState() ;
            return !!arg && selectPageLoadingStatus(state) === 'idle';
        }
    }
)
