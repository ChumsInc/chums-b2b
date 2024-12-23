import {RootState} from "@app/configureStore";

export const selectSalesOrderNo = (state: RootState) => state.salesOrder.salesOrderNo;
export const selectSalesOrderProcessing = (state: RootState) => state.salesOrder.processing;
export const selectSOLoading = (state: RootState) => state.salesOrder.loading;
export const selectSOLoaded = (state: RootState) => state.salesOrder.loaded;
export const selectSendEmailResponse = (state: RootState) => state.salesOrder.sendEmail.response;
export const selectSendEmailStatus = (state: RootState) => state.salesOrder.sendEmail.status;
export const selectSendEmailError = (state: RootState) => state.salesOrder.sendEmail.error;
export const selectAttempts = (state: RootState) => state.salesOrder.attempts;
export const selectSalesOrderHeader = (state: RootState) => state.salesOrder.header ?? null;
export const selectSalesOrderDetail = (state: RootState) => state.salesOrder.detail ?? [];
export const selectSalesOrderInvoices = (state: RootState) => state.salesOrder.invoices;
export const selectSalesOrderPayment = (state: RootState) => state.salesOrder.payment;
export const selectOrderType = (state: RootState) => state.salesOrder.orderType;
