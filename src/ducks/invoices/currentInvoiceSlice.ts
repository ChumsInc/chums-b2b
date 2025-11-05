import type {
    InvoiceHistoryDetail,
    InvoiceHistoryHeader,
    InvoicePaymentRecord,
    InvoiceTrackingRecord,
    PaperlessLogRow
} from "chums-types/b2b";
import {createSelector, createSlice, type WritableDraft} from "@reduxjs/toolkit";
import {loadInvoice, loadInvoices} from "@/ducks/invoices/actions";
import {invoiceKey} from "@/ducks/invoices/utils";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {customerSlug} from "@/utils/customer";
import {setCustomerAccount} from "@/ducks/customer/actions";

export interface InvoiceState {
    customerKey: string | null;
    invoice: InvoiceHistoryHeader | null;
    detail: InvoiceHistoryDetail[];
    tracking: InvoiceTrackingRecord[];
    payments: InvoicePaymentRecord[];
    paperless: PaperlessLogRow[];
    status: 'idle' | 'loading' | 'rejected';
}

const initialState: InvoiceState = {
    customerKey: null,
    invoice: null,
    detail: [],
    tracking: [],
    payments: [],
    paperless: [],
    status: 'idle'
};

const currentInvoiceSlice = createSlice({
    name: 'currentInvoice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadInvoice.pending, (state, action) => {
                state.status = 'loading';
                if (state.invoice && invoiceKey(state.invoice) !== invoiceKey(action.meta.arg)) {
                    resetInvoice(state);
                }
            })
            .addCase(loadInvoice.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    const {Detail, Paperless, Track, Payments, ...header} = action.payload;
                    state.invoice = header;
                    state.detail = Detail ?? [];
                    state.paperless = Paperless ?? [];
                    state.tracking = Track ?? [];
                }
            })
            .addCase(loadInvoice.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(dismissContextAlert, (state, action) => {
                if (action.payload?.startsWith(loadInvoice.typePrefix)) {
                    state.status = 'idle';
                }
            })
            .addCase(loadInvoices.fulfilled, (state, action) => {
                if (state.invoice) {
                    const key = invoiceKey(state.invoice);
                    const invoice = action.payload.find(inv => invoiceKey(inv) === key);
                    if (invoice) {
                        state.invoice = invoice;
                    }
                }
            })
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    state.customerKey = null;
                    resetInvoice(state);
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                const customerKey = customerSlug(action?.meta?.arg);
                if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    resetInvoice(state);
                }
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    resetInvoice(state);
                }
            })
    },
    selectors: {
        selectCurrentInvoice: (state) => state.invoice,
        selectCurrentInvoiceNo: (state) => state.invoice?.InvoiceNo ?? null,
        selectCurrentInvoiceStatus: (state) => state.status,
        selectCurrentInvoiceDetail: (state) => state.detail,
        selectCurrentInvoiceTracking: (state) => state.tracking,
        selectCurrentInvoicePayments: (state) => state.payments,
        selectCurrentInvoicePaperless: (state) => state.paperless,
    }
});


export default currentInvoiceSlice;
export const {
    selectCurrentInvoice,
    selectCurrentInvoicePaperless,
    selectCurrentInvoiceDetail,
    selectCurrentInvoicePayments,
    selectCurrentInvoiceStatus,
    selectCurrentInvoiceTracking,
    selectCurrentInvoiceNo
} = currentInvoiceSlice.selectors


export const selectSortedInvoiceDetail = createSelector(
    [selectCurrentInvoiceDetail],
    (detail) => {
        return [...detail]
            .sort((a, b) => Number(a.DetailSeqNo) - Number(b.DetailSeqNo))
    }
)

function resetInvoice(state: WritableDraft<InvoiceState>) {
    state.invoice = null;
    state.detail = [];
    state.tracking = [];
    state.payments = [];
    state.paperless = [];
    state.status = 'idle';
}

