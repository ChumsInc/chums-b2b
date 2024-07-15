import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchPage} from "../../api/page";
import {RootState} from "../../app/configureStore";
import {selectPageLoadingStatus} from "./selectors";
import {ContentPage} from "b2b-types";


export const loadPage = createAsyncThunk<ContentPage | null, string|undefined>(
    'page/load',
    async (arg) => {
        return await fetchPage(arg!);
    }, {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg && selectPageLoadingStatus(state) === 'idle';
        }
    }
)
