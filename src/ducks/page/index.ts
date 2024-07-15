import {createReducer} from "@reduxjs/toolkit";
import {ContentPage, Keyword} from "b2b-types";
import {keywordsSorter, pageKeywordsFilter} from "../keywords/utils";
import {loadPage} from "./actions";

export interface PageState {
    list: Keyword[],
    keyword: string | null;
    status: 'idle' | 'loading';
    loaded: boolean;
    content: ContentPage | null;
}

export const initialPageState = (preload = typeof window === 'undefined' ? {} : window?.__PRELOADED_STATE__ ?? {}): PageState => ({
    list: preload?.keywords?.list?.filter(pageKeywordsFilter)?.sort(keywordsSorter) ?? [],
    keyword: preload.page?.content?.keyword ?? null,
    status: 'idle',
    loaded: !!preload?.page?.content,
    content: preload?.page?.content ?? null,
})

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
        })
        .addCase(loadPage.rejected, (state) => {
            state.status = 'idle';
        })
});

export default pageReducer;
