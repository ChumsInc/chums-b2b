import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {type ItemSearchResult} from "./index.js";
import {fetchItemLookup} from "@/api/itemLookup.js";
import {type RootState} from "@/app/configureStore";

export const setItemSearch = createAction<string>('itemLookup/search');

export const loadItemLookup = createAsyncThunk<ItemSearchResult[], string, {state: RootState}>(
    'itemLookup/load',
    async (arg) => {
        return await fetchItemLookup(arg);
    },
    {
        condition: (arg) => {
            return !!arg.trim()

        }
    }
)
