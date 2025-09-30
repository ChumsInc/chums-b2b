import {combineReducers} from "@reduxjs/toolkit";
import alertsReducer from "@/ducks/alerts";
import appReducer from "@/ducks/app";
import bannersReducer from "@/ducks/banners";
import cartHeadersSlice from "@/ducks/carts/cartHeadersSlice";
import cartDetailSlice from "@/ducks/carts/cartDetailSlice";
import cartDetailStatusSlice from "@/ducks/carts/cartDetailStatusSlice";
import cartMessagesSlice from "@/ducks/carts/cartMessagesSlice";
import cartStatusSlice from "@/ducks/carts/cartStatusSlice";
import activeCartSlice from "@/ducks/carts/activeCartSlice";
import categoryReducer from "@/ducks/category";
import cookieConsentSlice from "@/ducks/cookie-consent";
import customerReducer from "@/ducks/customer";
import customersReducer from "@/ducks/customers";
import invoicesReducer from "@/ducks/invoices";
import itemLookupReducer from "@/ducks/item-lookup";
import keywordsReducer from "@/ducks/keywords";
import menuReducer from "@/ducks/menu";
import messagesReducer from "@/ducks/messages";
import openOrdersReducer from "@/ducks/open-orders";
import pageReducer from "@/ducks/page";
import productsReducer from "@/ducks/products";
import promoCodeReducer from "@/ducks/promo-code";
import repsReducer from "@/ducks/reps";
import salesOrderReducer from "@/ducks/sales-order";
import searchReducer from "@/ducks/search";
import signUpReducer from "@/ducks/sign-up";
import userReducer from "@/ducks/user";
import versionReducer from "@/ducks/version";

export const rootReducer = combineReducers({
    alerts: alertsReducer,
    app: appReducer,
    banners: bannersReducer,
    [cartHeadersSlice.reducerPath]: cartHeadersSlice.reducer,
    [cartDetailSlice.reducerPath]: cartDetailSlice.reducer,
    [cartDetailStatusSlice.reducerPath]: cartDetailStatusSlice.reducer,
    [cartMessagesSlice.reducerPath]: cartMessagesSlice.reducer,
    [cartStatusSlice.reducerPath]: cartStatusSlice.reducer,
    [activeCartSlice.reducerPath]: activeCartSlice.reducer,
    category: categoryReducer,
    [cookieConsentSlice.reducerPath]: cookieConsentSlice.reducer,
    customer: customerReducer,
    customers: customersReducer,
    invoices: invoicesReducer,
    itemLookup: itemLookupReducer,
    keywords: keywordsReducer,
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
