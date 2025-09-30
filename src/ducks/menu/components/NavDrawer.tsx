import React from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {useAppDispatch} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectIsDrawerOpen, toggleMenuDrawer} from "../index";
import {useIsSSR} from "@/hooks/is-server-side";

const drawerWidth = 240;

interface NavDrawerProps {
    children: React.ReactNode;
}

const NavDrawer = ({children}: NavDrawerProps) => {
    const isSSR = useIsSSR();
    const dispatch = useAppDispatch();
    const isOpen = useSelector(selectIsDrawerOpen);

    const closeHandler = () => {
        dispatch(toggleMenuDrawer());
    }

    if (isSSR) {
        return null;
    }

    return (
        <Box component="nav" aria-label="mobile app menu">
            <Drawer container={window?.document?.body} variant="temporary" open={isOpen}
                    anchor="top"
                    onClose={closeHandler}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', md: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, maxWidth: '75vw'},
                    }}>
                {children}
            </Drawer>
        </Box>
    )
}
export default NavDrawer;
