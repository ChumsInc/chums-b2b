import React from 'react';
import {selectLoggedIn} from "@/ducks/user/selectors";
import {useSelector} from "react-redux";
import AppUpdateLocalLogin from "@/components/AppUpdateLocalLogin";
import AlertList from "@/ducks/alerts/AlertList";
import {Outlet} from "react-router";
import ErrorBoundary from "../common-components/ErrorBoundary";
import Header from "./Header";
import Footer from "@/components/footer/Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SiteMessages from "@/ducks/messages/SiteMessages";
import GoogleSignInOneTap from "@/ducks/user/components/GoogleSignInOneTap";
import CartMessageSnackbar from "@/ducks/carts/components/CartMessageSnackbar";
import CookieConsentDrawer from "@/components/cookie-consent/CookieConsentDrawer";


const MainOutlet = () => {
    const loggedIn = useSelector(selectLoggedIn);

    return (
        <>
            <Header/>
            <Box component="main" sx={{marginTop: '100px', marginBottom: '3rem'}}>
                <SiteMessages />
                <Container maxWidth="xl">
                    {loggedIn && <AppUpdateLocalLogin/>}
                    {!loggedIn && <GoogleSignInOneTap />}
                    <AlertList/>
                    <ErrorBoundary>
                        <Outlet/>
                    </ErrorBoundary>
                </Container>
                <CartMessageSnackbar />
            </Box>
            <Footer/>
            <CookieConsentDrawer />
        </>
    )
}

export default MainOutlet;
