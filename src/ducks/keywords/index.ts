import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {Keyword} from "b2b-types";
import {PreloadedState} from "@/types/preload";
import {loadKeywords} from "./actions";

export interface KeywordsState {
    loading: boolean;
    loaded: boolean;
}

const extraState: KeywordsState = {
    loading: false,
    loaded: false,
}

const adapter = createEntityAdapter<Keyword, string>({
    selectId: (arg) => arg.keyword,
    sortComparer: (a, b) => a.keyword.localeCompare(b.keyword),
});
const selectors = adapter.getSelectors();

export const initialKeywordsState = (preload: PreloadedState) => {
    const state = adapter.getInitialState(extraState)
    if (preload?.keywords?.list?.length) {
        const filledState = adapter.setAll(state, preload.keywords.list);
        return {
            ...filledState,
            loaded: true,
        }
    }
    return state;
}

const keywordsSlice = createSlice({
    name: 'keywords',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadKeywords.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadKeywords.fulfilled, (state, action) => {
                state.loading = false;
                state.loaded = true;
                adapter.setAll(state, action.payload);
            })
            .addCase(loadKeywords.rejected, (state) => {
                state.loading = false;
            })
    },
    selectors: {
        selectKeywordsList: (state) => selectors.selectAll(state),
        selectKeywordById: (state, arg: string) => selectors.selectById(state, arg),
        selectKeywordsLoaded: (state) => state.loaded,
        selectKeywordsLoading: (state) => state.loading,
    }
});

export const {
    selectKeywordsLoading,
    selectKeywordsLoaded,
    selectKeywordsList,
    selectKeywordById
} = keywordsSlice.selectors;

export const selectKeyword = createSelector(
    [selectKeywordsList, (state, keyword: string) => keyword],
    (list, keyword) => {
        const kw = list.find(kw => kw.keyword === keyword);
        if (!kw) {
            return null;
        }
        if (kw.pagetype === "product" && kw.redirect_to_parent > 0) {
            const parent = list
                .filter(kw => kw.pagetype === "product")
                .find(kw => kw.id === kw.redirect_to_parent);
            return parent ?? null;
        }
        return kw;
    }
)
export const selectProductKeywords = createSelector(
    [selectKeywordsList, () => 'products'],
    (list, pageType) => {
        return list.filter(kw => kw.pagetype === pageType);
    }
);

export const selectCategoryKeywords = createSelector(
    [selectKeywordsList, () => 'category'],
    (list, pageType) => {
        return list.filter(kw => kw.pagetype === pageType);
    }
);

export const selectPageKeywords = createSelector(
    [selectKeywordsList, () => 'page'],
    (list, pageType) => {
        return list.filter(kw => kw.pagetype === pageType);
    }
);


export default keywordsSlice;
