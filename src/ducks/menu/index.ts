import {createAction, createAsyncThunk, createReducer, createSelector} from "@reduxjs/toolkit";
import type {Menu, MenuItem} from "b2b-types";
import {type RootState} from "@/app/configureStore";
import {fetchMenu} from "@/api/menu";
import {selectCustomerAccessList, selectRepAccessList} from "../user/userAccessSlice";
import {defaultMenuItem} from "./utils";
import {accessListURL} from "../user/utils";

export interface MenuState {
    productMenu: Menu | null;
    productMenuStatus: 'idle' | 'loading' | 'rejected';
    resourcesMenu: Menu | null;
    resourcesMenuStatus: 'idle' | 'loading' | 'rejected';
    isOpen: boolean;
}


export const sortMenuPriority = (a: MenuItem, b: MenuItem) => a.priority === b.priority
    ? (a.title === b.title ? 0 : (a.title > b.title ? 1 : -1))
    : a.priority > b.priority ? 1 : -1;


const initialMenuState: MenuState = {
    productMenu: null,
    productMenuStatus: 'idle',
    resourcesMenu: null,
    resourcesMenuStatus: 'idle',
    isOpen: false,
}

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

export const selectProductMenu = (state: RootState): Menu | null => state.menu.productMenu;
export const selectResourcesMenu = (state: RootState) => state.menu.resourcesMenu;
export const selectProductsMenuLoading = (state: RootState) => state.menu.productMenuStatus !== 'idle';
export const selectResourcesMenuLoading = (state: RootState) => state.menu.resourcesMenuStatus !== 'loading';
export const selectProductMenuLoaded = (state: RootState) => !!state.menu.productMenu;
export const selectResourcesMenuLoaded = (state: RootState) => !!state.menu.resourcesMenu;
export const selectIsDrawerOpen = (state: RootState) => state.menu.isOpen;
export const selectCustomerMenuItems = createSelector(
    [selectCustomerAccessList],
    (list) => list.map(row => ({
        ...defaultMenuItem,
        title: `${row.CustomerName} (${row.ARDivisionNo}-${row.CustomerNo})`,
        url: accessListURL(row)
    })));

export const selectRepMenuItems = createSelector(
    [selectRepAccessList],
    (list) => list.map(row => ({
        ...defaultMenuItem,
        title: `${row.SalespersonName} (${row.SalespersonDivisionNo}-${row.SalespersonNo})`,
        url: accessListURL(row)
    })));

export const selectShouldLoadProductMenu = createSelector(
    [selectProductsMenuLoading, selectProductMenuLoaded],
    (loading, loaded) => !loading && !loaded
)

export const selectShouldLoadResourcesMenu = createSelector(
    [selectResourcesMenuLoading, selectResourcesMenuLoaded],
    (loading, loaded) => !loading && !loaded
)
export const toggleMenuDrawer = createAction<boolean | undefined>('menu/toggleDrawer');

const menuReducer = createReducer(initialMenuState, (builder) => {
    builder
        .addCase(toggleMenuDrawer, (state, action) => {
            state.isOpen = action.payload ?? !state.isOpen;
        })
        .addCase(loadProductMenu.pending, (state) => {
            state.productMenuStatus = 'loading';
        })
        .addCase(loadProductMenu.fulfilled, (state, action) => {
            state.productMenuStatus = 'idle'
            state.productMenu = action.payload;
        })
        .addCase(loadProductMenu.rejected, (state) => {
            state.productMenuStatus = 'rejected';
        })
        .addCase(loadResourcesMenu.pending, (state) => {
            state.resourcesMenuStatus = 'loading';
        })
        .addCase(loadResourcesMenu.fulfilled, (state, action) => {
            state.resourcesMenuStatus = 'idle';
            state.resourcesMenu = action.payload;
        })
        .addCase(loadResourcesMenu.rejected, (state) => {
            state.resourcesMenuStatus = 'rejected'
        })
});

export default menuReducer;
