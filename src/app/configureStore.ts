import {configureStore} from '@reduxjs/toolkit';
import type {PreloadedState} from "chums-types/b2b";
import rootReducer from "@/app/root-reducer.js";
import userProfileSlice, {initialUserState} from "@/ducks/user/userProfileSlice.js";
import {initializeActiveCartState} from "@/ducks/carts/utils.js";
import {getPreloadCustomerState} from "@/ducks/customers/customerListSlice.js";
import {getPreloadedBannersState} from "@/ducks/banners/bannersSlice.js";
import invoiceListSlice, {getInvoiceListInitialState} from "@/ducks/invoices/invoiceListSlice.js";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
    preloadedState: getPreloadedState(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;



function getPreloadedState() {
    const state = (typeof globalThis.window === 'undefined' ? {} : (window.__PRELOADED_STATE__ ?? {})) as PreloadedState;
    return {
        ...state,
        banners: getPreloadedBannersState([]),
        activeCart: initializeActiveCartState(),
        customerList: getPreloadCustomerState(),
        [invoiceListSlice.reducerPath]: getInvoiceListInitialState(),
        [userProfileSlice.reducerPath]: initialUserState(),
    }
}
