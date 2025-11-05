"use server";

import {StrictMode} from 'react';
import {Route, Routes} from 'react-router';
import Login from "@/components/user/login/LoginPage";
import ProfilePage from "@/components/user/profile/ProfilePage";
import AccountPage from "@/components/customer/AccountPage";
import SalesOrderPage from "../ducks/open-orders/components/SalesOrderPage";
import SignUp from "@/components/sign-up/SignUp";
import Logout from "@/components/user/Logout";
import ResetPassword from "@/components/user/ResetPassword";
import ContentPage from "../ducks/page/ContentPage";
import InvoicePage from "@/components/invoices/InvoicePage";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import AccountListContainer from "@/components/customerList/AccountListContainer";
import MainOutlet from "./MainOutlet";
import ProductRouter from "../ducks/products/components/ProductRouter";
import BillToForm from "@/components/customer/billing/BillToForm";
import ShipToForm from "@/components/customer/delivery/ShipToForm";
import CustomerUsers from "@/components/customer/users/CustomerUsers";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ContentPage404 from "../components/ContentPage404";
import OpenOrdersList from "../ducks/open-orders/components/OpenOrdersList";
import InvoicesList from "@/components/invoices/InvoicesList";
import ShipToList from "@/components/customer/delivery/ShipToList";
import theme from "./theme";
import Home from "../components/Home";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "@/constants/app";
import RequestPasswordResetForm from "@/components/user/RequestPasswordResetForm";
import ChangePasswordPage from "@/components/user/ChangePasswordPage";
import {selectAppNonce} from "@/ducks/app/selectors";
import EditAccountUserForm from "@/components/customer/users/EditAccountUserForm";
import CartsPage from "@/components/b2b-cart/CartsPage";
import CartPage from "@/components/b2b-cart/CartPage";
import {useSelector} from "react-redux";


export default function ServerApp() {
    const isLoggedIn = useSelector(selectLoggedIn);
    const nonce = useSelector(selectAppNonce);

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
                                                <Route path="carts/:cartId" element={<CartPage/>}/>
                                                <Route path="orders" element={<OpenOrdersList/>}/>
                                                <Route path="orders/:salesOrderNo" element={<SalesOrderPage/>}/>
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
