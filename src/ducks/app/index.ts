import {CUSTOMER_TABS, SUB_NAV_TYPES} from "../../constants/app";
import localStore from "../../utils/LocalStore";
import {STORE_USER_PREFS} from "../../constants/stores";
import {createReducer} from "@reduxjs/toolkit";
import {setCustomerTab, setLifestyle, setRowsPerPage, setSubNavBar, toggleXSNavBar} from "./actions";
import {setCustomerAccount} from "../customer/actions";
import {PreloadedState} from "../../types/preload";

import {Keyword, Menu} from "b2b-types";

export interface AppState {
    productMenu: Menu | null;
    showNavBar: boolean;
    subNav: string;
    rowsPerPage: number;
    customerTab: number;
    documentTitle: string;
    keywords: Keyword[],
    lifestyle: string;
    debug: boolean | null;
    nonce: string | null;
}

export const initialAppState = (preload?: PreloadedState): AppState => ({
    productMenu: preload?.app?.productMenu ?? null,
    showNavBar: false,
    subNav: '',
    rowsPerPage: localStore.getItem(STORE_USER_PREFS, {rowsPerPage: 10}).rowsPerPage,
    customerTab: CUSTOMER_TABS[0].id,
    documentTitle: 'Home',
    keywords: preload?.keywords?.list ?? [],
    lifestyle: '',
    debug: null,
    nonce: preload?.app?.nonce ?? null,
})

const appReducer = createReducer(initialAppState, (builder) => {
    builder
        .addCase(setCustomerAccount.fulfilled, (state) => {
            state.customerTab = CUSTOMER_TABS[0].id;
        })
        .addCase(toggleXSNavBar, (state) => {
            state.showNavBar = !state.showNavBar;
        })
        .addCase(setSubNavBar, (state, action) => {
            state.subNav = action.payload;
            if (action.payload === SUB_NAV_TYPES.none) {
                state.showNavBar = false;
            }
        })
        .addCase(setRowsPerPage, (state, action) => {
            state.rowsPerPage = action.payload;
        })
        .addCase(setLifestyle, (state, action) => {
            state.lifestyle = action.payload ?? '';
        })
        .addCase(setCustomerTab, (state, action) => {
            state.customerTab = action.payload;
        })
})

export default appReducer;
