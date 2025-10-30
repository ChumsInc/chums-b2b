import React, {type ReactElement, type RefObject, useEffect, useId, useRef, useState} from 'react';
import {useIsSSR} from "@/hooks/is-server-side";
import {NavLink, useLocation} from "react-router";
import {useAppSelector} from "@/app/configureStore";
import {selectLoggedIn} from "@/ducks/user/selectors";
import {type TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import LocalStore from "@/utils/LocalStore";
import {STORE_SHOW_SIGNUP_POPUP} from "@/constants/stores";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ChumsLogo from "../ChumsLogo";
import styled from '@emotion/styled';

const imagePathLandscape = "/images/chums/homepage/2024/06/B2BPopUpImage-landscape.jpg";
const imagePathPortrait = "/images/chums/homepage/2024/06/B2BPopUpImage-portrait.jpg";

function Transition({children, ref, ...rest}: TransitionProps & {
                        children: ReactElement,
                        ref: RefObject<unknown>
                    }
) {
    return <Slide direction="up" ref={ref} {...rest} >{children}</Slide>
}

const excludedPaths = /^\/(login|signup|set-password|reset-password)/;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
`

const SignUpModal = () => {
    const id = useId();
    const isSSR = useIsSSR();
    const location = useLocation();
    const timer = useRef<number>(0);
    const delay = useRef<number>(10 * 1000);
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [enabled, setEnabled] = React.useState<boolean>(LocalStore.getItem<boolean>(STORE_SHOW_SIGNUP_POPUP, !isLoggedIn));

    useEffect(() => {
        if (isSSR) {
            return;
        }

        if (isLoggedIn || excludedPaths.test(location.pathname)) {
            // if the user is logged in, don't bother ever showing the dialog
            // if the user is on the login, signup, reset-password, etc., don't bother ever showing the dialog
            window.clearTimeout(timer.current);
            handleClose();
            return;
        }

        if (!enabled) {
            window.clearTimeout(timer.current)
            return;
        }

        delayShowPopup();
        return () => {
            if (!isSSR) {
                window.clearTimeout(timer.current);
            }
        }
    }, [isLoggedIn, isSSR, enabled, delay.current, location.pathname]);

    const delayShowPopup = () => {
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
            setShowModal(true);
        }, delay.current);
    }

    const handleClose = () => {
        setShowModal(false);
        setEnabled(false);
        LocalStore.setItem<boolean>(STORE_SHOW_SIGNUP_POPUP, false);
    }

    if (isSSR || isLoggedIn || !enabled) {
        return null;
    }

    return (
        <>
            {/*<Button variant="text" onClick={() => setShowModal(true)}>Test Dialog</Button>*/}
            <Dialog open={showModal} slots={{transition: Transition}} keepMounted onClose={handleClose}
                    aria-describedby={id} maxWidth="sm">
                <DialogTitle id={id}>
                    <Typography sx={{textTransform: 'uppercase'}}>Are you a member?</Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Stack direction="column" spacing={2}
                                   sx={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                <ChumsLogo sx={{maxWidth: '75%'}}/>
                                <Typography sx={{textAlign: 'center'}}>
                                    Open your B2B account today for easy ordering and world-class customer service.
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Box sx={{display: {xs: 'inline', sm: 'none'}}}>
                                <StyledImage src={imagePathPortrait} width="361" height="542" loading="lazy" alt=""
                                             role="presentation"/>
                            </Box>
                            <Box sx={{display: {xs: 'none', sm: 'inline'}}}>
                                <StyledImage src={imagePathLandscape} width="722" height="542" loading="lazy" alt=""
                                             role="presentation"/>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={handleClose}>No Thanks</Button>
                    <Button variant="contained"
                            component={NavLink} to="/signup">Open an Account</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SignUpModal;
