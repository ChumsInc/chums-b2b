import {combineReducers, configureStore} from "@reduxjs/toolkit";
import alertsReducer from "@/ducks/alerts";
import appReducer from "@/ducks/app";
import userReducer from "@/ducks/user";
import productsReducer from "@/ducks/products";
import categoryReducer from "@/ducks/category";
import customerReducer from "@/ducks/customer";
import openOrdersReducer from "@/ducks/open-orders";
import promoCodeReducer from "@/ducks/promo-code";
import invoicesReducer from "@/ducks/invoices";
import salesOrderReducer from "@/ducks/sales-order";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import prepState from "./preloaded-state";
import versionReducer from "@/ducks/version";
import messagesReducer from "@/ducks/messages";
import searchReducer from "@/ducks/search";
import menuReducer from "@/ducks/menu";
import pageReducer from "@/ducks/page";
import customersReducer from "@/ducks/customers";
import repsReducer from "@/ducks/reps";
import itemLookupReducer from "@/ducks/item-lookup";
import signUpReducer from "@/ducks/sign-up";
import cartMessagesSlice from "@/ducks/carts/cartMessagesSlice";
import cartStatusSlice from "@/ducks/carts/cartStatusSlice";
import activeCartSlice from "@/ducks/carts/activeCartSlice";
import cartDetailSlice from "@/ducks/carts/cartDetailSlice";
import cartHeadersSlice from "@/ducks/carts/cartHeadersSlice";
import cartDetailStatusSlice from "@/ducks/carts/cartDetailStatusSlice";
import customerPricing from "@/ducks/customer-pricing";
import bannersSlice from "@/ducks/banners";
import keywordsSlice from "@/ducks/keywords";


export const rootReducer = combineReducers({
    alerts: alertsReducer,
    app: appReducer,
    [bannersSlice.reducerPath]: bannersSlice.reducer,
    [cartHeadersSlice.reducerPath]: cartHeadersSlice.reducer,
    [cartDetailSlice.reducerPath]: cartDetailSlice.reducer,
    [cartDetailStatusSlice.reducerPath]: cartDetailStatusSlice.reducer,
    [cartMessagesSlice.reducerPath]: cartMessagesSlice.reducer,
    [cartStatusSlice.reducerPath]: cartStatusSlice.reducer,
    [activeCartSlice.reducerPath]: activeCartSlice.reducer,
    category: categoryReducer,
    customer: customerReducer,
    [customerPricing.reducerPath]: customerPricing.reducer,
    customers: customersReducer,
    invoices: invoicesReducer,
    itemLookup: itemLookupReducer,
    [keywordsSlice.reducerPath]: keywordsSlice.reducer,
    menu: menuReducer,
    messages: messagesReducer,
    openOrders: openOrdersReducer,
    page: pageReducer,
    products: productsReducer,
    promo_code: promoCodeReducer,
    reps: repsReducer,
    salesOrder: salesOrderReducer,
    search: searchReducer,
    signUp: signUpReducer,
    user: userReducer,
    version: versionReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
    preloadedState: prepState(typeof window === 'undefined' ? {} : window?.__PRELOADED_STATE__ ?? {}),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
