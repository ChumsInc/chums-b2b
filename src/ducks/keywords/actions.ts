import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Keyword} from "chums-types/b2b";
import {fetchKeywords} from "@/api/keywords"
import type {RootState} from "@/app/configureStore";
import {selectKeywordsLoading} from "./selectors";


export const loadKeywords = createAsyncThunk<Keyword[], void, {state: RootState}>(
    'keywords/load',
    async () => {
        return await fetchKeywords()
    },
    {
        condition: (_, {getState}) => {
            const state = getState() ;
            return !selectKeywordsLoading(state);
        }
    }
)
