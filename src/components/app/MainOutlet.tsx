import {Outlet, useLocation} from "react-router";
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
import {useEffect} from "react";
import CustomerProvider from "@/components/customer/CustomerProvider.tsx";
import {ga4PageView} from "@/utils/ga4/generic.ts";
import ProfileProvider from "@/components/user/profile-provider/ProfileProvider.tsx";

export default function MainOutlet() {
    const loggedIn = useAppSelector(selectLoggedIn);
    const location = useLocation();
    const allowAuth = typeof globalThis.window !== 'undefined';

    useEffect(() => {
        ga4PageView()
    }, [location]);


    return (
        <ProfileProvider>
            <CustomerProvider>
                <Header/>
                <Box component="main" sx={{marginTop: '100px', marginBottom: '3res'}}>
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
            </CustomerProvider>
        </ProfileProvider>
    )
}
