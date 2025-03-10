import {createReducer} from "@reduxjs/toolkit";
import {loadCategory} from "./actions";
import {CategoryState} from "./types";

export const initialCategoryState = (preload = typeof window === 'undefined' ? {} : window?.__PRELOADED_STATE__ ?? {}): CategoryState => ({
    keyword: null,
    category: preload?.category?.content ?? null,
    content: preload?.category?.content ?? null,
    status: 'idle',
})

const categoryReducer = createReducer(initialCategoryState, (builder) => {
    builder
        .addCase(loadCategory.pending, (state, action) => {
            state.status = 'loading';
            if (action.meta.arg !== state.keyword) {
                state.keyword = action.meta.arg ?? null;
                state.category = null;
                state.content = null;
            }
        })
        .addCase(loadCategory.fulfilled, (state, action) => {
            state.status = 'idle';
            state.keyword = action.payload?.keyword ?? null;
            state.category = action.payload ?? null;
            state.content = action.payload ?? null;
        })
        .addCase(loadCategory.rejected, (state) => {
            state.status = 'rejected';
        })
})

export default categoryReducer;
