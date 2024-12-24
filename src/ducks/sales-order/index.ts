import {createReducer} from "@reduxjs/toolkit";
import {defaultDetailSorter, isClosedSalesOrder} from "./utils";
import {calcOrderType} from "@utils/orders";
import {loadCustomer, setCustomerAccount} from "../customer/actions";
import {setLoggedIn, setUserAccess} from "../user/actions";
import {BillToCustomer, Editable, EmailResponse, SalesOrderDetailLine, SalesOrderHeader} from "b2b-types";
import {customerSlug} from "@utils/customer";
import {Appendable, LoadStatus} from "@typeDefs/generic";
import {OrderType} from "@typeDefs/salesorder";
import {closeEmailResponse, sendOrderEmail} from "./actions";
import localStore from "../../utils/LocalStore";
import {STORE_CURRENT_CART, STORE_CUSTOMER} from "@constants/stores";
import {loadOpenOrders, loadSalesOrder} from "../open-orders/actions";

export interface SalesOrderState {
    customerKey: string | null;
    salesOrderNo: string;
    header: (SalesOrderHeader & Editable) | null;
    detail: (SalesOrderDetailLine & Editable & Appendable)[];
    invoices: string[];
    payment: unknown[],
    orderType: OrderType | null;
    readOnly: boolean;
    processing: LoadStatus;
    sendEmail: {
        status: LoadStatus | 'fulfilled';
        response: EmailResponse | null;
        error: string | null;
    }
    attempts: number;
    loading: boolean;
    loaded: boolean;
}

export const initialSalesOrderState = (): SalesOrderState => ({
    customerKey: customerSlug(localStore.getItem<BillToCustomer | null>(STORE_CUSTOMER, null)),
    salesOrderNo: localStore.getItem<string>(STORE_CURRENT_CART, ''),
    header: null,
    detail: [],
    invoices: [],
    payment: [],
    orderType: 'past',
    readOnly: true,
    processing: 'idle',
    sendEmail: {
        status: 'idle',
        response: null,
        error: null,
    },
    attempts: 0,
    loading: false,
    loaded: false,
})

const salesOrderReducer = createReducer(initialSalesOrderState, (builder) => {
    builder
        .addCase(setCustomerAccount.fulfilled, (state, action) => {
            const customerKey = customerSlug(action.meta.arg);
            if (state.customerKey !== customerKey) {
                state.customerKey = customerKey;
                state.salesOrderNo = '';
                state.header = null;
                state.detail = [];
                state.invoices = [];
                state.payment = [];
                state.orderType = 'past';
                state.attempts = 0;
                state.loaded = false;
            }
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                state.salesOrderNo = '';
                state.header = null;
                state.detail = [];
                state.invoices = [];
                state.payment = [];
                state.orderType = 'past';
                state.attempts = 0;
                state.loaded = false;
                state.customerKey = null;
                state.sendEmail = {
                    error: null,
                    status: 'idle',
                    response: null,
                };
            }
        })
        .addCase(setUserAccess.pending, (state, action) => {
            if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== customerSlug(state.header)) {
                state.header = null;
                state.salesOrderNo = '';
                state.detail = [];
                state.invoices = [];
                state.payment = [];
                state.orderType = 'past';
                state.attempts = 0;
                state.loaded = false;
            }
        })
        .addCase(loadCustomer.pending, (state, action) => {
            const customerKey = customerSlug(action.meta.arg);
            if (state.customerKey !== customerKey) {
                state.customerKey = customerKey;
                state.salesOrderNo = '';
                state.header = null;
                state.detail = [];
                state.invoices = [];
                state.payment = [];
                state.orderType = 'past';
                state.attempts = 0;
                state.loaded = false;
            }
        })
        .addCase(sendOrderEmail.pending, (state) => {
            state.sendEmail.status = 'pending';
            state.sendEmail.response = null;
            state.sendEmail.error = null;
        })
        .addCase(sendOrderEmail.fulfilled, (state, action) => {
            state.sendEmail.response = action.payload;
            state.sendEmail.status = 'fulfilled';
        })
        .addCase(sendOrderEmail.rejected, (state, action) => {
            state.sendEmail.status = 'idle';
            state.sendEmail.response = null;
            state.sendEmail.error = action?.error?.message ?? null;
        })
        .addCase(closeEmailResponse, (state) => {
            state.sendEmail.status = 'idle';
            state.sendEmail.response = null;
            state.sendEmail.error = null;
        })
        .addCase(loadOpenOrders.fulfilled, (state, action) => {
            const [so] = action.payload.filter(so => so.SalesOrderNo === state.salesOrderNo);
            state.header = so ?? null;
            state.orderType = calcOrderType(so);
            state.readOnly = true;
            if (!so) {
                state.detail = [];
                state.invoices = [];
                state.payment = [];
            }
        })
        .addCase(loadSalesOrder.pending, (state) => {
            state.processing = 'pending';
        })
        .addCase(loadSalesOrder.fulfilled, (state, action) => {
            state.processing = 'idle';
            if (action.payload && isClosedSalesOrder(action.payload)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {invoices, detail, payment, b2bUsers, ...rest} = action.payload;
                state.header = rest;
                state.detail = [...detail].sort(defaultDetailSorter);
                state.invoices = invoices ?? [];
                state.payment = payment ?? [];
                state.orderType = calcOrderType(action.payload);
                state.readOnly = true;
            } else {
                state.header = null;
                state.orderType = null;
                state.readOnly = true;
                state.detail = [];
                state.invoices = [];
                state.payment = [];
            }
        })
        .addCase(loadSalesOrder.rejected, (state) => {
            state.processing = 'idle';
        })
})

export default salesOrderReducer;
