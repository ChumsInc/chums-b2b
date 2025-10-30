import {combineReducers} from "@reduxjs/toolkit";
import alertsReducer from "@/ducks/alerts";
import appReducer from "@/ducks/app";
import cartHeadersSlice from "@/ducks/carts/cartHeadersSlice";
import cartDetailSlice from "@/ducks/carts/cartDetailSlice";
import cartDetailStatusSlice from "@/ducks/carts/cartDetailStatusSlice";
import cartMessagesSlice from "@/ducks/carts/cartMessagesSlice";
import cartStatusSlice from "@/ducks/carts/cartStatusSlice";
import activeCartSlice from "@/ducks/carts/activeCartSlice";
import categoryReducer from "@/ducks/category";
import cookieConsentSlice from "@/ducks/cookie-consent";
import customerReducer from "@/ducks/customer";
import invoicesReducer from "@/ducks/invoices";
import itemLookupReducer from "@/ducks/item-lookup";
import keywordsReducer from "@/ducks/keywords";
import menuReducer from "@/ducks/menu";
import messagesReducer from "@/ducks/messages";
import openOrdersReducer from "@/ducks/open-orders";
import pageReducer from "@/ducks/page";
import productsReducer from "@/ducks/products";
import promoCodeReducer from "@/ducks/promo-code";
import salesOrderReducer from "@/ducks/sales-order";
import searchReducer from "@/ducks/search";
import signUpSlice from "@/ducks/sign-up/signUpSlice";
import userReducer from "@/ducks/user";
import versionReducer from "@/ducks/version";
import userAccessSlice from "@/ducks/user/userAccessSlice";
import customerUsersSlice from "@/ducks/customer/customerUsersSlice.ts";
import customerPricingSlice from "@/ducks/customer/customerPricingSlice.ts";
import customerPaymentCardsSlice from "@/ducks/customer/customerPaymentCardsSlice.ts";
import customerShipToAddressSlice from "@/ducks/customer/customerShipToAddressSlice.ts";
import customerPermissionsSlice from "@/ducks/customer/customerPermissionsSlice.ts";
import recentCustomersSlice from "@/ducks/customers/recentCustomersSlice.ts";
import customerListSlice from "@/ducks/customers/customerListSlice.ts";
import bannersSlice from "@/ducks/banners/bannersSlice.ts";
import salespersonSlice from "@/ducks/reps/salespersonSlice.ts";

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
    [cookieConsentSlice.reducerPath]: cookieConsentSlice.reducer,
    customer: customerReducer,
    [customerPaymentCardsSlice.reducerPath]: customerPaymentCardsSlice.reducer,
    [customerPermissionsSlice.reducerPath]: customerPermissionsSlice.reducer,
    [customerPricingSlice.reducerPath]: customerPricingSlice.reducer,
    [customerShipToAddressSlice.reducerPath]: customerShipToAddressSlice.reducer,
    [customerUsersSlice.reducerPath]: customerUsersSlice.reducer,
    [customerListSlice.reducerPath]: customerListSlice.reducer,
    [recentCustomersSlice.reducerPath]: recentCustomersSlice.reducer,
    invoices: invoicesReducer,
    itemLookup: itemLookupReducer,
    keywords: keywordsReducer,
    menu: menuReducer,
    messages: messagesReducer,
    openOrders: openOrdersReducer,
    page: pageReducer,
    products: productsReducer,
    promo_code: promoCodeReducer,
    [salespersonSlice.reducerPath]: salespersonSlice.reducer,
    salesOrder: salesOrderReducer,
    search: searchReducer,
    [signUpSlice.reducerPath]: signUpSlice.reducer,
    user: userReducer,
    [userAccessSlice.reducerPath]: userAccessSlice.reducer,
    version: versionReducer
});
