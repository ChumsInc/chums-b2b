import {RootState} from "@/app/configureStore";

export const selectCategoryLoading = (state:RootState) => state.category.status === 'loading';
export const selectCategoryStatus = (state:RootState) => state.category.status;
export const selectCategory = (state:RootState) => state.category.category;
