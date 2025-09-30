import {createAsyncThunk} from "@reduxjs/toolkit";
import type {CookieConsentBody, CookieConsentRecord, CookieConsentInfo} from "b2b-types";
import type {RootState} from "@/app/configureStore";
import {getCookieConsent, getCookieConsentInfo, postCookieConsent} from "@/ducks/cookie-consent/api";
import {selectCookieConsentStatus} from "@/ducks/cookie-consent/index";

export const loadCookieConsentStatus = createAsyncThunk<CookieConsentRecord | null, void, { state: RootState }>(
    'cookie-consent/load',
    async () => {
        return await getCookieConsent()
    }, {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCookieConsentStatus(state) === 'idle';
        }
    }
)

export const saveCookieConsent = createAsyncThunk<CookieConsentRecord | null, CookieConsentBody, { state: RootState }>(
    'cookie-consent/save',
    async (arg) => {
        return await postCookieConsent(arg);
    }, {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCookieConsentStatus(state) === 'idle';
        }
    }
)

export const loadCookieConsentInfo = createAsyncThunk<CookieConsentInfo|null, void, {state:RootState}>(
    'cookie-consent/load-info',
    async () => {
        return await getCookieConsentInfo()
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCookieConsentStatus(state) === 'idle';
        }
    }
)
