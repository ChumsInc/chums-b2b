import React, {StrictMode, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from "../ducks/user/components/LoginPage";
import {useSelector} from 'react-redux';
import {loadProfile} from '@ducks/user/actions';
import {loadCustomer} from '@ducks/customer/actions';
import ProfilePage from "../ducks/user/components/ProfilePage";
import AccountPage from "../ducks/customer/components/AccountPage";
import SalesOrderPage from "../ducks/open-orders/components/SalesOrderPage";
import SignUp from "../ducks/sign-up/SignUp";
import Logout from "../components/Logout";
import ResetPassword from "../ducks/user/components/ResetPassword";
import ContentPage from "../ducks/page/ContentPage";
import InvoicePage from "../ducks/invoices/components/InvoicePage";
import {selectCurrentCustomer, selectLoggedIn} from "@ducks/user/selectors";
import {selectCustomerLoaded, selectCustomerLoading} from "@ducks/customer/selectors";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import AccountListContainer from "../ducks/customers/components/AccountListContainer";
import {useAppDispatch, useAppSelector} from "./configureStore";
import MainOutlet from "./MainOutlet";
import ProductRouter from "../ducks/products/components/ProductRouter";
import BillToForm from "../ducks/customer/components/BillToForm";
import ShipToForm from "../ducks/customer/components/ShipToForm";
import CustomerUsers from "../ducks/customer/components/CustomerUsers";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ContentPage404 from "../components/ContentPage404";
import OpenOrdersList from "../ducks/open-orders/components/OpenOrdersList";
import InvoicesList from "../ducks/invoices/components/InvoicesList";
import ShipToList from "../ducks/customer/components/ShipToList";
import theme from "./theme";
import Home from "../components/Home";
import ClosedSalesOrderPage from "../ducks/open-orders/components/ClosedSalesOrderPage";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "@constants/app";
import RequestPasswordResetForm from "../ducks/user/components/RequestPasswordResetForm";
import ChangePasswordPage from "../ducks/user/components/ChangePasswordPage";
import {useIsSSR} from "@hooks/is-server-side";
import LocalStore from "../utils/LocalStore";
import {isTokenExpired} from "@utils/jwtHelper";
import {auth} from "@api/IntranetAuthService";
import {useLocation} from "react-router";
import {sendGtagEvent} from "@api/gtag";
import {selectAppNonce} from "@ducks/app/selectors";
import EditAccountUserForm from "../ducks/customer/components/EditAccountUserForm";
import CartsPage from "@ducks/carts/components/CartsPage";
import CartPage from "@ducks/carts/components/CartPage";


const App = () => {
    const isSSR = useIsSSR();
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectLoggedIn);
    const currentCustomer = useSelector(selectCurrentCustomer);
    const customerLoading = useSelector(selectCustomerLoading);
    const customerLoaded = useSelector(selectCustomerLoaded);
    const nonce = useAppSelector(selectAppNonce);
    const location = useLocation();

    useEffect(() => {
        sendGtagEvent('page_view');
    }, [location]);

    useEffect(() => {
        if (isSSR) {
            return;
        }
        LocalStore.removeDeprecatedItems();
        const token = auth.getToken();
        if (token && isTokenExpired(token)) {
            auth.removeToken();
        }
    }, [isSSR]);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(loadProfile());
        if (!!currentCustomer && !customerLoading && !customerLoaded) {
            dispatch(loadCustomer(currentCustomer));
        }
    }, [isLoggedIn]);

    return (
        <StrictMode>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} nonce={nonce ?? undefined}>
                            <Routes>
                                <Route path="/" element={<MainOutlet/>}>
                                    <Route index element={<Home/>}/>
                                    <Route path="/home" element={<Home/>}/>
                                    <Route path="/products" element={<ProductRouter/>}/>
                                    <Route path="/products/:category" element={<ProductRouter/>}/>
                                    <Route path="/products/:category/:product" element={<ProductRouter/>}/>
                                    <Route path="/products/:category/:product/:sku" element={<ProductRouter/>}/>
                                    <Route path="/pages/:keyword" element={<ContentPage/>}/>
                                    {!isLoggedIn && (
                                        <>
                                            <Route path="/set-password/:hash/:key" element={<ResetPassword/>}/>
                                            <Route path="/set-password" element={<ResetPassword/>}/>
                                            <Route path="/signup/:hash/:key" element={<ResetPassword/>}/>
                                            <Route path="/signup" element={<SignUp/>}/>
                                            <Route path="/reset-password" element={<RequestPasswordResetForm/>}/>
                                            <Route path="/login" element={<Login/>}/>
                                            <Route path="*" element={<Login/>}/>
                                        </>
                                    )}
                                    {isLoggedIn && (
                                        <>
                                            <Route path="/login" element={<Login/>}/>
                                            <Route path="/logout" element={<Logout/>}/>
                                            <Route path="/profile" element={<ProfilePage/>}/>
                                            <Route path="/profile/set-password" element={<ChangePasswordPage/>}/>
                                            <Route path="/profile/:id" element={<AccountListContainer/>}/>
                                            <Route path="/account/:customerSlug" element={<AccountPage/>}>
                                                <Route index element={<BillToForm/>}/>
                                                <Route path="delivery" element={<ShipToList/>}/>
                                                <Route path="delivery/:shipToCode" element={<ShipToForm/>}/>
                                                <Route path="users" element={<CustomerUsers/>}>
                                                    <Route path=":id?" element={<EditAccountUserForm/>}/>
                                                </Route>
                                                <Route path="carts" element={<CartsPage/>}/>
                                                <Route path="carts/:id" element={<CartPage/>}/>
                                                {/*<Route path="carts/:salesOrderNo" element={<SalesOrderPage/>}/>*/}
                                                <Route path="orders" element={<OpenOrdersList/>}/>
                                                <Route path="orders/:salesOrderNo" element={<SalesOrderPage/>}/>
                                                <Route path="closed/:salesOrderNo" element={<ClosedSalesOrderPage/>}/>
                                                <Route path="invoices" element={<InvoicesList/>}/>
                                                <Route path="invoices/:type/:invoiceNo" element={<InvoicePage/>}/>
                                                <Route path="*" element={<ContentPage404/>}/>
                                            </Route>
                                            <Route path="*" element={<ContentPage404/>}/>
                                        </>
                                    )}
                                    <Route path="*" element={<ContentPage404/>}/>
                                </Route>
                            </Routes>
                        </GoogleOAuthProvider>
                    </CssBaseline>
                </ThemeProvider>
            </LocalizationProvider>
        </StrictMode>
    )
}


export default App

