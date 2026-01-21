import {configureStore} from '@reduxjs/toolkit';
import type {PreloadedState} from "chums-types/b2b";
import rootReducer from "@/app/root-reducer";
import userProfileSlice, {initialUserState} from "@/ducks/user/userProfileSlice";
import {initializeActiveCartState} from "@/ducks/carts/utils";
import {getPreloadCustomerState} from "@/ducks/customers/customerListSlice";
// import {getPreloadedBannersState} from "@/ducks/banners/bannersSlice";
import invoiceListSlice, {getInvoiceListInitialState} from "@/ducks/invoices/invoiceListSlice";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
    preloadedState: getPreloadedState(),
    devTools: {
        name: 'CHUMS - B2B'
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;



function getPreloadedState() {
    const state = (typeof globalThis.window === 'undefined' ? {} : (window.__PRELOADED_STATE__ ?? {})) as Omit<PreloadedState, 'banners'>;
    return {
        ...state,
        // banners: getPreloadedBannersState(state?.banners),
        activeCart: initializeActiveCartState(),
        customerList: getPreloadCustomerState(),
        [invoiceListSlice.reducerPath]: getInvoiceListInitialState(),
        [userProfileSlice.reducerPath]: initialUserState(),
    }
}
