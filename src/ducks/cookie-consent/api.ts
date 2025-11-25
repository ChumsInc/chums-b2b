import {fetchJSON} from "@/api/fetch";
import type {CookieConsentBody, CookieConsentInfo, CookieConsentRecord} from "chums-types/b2b";
import debug from "@/utils/debug.ts";

export async function getCookieConsent(): Promise<CookieConsentRecord | null> {
    try {
        const url = '/api/cookie-consent.json';
        const res = await fetchJSON<CookieConsentRecord | null>(url, {cache: 'no-cache'});
        return res ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("getCookieConsent()", err.message);
            return Promise.reject(err);
        }
        debug("getCookieConsent()", err);
        return Promise.reject(new Error('Error in getCookieConsent()'));
    }
}

export async function postCookieConsent(arg: CookieConsentBody): Promise<CookieConsentRecord | null> {
    try {
        const url = '/api/cookie-consent.json';
        const body = JSON.stringify(arg);
        return await fetchJSON<CookieConsentRecord>(url, {method: 'POST', body});
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("putCookieConsent()", err.message);
            return Promise.reject(err);
        }
        debug("putCookieConsent()", err);
        return Promise.reject(new Error('Error in putCookieConsent()'));
    }
}

export async function getCookieConsentInfo(): Promise<CookieConsentInfo | null> {
    try {
        const url = '/api/cookie-consent/info.json';
        const res = await fetchJSON<CookieConsentInfo | null>(url);
        return res ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("getCookieConsentInfo()", err.message);
            return Promise.reject(err);
        }
        debug("getCookieConsentInfo()", err);
        return Promise.reject(new Error('Error in getCookieConsentInfo()'));
    }
}
