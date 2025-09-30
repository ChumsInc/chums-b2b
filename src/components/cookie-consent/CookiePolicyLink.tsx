import React, {useEffect, useState} from 'react';
import FooterLink from "@/components/footer/FooterLink";
import CookieConsentDialog from "@/components/cookie-consent/CookieConsentDialog";
import {useAppSelector} from "@/app/configureStore";
import {selectCookieConsentRecord} from "@/ducks/cookie-consent";
import LocalStore from "@/utils/LocalStore";
import {CookieConsentSettings} from "b2b-types";
import {STORE_COOKIE_CONSENT} from "@/constants/stores";

export default function CookiePolicyLink() {
    const consent = useAppSelector(selectCookieConsentRecord);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (consent) {
            LocalStore.setItem<CookieConsentSettings>(STORE_COOKIE_CONSENT, consent.preferences);
        }
    }, [consent]);

    return (
        <>
            <FooterLink sx={{cursor: 'pointer'}} onClick={() => setShow(true)}>Cookie Policy</FooterLink>
            <CookieConsentDialog open={show} onClose={() => setShow(false)} />
        </>
    )
}
