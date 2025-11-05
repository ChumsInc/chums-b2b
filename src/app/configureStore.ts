"use client";

import {configureStore} from '@reduxjs/toolkit';
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {PreloadedState} from "chums-types/b2b";
import userProfileSlice, {initialUserState} from "@/ducks/user/userProfileSlice";
import {initializeActiveCartState} from "@/ducks/carts/utils";
import {rootReducer} from "@/app/root-reducer";
import {getPreloadCustomerState} from "@/ducks/customers/customerListSlice";
import {getPreloadedBannersState} from "@/ducks/banners/bannersSlice";
import invoiceListSlice, {getInvoiceListInitialState} from "@/ducks/invoices/invoiceListSlice";


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
    preloadedState: getPreloadedState(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

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
