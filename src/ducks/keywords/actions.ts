import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchKeywords} from "@/api/keywords"
import {RootState} from "@/app/configureStore";
import {selectKeywordsList, selectKeywordsLoading} from "./index";
import {Keyword} from "b2b-types";


export const loadKeywords = createAsyncThunk<Keyword[], void, {state: RootState}>(
    'keywords/load',
    async () => {
        return await fetchKeywords()
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() ;
            return !selectKeywordsLoading(state);
        }
    }
)

export const loadKeywordsIfNeeded = createAsyncThunk<Keyword[], void, {state: RootState}>(
    'keywords/loadIfNeeded',
    async () => {
        return await fetchKeywords()
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() ;
            return !selectKeywordsLoading(state) && selectKeywordsList(state).length === 0;
        }
    }
)
