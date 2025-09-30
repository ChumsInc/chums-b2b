import {configureStore} from '@reduxjs/toolkit';
import './global-window';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {PreloadedState} from "b2b-types";
import {rootReducer} from "@/app/root-reducer";
import {initializeActiveCartState} from "@/ducks/carts/activeCartSlice";
import {initialCustomersState} from "@/ducks/customers";
import {initialInvoicesState} from "@/ducks/invoices";
import {initialSalesOrderState} from "@/ducks/sales-order";
import {initialUserState} from "@/ducks/user";


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
    const state = typeof window === 'undefined' ? {} : (window.__PRELOADED_STATE__ ?? {}) as PreloadedState;
    return {
        ...state,
        activeCart: initializeActiveCartState(),
        customers: initialCustomersState(),
        invoices: initialInvoicesState(),
        salesOrder: initialSalesOrderState(),
        user: initialUserState(),
    }
}
