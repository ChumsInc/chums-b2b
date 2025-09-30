import {createReducer} from "@reduxjs/toolkit";
import {Keyword} from "b2b-types";
import {PreloadedState} from "@/types/preload";
import {keywordsSorter} from "./utils";
import {loadKeywords} from "./actions";

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
