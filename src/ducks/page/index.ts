import {createSlice} from "@reduxjs/toolkit";
import type {ContentPage} from "chums-types/b2b";

export interface PageState {
    keyword: string | null;
    content: ContentPage | null;
}

export const initialPageState: PageState = {
    keyword: null,
    content: null,
}

const pageSlice = createSlice({
    name: 'page',
    initialState: initialPageState,
    reducers: {},
    selectors: {
        selectPageKeyword: (state) => state.keyword,
        selectPageContent: (state) => state.content,
    }
})

export default pageSlice;
export const {selectPageKeyword, selectPageContent} = pageSlice.selectors;
