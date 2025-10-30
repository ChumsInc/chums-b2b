import {configureStore} from '@reduxjs/toolkit';
import './global-window';
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {PreloadedState} from "b2b-types";
import {initialInvoicesState} from "@/ducks/invoices";
import {initialSalesOrderState} from "@/ducks/sales-order";
import {initialUserState} from "@/ducks/user";
import {initializeActiveCartState} from "@/ducks/carts/utils";
import {rootReducer} from "@/app/root-reducer";
import {getPreloadCustomerState} from "@/ducks/customers/customerListSlice";
import {getPreloadedBannersState} from "@/ducks/banners/bannersSlice";


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
        invoices: initialInvoicesState(),
        salesOrder: initialSalesOrderState(),
        user: initialUserState(),
    }
}
