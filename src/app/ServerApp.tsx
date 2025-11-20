import {StrictMode} from 'react';
import {Route, Routes} from 'react-router';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useSelector} from "react-redux";
import Login from "@/components/user/login/LoginPage.js";
import ProfilePage from "@/components/user/profile/ProfilePage.js";
import AccountPage from "@/components/customer/AccountPage.js";
import SalesOrderPage from "@/components/open-orders/SalesOrderPage.js";
import SignUp from "@/components/sign-up/SignUp.js";
import Logout from "@/components/user/Logout.js";
import ResetPassword from "@/components/user/ResetPassword.js";
import ContentPage from "../ducks/page/ContentPage.js";
import InvoicePage from "@/components/invoices/InvoicePage.js";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.js";
import AccountListContainer from "@/components/customerList/AccountListContainer.js";
import MainOutlet from "./MainOutlet.js";
import ProductRouter from "../ducks/products/components/ProductRouter.js";
import BillToForm from "@/components/customer/billing/BillToForm.js";
import ShipToForm from "@/components/customer/delivery/ShipToForm.js";
import CustomerUsers from "@/components/customer/users/CustomerUsers.js";
import ContentPage404 from "../components/ContentPage404.js";
import OpenOrdersList from "@/components/open-orders/OpenOrdersList.js";
import InvoicesList from "@/components/invoices/InvoicesList.js";
import ShipToList from "@/components/customer/delivery/ShipToList.js";
import theme from "./theme.js";
import Home from "../components/Home.js";
import {GOOGLE_CLIENT_ID} from "@/constants/app.js";
import RequestPasswordResetForm from "@/components/user/RequestPasswordResetForm.js";
import ChangePasswordPage from "@/components/user/ChangePasswordPage.js";
import {selectAppNonce} from "@/ducks/app/selectors.js";
import EditAccountUserForm from "@/components/customer/users/EditAccountUserForm.js";
import CartsPage from "@/components/b2b-cart/CartsPage.js";
import CartPage from "@/components/b2b-cart/CartPage.js";


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
