import {useEffect, useState} from "react";
import {Route, Routes} from "react-router";
import MainOutlet from "@/components/app/MainOutlet.tsx";
import Home from "@/components/home/Home.tsx";
import ProductRouter from "@/components/products/ProductRouter.tsx";
import ContentPage from "@/components/pages/ContentPage.tsx";
import ResetPassword from "@/components/user/ResetPassword.tsx";
import SignUp from "@/components/sign-up/SignUp.tsx";
import RequestPasswordResetForm from "@/components/user/RequestPasswordResetForm.tsx";
import Login from "@/components/user/login/LoginPage.tsx";
import Logout from "@/components/user/Logout.tsx";
import ProfilePage from "@/components/user/profile/ProfilePage.tsx";
import ChangePasswordPage from "@/components/user/ChangePasswordPage.tsx";
import AccountListContainer from "@/components/customerList/AccountListContainer.tsx";
import AccountPage from "@/components/customer/AccountPage.tsx";
import BillToForm from "@/components/customer/billing/BillToForm.tsx";
import ShipToList from "@/components/customer/delivery/ShipToList.tsx";
import ShipToForm from "@/components/customer/delivery/ShipToForm.tsx";
import CustomerUsers from "@/components/customer/users/CustomerUsers.tsx";
import EditAccountUserForm from "@/components/customer/users/EditAccountUserForm.tsx";
import CartsPage from "@/components/b2b-cart/CartsPage.tsx";
import CartPage from "@/components/b2b-cart/CartPage.tsx";
import OpenOrdersList from "@/components/open-orders/OpenOrdersList.tsx";
import SalesOrderPage from "@/components/open-orders/SalesOrderPage.tsx";
import InvoicesList from "@/components/invoices/InvoicesList.tsx";
import InvoicePage from "@/components/invoices/InvoicePage.tsx";
import ContentPage404 from "@/components/ContentPage404.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";


export default function AppRouter() {
    const _isLoggedIn = useAppSelector(selectLoggedIn);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(_isLoggedIn);
    }, [_isLoggedIn]);

    return (
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
    )
}
