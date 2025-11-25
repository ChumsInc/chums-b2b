import {createAction, createReducer, createSelector} from "@reduxjs/toolkit";
import type {Menu} from "chums-types/b2b";
import type {RootState} from "@/app/configureStore";
import {selectCustomerAccessList, selectRepAccessList} from "../user/userAccessSlice";
import {defaultMenuItem} from "./utils";
import {accessListURL} from "../user/utils";
import {loadProductMenu, loadResourcesMenu} from "@/ducks/menu/actions.ts";

export interface MenuState {
    productMenu: Menu | null;
    productMenuStatus: 'idle' | 'loading' | 'rejected';
    resourcesMenu: Menu | null;
    resourcesMenuStatus: 'idle' | 'loading' | 'rejected';
    isOpen: boolean;
}

const initialMenuState: MenuState = {
    productMenu: null,
    productMenuStatus: 'idle',
    resourcesMenu: null,
    resourcesMenuStatus: 'idle',
    isOpen: false,
}

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
