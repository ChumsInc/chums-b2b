import type {CookieConsentSettings} from "chums-types/b2b";
import LocalStore from "@/utils/LocalStore.js";
import {STORE_COOKIE_CONSENT} from "@/constants/stores.js";

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
