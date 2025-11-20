import {createReducer} from "@reduxjs/toolkit";
import {loadCategory} from "./actions.js";
import type {CategoryState} from "./types";

export const initialCategoryState: CategoryState = {
    keyword: null,
    category: null,
    status: 'idle',
}

const categoryReducer = createReducer(initialCategoryState, (builder) => {
    builder
        .addCase(loadCategory.pending, (state, action) => {
            state.status = 'loading';
            if (action.meta.arg !== state.keyword) {
                state.keyword = action.meta.arg ?? null;
                state.category = null;
            }
        })
        .addCase(loadCategory.fulfilled, (state, action) => {
            state.status = 'idle';
            state.keyword = action.payload?.keyword ?? null;
            state.category = action.payload ?? null;
        })
        .addCase(loadCategory.rejected, (state) => {
            state.status = 'rejected';
        })
})

export default categoryReducer;
