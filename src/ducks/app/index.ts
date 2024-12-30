import localStore from "../../utils/LocalStore";
import {STORE_USER_PREFS} from "@constants/stores";
import {createReducer} from "@reduxjs/toolkit";
import {PreloadedState} from "@typeDefs/preload";

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
    customerTab: 0,
    documentTitle: 'Home',
    keywords: preload?.keywords?.list ?? [],
    lifestyle: '',
    debug: null,
    nonce: preload?.app?.nonce ?? null,
})

const appReducer = createReducer(initialAppState, (builder) => {
    // @TODO: Remove app reducer
})

export default appReducer;
