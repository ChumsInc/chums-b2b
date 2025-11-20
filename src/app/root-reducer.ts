import {combineReducers} from "@reduxjs/toolkit";
import alertsSlice from "@/ducks/alerts/alertsSlice.js";
import appReducer from "@/ducks/app/index.js";
import bannersSlice from "@/ducks/banners/bannersSlice.js";
import cartHeadersSlice from "@/ducks/carts/cartHeadersSlice.js";
import cartDetailSlice from "@/ducks/carts/cartDetailSlice.js";
import cartDetailStatusSlice from "@/ducks/carts/cartDetailStatusSlice.js";
import cartEmailSlice from "@/ducks/carts/cartEmailSlice.js";
import cartMessagesSlice from "@/ducks/carts/cartMessagesSlice.js";
import cartStatusSlice from "@/ducks/carts/cartStatusSlice.js";
import activeCartSlice from "@/ducks/carts/activeCartSlice.js";
import categoryReducer from "@/ducks/category/index.js";
import cookieConsentSlice from "@/ducks/cookie-consent/index.js";
import customerReducer from "@/ducks/customer/index.js";
import itemLookupReducer from "@/ducks/item-lookup/index.js";
import keywordsReducer from "@/ducks/keywords/index.js";
import menuReducer from "@/ducks/menu/index.js";
import messagesReducer from "@/ducks/messages/index.js";
import pageReducer from "@/ducks/page/index.js";
import productsReducer from "@/ducks/products/index.js";
import promoCodeReducer from "@/ducks/promo-code/index.js";
import searchReducer from "@/ducks/search/index.js";
import signUpSlice from "@/ducks/sign-up/signUpSlice.js";
import userProfileSlice from "@/ducks/user/userProfileSlice.js";
import versionReducer from "@/ducks/version/index.js";
import userAccessSlice from "@/ducks/user/userAccessSlice.js";
import customerUsersSlice from "@/ducks/customer/customerUsersSlice.js";
import customerPricingSlice from "@/ducks/customer/customerPricingSlice.js";
import customerPaymentCardsSlice from "@/ducks/customer/customerPaymentCardsSlice.js";
import customerShipToAddressSlice from "@/ducks/customer/customerShipToAddressSlice.js";
import customerPermissionsSlice from "@/ducks/customer/customerPermissionsSlice.js";
import recentCustomersSlice from "@/ducks/customers/recentCustomersSlice.js";
import customerListSlice from "@/ducks/customers/customerListSlice.js";
import salespersonSlice from "@/ducks/reps/salespersonSlice.js";
import invoiceListSlice from "@/ducks/invoices/invoiceListSlice.js";
import currentInvoiceSlice from "@/ducks/invoices/currentInvoiceSlice.js";
import openOrdersSlice from "@/ducks/open-orders/openOrdersSlice.js";
import currentOrderSlice from "@/ducks/open-orders/currentOrderSlice.js";
import currentCustomerSlice from "@/ducks/customer/currentCustomerSlice.js";

const rootReducer = combineReducers({
    [alertsSlice.reducerPath]: alertsSlice.reducer,
    app: appReducer,
    [bannersSlice.reducerPath]: bannersSlice.reducer,
    [cartHeadersSlice.reducerPath]: cartHeadersSlice.reducer,
    [cartDetailSlice.reducerPath]: cartDetailSlice.reducer,
    [cartDetailStatusSlice.reducerPath]: cartDetailStatusSlice.reducer,
    [cartEmailSlice.reducerPath]: cartEmailSlice.reducer,
    [cartMessagesSlice.reducerPath]: cartMessagesSlice.reducer,
    [cartStatusSlice.reducerPath]: cartStatusSlice.reducer,
    [activeCartSlice.reducerPath]: activeCartSlice.reducer,
    category: categoryReducer,
    [cookieConsentSlice.reducerPath]: cookieConsentSlice.reducer,
    customer: customerReducer,
    [currentCustomerSlice.reducerPath]: currentCustomerSlice.reducer,
    [customerPaymentCardsSlice.reducerPath]: customerPaymentCardsSlice.reducer,
    [customerPermissionsSlice.reducerPath]: customerPermissionsSlice.reducer,
    [customerPricingSlice.reducerPath]: customerPricingSlice.reducer,
    [customerShipToAddressSlice.reducerPath]: customerShipToAddressSlice.reducer,
    [customerUsersSlice.reducerPath]: customerUsersSlice.reducer,
    [customerListSlice.reducerPath]: customerListSlice.reducer,
    [recentCustomersSlice.reducerPath]: recentCustomersSlice.reducer,
    [invoiceListSlice.reducerPath]: invoiceListSlice.reducer,
    [currentInvoiceSlice.reducerPath]: currentInvoiceSlice.reducer,
    itemLookup: itemLookupReducer,
    keywords: keywordsReducer,
    menu: menuReducer,
    messages: messagesReducer,
    [openOrdersSlice.reducerPath]: openOrdersSlice.reducer,
    [currentOrderSlice.reducerPath]: currentOrderSlice.reducer,
    page: pageReducer,
    products: productsReducer,
    promo_code: promoCodeReducer,
    [salespersonSlice.reducerPath]: salespersonSlice.reducer,
    search: searchReducer,
    [signUpSlice.reducerPath]: signUpSlice.reducer,
    [userProfileSlice.reducerPath]: userProfileSlice.reducer,
    [userAccessSlice.reducerPath]: userAccessSlice.reducer,
    version: versionReducer
});
export default rootReducer;
