import {useEffect, useState, type ReactNode} from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

const drawerWidth = 240;

interface NavDrawerProps {
    open?: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function NavDrawer({open, onClose, children}: NavDrawerProps) {
    const [container, setContainer] = useState<Element | null>(null);
    useEffect(() => {
        setContainer(window.document.body);
    }, []);

    return (
        <Box component="nav" aria-label="mobile app menu">
            <Drawer container={container} variant="temporary" open={open}
                    anchor="top"
                    onClose={onClose}
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
