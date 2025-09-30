import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HideOnScroll from "../../../components/HideOnScroll";
import Divider from '@mui/material/Divider';
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import NavDrawer from "./NavDrawer";
import HomeLink from "./HomeLink";
import {useAppDispatch} from "@/app/configureStore";
import {toggleMenuDrawer} from "../index";
import Container from "@mui/material/Container";
import UserMenu from "./UserMenu";
import CartMenu from "./CartMenu";
import SearchBar from "../../search/components/SearchBar";
import NavProductsLink from "@/ducks/menu/components/NavProductsLink";
import NavLoginLink from "@/ducks/menu/components/NavLoginLink";
import NavSignupLink from "@/ducks/menu/components/NavSignupLink";
import NavAccountsLink from "@/ducks/menu/components/NavAccountsLink";
import NavCustomerLink from "@/ducks/menu/components/NavCustomerLink";
import NavResourcesLink from "@/ducks/menu/components/NavResourcesLink";

function NavMenuList({inDrawer}: { inDrawer?: boolean }) {
    return (
        <>
            <NavProductsLink inDrawer={inDrawer}/>
            <NavLoginLink inDrawer={inDrawer}/>
            <NavSignupLink inDrawer={inDrawer}/>
            <NavAccountsLink inDrawer={inDrawer}/>
            <NavCustomerLink inDrawer={inDrawer}/>
            <NavResourcesLink inDrawer={inDrawer}/>
        </>
    )
}

const NavBarUI = () => {
    const dispatch = useAppDispatch();

    const handleDrawerToggle = () => {
        dispatch(toggleMenuDrawer());
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <HomeLink sx={{display: {xs: 'block', md: 'none'}}}/>
            <Divider/>
            <List>
                <NavMenuList inDrawer/>
            </List>
        </Box>
    );

    return (
        <div>
            <HideOnScroll>
                <AppBar component="nav" color="default">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <IconButton color="inherit" aria-label="open drawer" edge="start"
                                        onClick={handleDrawerToggle}
                                        sx={{mr: 2, display: {md: 'none'}}}>
                                <MenuIcon/>
                            </IconButton>
                            <HomeLink/>
                            <Box sx={{
                                display: {xs: 'none', md: 'flex'},
                                flex: '1 1 auto',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <NavMenuList/>
                            </Box>
                            <Box sx={{display: {xs: 'none', md: 'flex'}, flex: '1 1 auto'}}>
                                <SearchBar/>
                            </Box>
                            <Stack spacing={2} direction="row" useFlexGap>
                                <CartMenu/>
                                <UserMenu/>
                            </Stack>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
            <NavDrawer>
                {drawer}
            </NavDrawer>
        </div>

    )
}

export default NavBarUI;
