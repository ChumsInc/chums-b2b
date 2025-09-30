import {RootState} from "@/app/configureStore";

export const selectPageKeywords = (state: RootState) => state.page.list;
export const selectPageKeyword = (state: RootState) => state.page.keyword;
export const selectPageLoadingStatus = (state: RootState) => state.page.status;
export const selectPageLoaded = (state: RootState) => state.page.loaded;
export const selectPageContent = (state: RootState) => state.page.content;
export const selectPageHTML = (state: RootState) => state.page.html;
