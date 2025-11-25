import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Menu} from "chums-types/b2b";
import type {RootState} from "@/app/configureStore.ts";
import {fetchMenu} from "@/api/menu.ts";
import {selectProductsMenuLoading, selectResourcesMenuLoading} from "@/ducks/menu/index.ts";

export const loadProductMenu = createAsyncThunk<Menu | null, void, { state: RootState }>(
    'menus/productMenu',
    async () => {
        return fetchMenu(2);
    }, {
        condition: (_, {getState}) => {
            const state = getState();
            return !selectProductsMenuLoading(state);
        }
    }
)

export const loadResourcesMenu = createAsyncThunk<Menu | null, void, { state: RootState }>(
    'menus/loadResourcesMenu',
    async () => {
        return await fetchMenu(122);
    }, {
        condition: (_, {getState}) => {
            const state = getState();
            return !selectResourcesMenuLoading(state);
        }
    }
)
