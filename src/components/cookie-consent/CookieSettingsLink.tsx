import {type ReactNode, useEffect, useId, useState} from 'react';
import CookieConsentDialog from "@/components/cookie-consent/CookieConsentDialog";
import {useAppSelector} from "@/app/hooks";
import {selectCookieConsentRecord} from "@/ducks/cookie-consent";
import LocalStore from "@/utils/LocalStore";
import type {CookieConsentSettings} from "chums-types/b2b";
import {STORE_COOKIE_CONSENT} from "@/constants/stores";
import Link, {type LinkProps} from "@mui/material/Link";

export interface CookieSettingsLinkProps extends Omit<LinkProps, 'children'|'onClick'|'aria-controls'|'aria-haspopup'|'aria-expanded'> {
    children: ReactNode;
}
export default function CookieSettingsLink({children, ...rest}:CookieSettingsLinkProps) {
    const consent = useAppSelector(selectCookieConsentRecord);
    const [show, setShow] = useState<boolean>(false);
    const id = useId();

    useEffect(() => {
        if (consent) {
            LocalStore.setItem<CookieConsentSettings>(STORE_COOKIE_CONSENT, consent.preferences);
        }
    }, [consent]);

    return (
        <>
            <Link sx={{cursor: 'pointer'}} onClick={() => setShow(true)}
                  role="button" aria-controls={id} aria-haspopup="true" aria-expanded={show} {...rest}>
                {children}
            </Link>
            <CookieConsentDialog open={show} onClose={() => setShow(false)} id={id}/>
        </>
    )
}
