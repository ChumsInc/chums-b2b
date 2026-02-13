import {createReducer} from "@reduxjs/toolkit";
import type {ContentPage, Keyword} from "chums-types/b2b";
import {loadPage} from "./actions";

export interface PageState {
    list: Keyword[],
    keyword: string | null;
    status: 'idle' | 'loading';
    loaded: boolean;
    content: ContentPage | null;
    html: string | null;
}

export const initialPageState: PageState = {
    list: [],
    keyword: null,
    status: 'idle',
    loaded: false,
    content: null,
    html: null,
}

const pageReducer = createReducer(initialPageState, (builder) => {
    builder
        .addCase(loadPage.pending, (state, action) => {
            state.status = 'loading';
            state.loaded = false;
            if (action.meta.arg !== state.keyword) {
                state.content = null;
            }
            state.keyword = action.meta.arg ?? null;
        })
        .addCase(loadPage.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loaded = true;
            state.content = action.payload;
            state.html = action.payload?.content ?? null;
        })
        .addCase(loadPage.rejected, (state) => {
            state.status = 'idle';
        })
});

export default pageReducer;
