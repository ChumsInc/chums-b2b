import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {CustomerKey, SortProps} from "b2b-types";
import {B2BCartHeader} from "@typeDefs/carts";
import {fetchCarts} from "./api";
import {RootState} from "@app/configureStore";
import {selectCartsStatus} from "./selectors";
import {customerSlug} from "@utils/customer";

export const setCartsSearch = createAction<string>("carts/setSearch");
export const setCartsSort = createAction<SortProps<B2BCartHeader>>("carts/setSort");
export const loadCarts = createAsyncThunk<B2BCartHeader[], CustomerKey|null, { state: RootState }>(
    'carts/loadCarts',
    async (arg) => {
        return await fetchCarts(arg!);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!customerSlug(arg) && selectCartsStatus(state) === 'idle'
        }
    }
)
