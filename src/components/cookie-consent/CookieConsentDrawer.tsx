import {useId, useState} from 'react';
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {
    dismissCookieConsent,
    selectCookieConsentDismissed,
    selectHasCookieConsent,
    selectHasGPCFlag
} from "@/ducks/cookie-consent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import type {CookieConsentBody} from "chums-types/b2b";
import CookieConsentDialog from "@/components/cookie-consent/CookieConsentDialog";
import {saveCookieConsent} from "@/ducks/cookie-consent/actions";
import Link from "@mui/material/Link";
import {Link as RouterLink} from 'react-router'

export default function CookieConsentDrawer() {
    const dispatch = useAppDispatch();
    const gpc = useAppSelector(selectHasGPCFlag);
    const hasCookieConsent = useAppSelector(selectHasCookieConsent);
    const dismissed = useAppSelector(selectCookieConsentDismissed);
    const [showDialog, setShowDialog] = useState(false);
    const id = useId();

    const acceptHandler = () => {
        const body: CookieConsentBody = {
            accepted: gpc ? ['functional', 'preferences'] : ['functional', 'preferences', 'analytics', 'marketing'],
            rejected: gpc ? ['analytics', 'marketing'] : [],
        }
        dispatch(saveCookieConsent(body));
    }

    const onDismiss = () => {
        dispatch(dismissCookieConsent());
    }

    if (dismissed || hasCookieConsent) {
        return null
    }

    return (
        <Drawer open anchor="bottom" variant="permanent">
            <Grid container spacing={2} sx={{padding: 2, alignItems: 'center'}}>
                <Grid size={{xs: 12, lg: "grow"}}>
                    <Typography sx={{mb: 1}}>This website uses cookies and similar technologies to enable site
                        functionality as well as for
                        analytics, personalization and targeted advertising.</Typography>
                    {gpc && (
                        <Typography sx={{mb: 1}} component="p">
                            We have detected a{' '}<strong>Global Privacy Control</strong>{' '}signal from your browser
                            and have automatically opted you out of our marketing and analytics cookies.
                        </Typography>
                    )}
                    <Typography sx={{fontWeight: 700}} color="chumsRed">Chums does not sell or rent personal information
                        to third parties. See <Link component={RouterLink} to="/pages/privacy-policy">Privacy Policy</Link> for
                        more information.
                    </Typography>
                </Grid>
                <Grid size={{xs: 5, lg: "auto"}}>
                    <Button onClick={() => setShowDialog(true)}
                            aria-controls={id} aria-haspopup={true} aria-expanded={showDialog}>
                        Cookie Settings
                    </Button>
                </Grid>
                <Grid size={{xs: 5, lg: "auto"}}>
                    <Button variant="contained" color="chumsGrey" onClick={acceptHandler}>Accept Cookies</Button>
                </Grid>
                <Grid size={{xs: 2, lg: "auto"}}>
                    <IconButton onClick={onDismiss} aria-label="Dismiss cookie-consent dialog">
                        <CloseIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <CookieConsentDialog open={showDialog} onClose={() => setShowDialog(false)} id={id}/>
        </Drawer>
    )
}
