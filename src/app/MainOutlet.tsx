import {Outlet} from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.js";
import AppUpdateLocalLogin from "@/components/AppUpdateLocalLogin.js";
import AlertList from "@/components/alerts/AlertList.js";
import ErrorBoundary from "@/components/common/ErrorBoundary.js";
import Header from "./Header.js";
import Footer from "@/components/footer/Footer.js";
import SiteMessages from "@/ducks/messages/SiteMessages.js";
import GoogleSignInOneTap from "@/components/user/login/GoogleSignInOneTap.js";
import CartMessageSnackbar from "@/components/b2b-cart/CartMessageSnackbar.js";
import CookieConsentDrawer from "@/components/cookie-consent/CookieConsentDrawer.js";
import {useAppSelector} from "@/app/hooks.js";


const MainOutlet = () => {
    const loggedIn = useAppSelector(selectLoggedIn);

    return (
        <>
            <Header/>
            <Box component="main" sx={{marginTop: '100px', marginBottom: '3rem'}}>
                <SiteMessages/>
                <Container maxWidth="xl">
                    {loggedIn && <AppUpdateLocalLogin/>}
                    {!loggedIn && <GoogleSignInOneTap/>}
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

export default MainOutlet;
