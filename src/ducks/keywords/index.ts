import {createReducer} from "@reduxjs/toolkit";
import type {Keyword} from "chums-types/b2b";
import {keywordsSorter} from "./utils.js";
import {loadKeywords} from "./actions.js";

export interface KeywordsState {
    list: Keyword[],
    loading: boolean;
    loaded: boolean;
}

export const initialKeywordsState: KeywordsState = {
    list: [],
    loading: false,
    loaded: false,
}

const keywordsReducer = createReducer(initialKeywordsState, (builder) => {
    builder
        .addCase(loadKeywords.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadKeywords.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.list = [...action.payload].sort(keywordsSorter);
        })
        .addCase(loadKeywords.rejected, (state) => {
            state.loading = false;
        })
});

export default keywordsReducer;
