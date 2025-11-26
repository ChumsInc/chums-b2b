import {useEffect, useId, useState} from 'react';
import FooterLink from "@/components/footer/FooterLink";
import CookieConsentDialog from "@/components/cookie-consent/CookieConsentDialog";
import {useAppSelector} from "@/app/hooks";
import {selectCookieConsentRecord} from "@/ducks/cookie-consent";
import LocalStore from "@/utils/LocalStore";
import type {CookieConsentSettings} from "chums-types/b2b";
import {STORE_COOKIE_CONSENT} from "@/constants/stores";

export default function CookiePolicyLink() {
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
            <FooterLink sx={{cursor: 'pointer'}} onClick={() => setShow(true)}
                        role="button" aria-controls={id} aria-haspopup="true" aria-expanded={show}>
                Cookie Policy
            </FooterLink>
            <CookieConsentDialog open={show} onClose={() => setShow(false)} id={id} />
        </>
    )
}
