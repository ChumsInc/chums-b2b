import type {CookieConsentSettings} from "b2b-types";
import LocalStore from "@/utils/LocalStore";
import {STORE_COOKIE_CONSENT} from "@/constants/stores";

export function storeCookieConsent(settings:CookieConsentSettings) {
    LocalStore.setItem<CookieConsentSettings>(STORE_COOKIE_CONSENT, settings)
}

export function canStorePreferences():boolean {
    const settings = LocalStore.getItem<CookieConsentSettings|null>(STORE_COOKIE_CONSENT, null);
    return settings?.preferences ?? false;
}

export function canStoreAnalytics():boolean {
    const settings = LocalStore.getItem<CookieConsentSettings|null>(STORE_COOKIE_CONSENT, null);
    return settings?.analytics ?? false;
}
