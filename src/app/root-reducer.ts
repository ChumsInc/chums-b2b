import {combineReducers} from "@reduxjs/toolkit";
import alertsSlice from "@/ducks/alerts/alertsSlice";
import appReducer from "@/ducks/app/index";
import bannersSlice from "@/ducks/banners/bannersSlice";
import cartHeadersSlice from "@/ducks/carts/cartHeadersSlice";
import cartDetailSlice from "@/ducks/carts/cartDetailSlice";
import cartDetailStatusSlice from "@/ducks/carts/cartDetailStatusSlice";
import cartEmailSlice from "@/ducks/carts/cartEmailSlice";
import cartMessagesSlice from "@/ducks/carts/cartMessagesSlice";
import cartStatusSlice from "@/ducks/carts/cartStatusSlice";
import activeCartSlice from "@/ducks/carts/activeCartSlice";
import categoryReducer from "@/ducks/category/index";
import cookieConsentSlice from "@/ducks/cookie-consent/index";
import customerReducer from "@/ducks/customer/index";
import itemLookupReducer from "@/ducks/item-lookup/index";
import keywordsReducer from "@/ducks/keywords/index";
import menuReducer from "@/ducks/menu/index";
import messagesReducer from "@/ducks/messages/index";
import pageReducer from "@/ducks/page/index";
import productsReducer from "@/ducks/products/index";
import promoCodeReducer from "@/ducks/promo-code/index";
import searchReducer from "@/ducks/search/index";
import signUpSlice from "@/ducks/sign-up/signUpSlice";
import userProfileSlice from "@/ducks/user/userProfileSlice";
import versionReducer from "@/ducks/version/index";
import userAccessSlice from "@/ducks/user/userAccessSlice";
import customerUsersSlice from "@/ducks/customer/customerUsersSlice";
import customerPricingSlice from "@/ducks/customer/customerPricingSlice";
import customerPaymentCardsSlice from "@/ducks/customer/customerPaymentCardsSlice";
import customerShipToAddressSlice from "@/ducks/customer/customerShipToAddressSlice";
import customerPermissionsSlice from "@/ducks/customer/customerPermissionsSlice";
import recentCustomersSlice from "@/ducks/customers/recentCustomersSlice";
import customerListSlice from "@/ducks/customers/customerListSlice";
import salespersonSlice from "@/ducks/reps/salespersonSlice";
import invoiceListSlice from "@/ducks/invoices/invoiceListSlice";
import currentInvoiceSlice from "@/ducks/invoices/currentInvoiceSlice";
import openOrdersSlice from "@/ducks/open-orders/openOrdersSlice";
import currentOrderSlice from "@/ducks/open-orders/currentOrderSlice";
import currentCustomerSlice from "@/ducks/customer/currentCustomerSlice";

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
    promoCode: promoCodeReducer,
    [salespersonSlice.reducerPath]: salespersonSlice.reducer,
    search: searchReducer,
    [signUpSlice.reducerPath]: signUpSlice.reducer,
    [userProfileSlice.reducerPath]: userProfileSlice.reducer,
    [userAccessSlice.reducerPath]: userAccessSlice.reducer,
    version: versionReducer
});
export default rootReducer;
