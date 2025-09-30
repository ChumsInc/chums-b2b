import type {CookieConsentState} from "b2b-types";
import {createSlice} from "@reduxjs/toolkit";
import {loadCookieConsentInfo, loadCookieConsentStatus, saveCookieConsent} from "@/ducks/cookie-consent/actions";

const initialCookieConsentState: CookieConsentState = {
    status: 'idle',
    record: null,
    dismissed: false,
    details: null,
};

const cookieConsentSlice = createSlice({
    name: 'cookieConsent',
    initialState: initialCookieConsentState,
    reducers: {
        dismissCookieConsent: (state) => {
            state.dismissed = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCookieConsentStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCookieConsentStatus.fulfilled, (state, action) => {
                state.status = 'idle';
                state.record = action.payload;
            })
            .addCase(loadCookieConsentStatus.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(saveCookieConsent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveCookieConsent.fulfilled, (state, action) => {
                state.status = 'idle';
                state.record = action.payload;
            })
            .addCase(saveCookieConsent.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(loadCookieConsentInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCookieConsentInfo.fulfilled, (state, action) => {
                state.details = action.payload;
                state.status = 'idle';
            })
            .addCase(loadCookieConsentInfo.rejected, (state) => {
                state.status = 'idle';
            })
    },
    selectors: {
        selectHasCookieConsent: (state) => !!state.record?.ack,
        selectHasGPCFlag: (state) => !!state.record?.gpc,
        selectCookieConsentStatus: (state) => state.status,
        selectCookieConsentRecord: (state) => state.record,
        selectAllowsPreferences: (state) => state.record?.preferences?.preferences ?? false,
        selectAllowsAnalytics: (state) => state.record?.preferences?.analytics ?? false,
        selectAllowsMarketing: (state) => state.record?.preferences?.marketing ?? false,
        selectCookieConsentDismissed: (state) => state.dismissed,
        selectCookieConsentDetails: (state) => state.details,
    }
});

export default cookieConsentSlice;
export const {
    selectHasCookieConsent,
    selectHasGPCFlag,
    selectCookieConsentStatus,
    selectCookieConsentRecord,
    selectAllowsPreferences,
    selectAllowsMarketing,
    selectAllowsAnalytics,
    selectCookieConsentDismissed,
    selectCookieConsentDetails,
} = cookieConsentSlice.selectors;
export const {dismissCookieConsent} = cookieConsentSlice.actions;
