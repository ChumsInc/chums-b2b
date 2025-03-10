import {createAsyncThunk} from "@reduxjs/toolkit";
import {selectCategoryStatus} from "./selectors";
import {fetchCategory} from "@api/category";
import {ProductCategory} from "b2b-types";
import {RootState} from "@app/configureStore";

export const loadCategory = createAsyncThunk<ProductCategory | null, string, { state: RootState }>(
    'category/load',
    async (arg) => {
        return await fetchCategory(arg);
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg && selectCategoryStatus(state) === 'idle';
        }
    }
)
