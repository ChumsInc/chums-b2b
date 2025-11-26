import {Outlet} from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";
import AppUpdateLocalLogin from "@/components/user/AppUpdateLocalLogin.tsx";
import AlertList from "@/components/alerts/AlertList.tsx";
import ErrorBoundary from "@/components/common/ErrorBoundary.tsx";
import Header from "./Header.tsx";
import Footer from "@/components/footer/Footer.tsx";
import SiteMessages from "@/components/messages/SiteMessages.tsx";
import GoogleSignInOneTap from "@/components/user/login/GoogleSignInOneTap.tsx";
import CartMessageSnackbar from "@/components/b2b-cart/CartMessageSnackbar.tsx";
import CookieConsentDrawer from "@/components/cookie-consent/CookieConsentDrawer.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {useEffect, useState} from "react";

export default function MainOutlet() {
    const loggedIn = useAppSelector(selectLoggedIn);
    const [allowAuth, setAllowAuth] = useState(false);

    useEffect(() => {
        setAllowAuth(true)
    }, []);

    return (
        <>
            <Header/>
            <Box component="main" sx={{marginTop: '100px', marginBottom: '3rem'}}>
                <SiteMessages/>
                <Container maxWidth="xl">
                    {allowAuth && loggedIn && <AppUpdateLocalLogin/>}
                    {allowAuth && !loggedIn && <GoogleSignInOneTap/>}
                    <AlertList/>
                    <ErrorBoundary>
                        <Outlet/>
                    </ErrorBoundary>
                </Container>
                <CartMessageSnackbar/>
            </Box>
            <Footer/>
            <CookieConsentDrawer/>
        </>
    )
}
