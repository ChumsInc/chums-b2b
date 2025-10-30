import {selectLoggedIn} from "@/ducks/user/selectors";
import AppUpdateLocalLogin from "@/components/AppUpdateLocalLogin";
import AlertList from "@/components/alerts/AlertList.tsx";
import {Outlet} from "react-router";
import ErrorBoundary from "@/components/common/ErrorBoundary.tsx";
import Header from "./Header";
import Footer from "@/components/footer/Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SiteMessages from "@/ducks/messages/SiteMessages";
import GoogleSignInOneTap from "@/components/user/login/GoogleSignInOneTap.tsx";
import CartMessageSnackbar from "@/components/b2b-cart/CartMessageSnackbar.tsx";
import CookieConsentDrawer from "@/components/cookie-consent/CookieConsentDrawer";
import {useAppSelector} from "@/app/configureStore.ts";


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
