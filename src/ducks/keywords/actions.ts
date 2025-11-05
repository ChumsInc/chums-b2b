import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchKeywords} from '@/api/keywords'
import {type RootState} from "@/app/configureStore";
import {selectKeywordsLoading} from "./selectors";
import type {Keyword} from "chums-types/b2b";


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
