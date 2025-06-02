import React from "react";
import {selectLoggedIn} from "@/ducks/user/selectors";
import AppUpdateLocalLogin from "@/components/AppUpdateLocalLogin";
import AlertList from "@/ducks/alerts/AlertList";
import {Outlet} from "react-router";
import AppErrorBoundary from "../common-components/AppErrorBoundary";
import Header from "./Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SiteMessages from "@/ducks/messages/SiteMessages";
import GoogleSignInOneTap from "@/ducks/user/components/GoogleSignInOneTap";
import CartMessageSnackbar from "@/ducks/carts/components/CartMessageSnackbar";
import {useAppSelector} from "@/app/configureStore";


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
                    <AppErrorBoundary>
                        <Outlet/>
                    </AppErrorBoundary>
                </Container>
                <CartMessageSnackbar/>
            </Box>
            <Footer/>
        </>
    )
}

export default MainOutlet;
