import {type FormEvent, type ReactElement, type RefObject, useEffect, useId, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCookieConsentRecord, selectCookieConsentStatus} from "@/ducks/cookie-consent";
import Dialog, {type DialogProps} from "@mui/material/Dialog";
import {type TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import type {CookieConsentBody, CookieConsentSection, CookieConsentSettings} from "b2b-types";
import List from "@mui/material/List";
import CookieConsentItem from "@/components/cookie-consent/CookieConsentItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {loadCookieConsentInfo, saveCookieConsent} from "@/ducks/cookie-consent/actions";
import LinearProgress from "@mui/material/LinearProgress";


function Transition(
    {ref, ...props}: TransitionProps & {
        children: ReactElement;
        ref: RefObject<unknown>
    }
) {
    return <Slide direction="up" ref={ref} {...props} />;
}

const defaultSettings: CookieConsentSettings = {
    functional: true,
    preferences: true,
    analytics: false,
    marketing: false,
}

export interface CookieConsentDialogProps extends DialogProps {
    open: boolean;
    onClose: () => void;
}

export default function CookieConsentDialog({open, onClose, ...rest}: CookieConsentDialogProps) {
    const dispatch = useAppDispatch();
    const consent = useAppSelector(selectCookieConsentRecord);
    const status = useAppSelector(selectCookieConsentStatus);
    const [preferences, setPreferences] = useState<CookieConsentSettings>(consent?.preferences ?? defaultSettings);
    const formId = useId();

    useEffect(() => {
        if (open) {
            dispatch(loadCookieConsentInfo());
        }
    }, [dispatch, open]);

    useEffect(() => {
        setPreferences(consent?.preferences ?? defaultSettings);
    }, [consent]);

    const saveHandler = async (settings: CookieConsentSettings) => {
        const body: CookieConsentBody = {
            accepted: ['functional'],
            rejected: [],
        }
        if (settings.preferences) {
            body.accepted.push('preferences');
        } else {
            body.rejected.push('preferences');
        }
        if (settings.analytics) {
            body.accepted.push('analytics');
        } else {
            body.rejected.push('analytics');
        }
        if (settings.marketing) {
            body.accepted.push('marketing');
        } else {
            body.rejected.push('marketing');
        }
        await dispatch(saveCookieConsent(body));
        onClose();
    }

    const submitHandler = async (ev: FormEvent) => {
        ev.preventDefault();
        await saveHandler(preferences);

    }

    const changeHandler = (section: CookieConsentSection) => (checked: boolean) => {
        if (section === 'functional') {
            return;
        }
        setPreferences({...preferences, [section]: checked});
    }

    const acceptAllHandler = async () => {
        await saveHandler({functional: true, preferences: true, analytics: true, marketing: true});
    }

    const denyAllHandler = async () => {
        await saveHandler({functional: true, preferences: false, analytics: false, marketing: false});
    }

    return (
        <Dialog open={open} onClose={onClose} {...rest}
                slots={{transition: Transition}} aria-describedby="Cookie consent form for B2B.chums.com">
            <DialogTitle>Cookie and Privacy Preferences</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => onClose()}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                {status !== 'idle' && (<LinearProgress variant="indeterminate"/>)}
                <DialogContentText sx={{mb: 2}}><strong>You value your privacy</strong></DialogContentText>
                <DialogContentText sx={{mb: 2}}>
                    This website uses cookies and similar technologies to enable site functionality as well as for
                    analytics, personalization and targeted advertising.
                </DialogContentText>
                {consent?.gpc && (
                    <DialogContentText sx={{mb: 2}}>
                        We have detected a <strong>Global Privacy Control</strong> signal from your browser and have
                        automatically opted you out of our marketing and analytics cookies. You can opt back in to the
                        analytics and marketing cookies at any time by changing your privacy settings.
                    </DialogContentText>
                )}
                {!!consent?.uuid && <DialogContentText sx={{mb: 2}}>Your cookie ID: {consent.uuid}</DialogContentText>}
                <form id={formId} onSubmit={submitHandler}>
                    <List>
                        <CookieConsentItem consentSection="functional" checked={true}
                                           onChange={changeHandler('functional')}/>
                        <CookieConsentItem consentSection="preferences" checked={preferences.preferences}
                                           onChange={changeHandler('preferences')}/>
                        <CookieConsentItem consentSection="analytics" checked={preferences.analytics}
                                           onChange={changeHandler('analytics')}/>
                        <CookieConsentItem consentSection="marketing" checked={preferences.marketing}
                                           onChange={changeHandler('marketing')}/>
                    </List>
                </form>
            </DialogContent>
            <DialogActions>
                <Button type="button" onClick={onClose} disabled={status !== 'idle'}>
                    Cancel
                </Button>
                <Button type="button" variant="outlined" onClick={denyAllHandler} disabled={status !== 'idle'}>
                    Deny All
                </Button>
                <Button type="button" variant="outlined" onClick={acceptAllHandler} disabled={status !== 'idle'}>
                    Accept All
                </Button>
                <Button type="submit" form={formId} variant="contained" color="primary" disabled={status !== 'idle'}>
                    Save Settings
                </Button>
            </DialogActions>
        </Dialog>
    )
}
