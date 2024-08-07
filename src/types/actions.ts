import {UnknownAction} from "@reduxjs/toolkit";
import {
    CartProduct,
    ContentPage,
    Keyword,
    Product,
    ProductVariant,
    SalesOrder,
    SalesOrderDetailLine,
    SalesOrderHeader
} from "b2b-types";
import {AlertColor} from '@mui/material/Alert'


export interface DeprecatedAsyncAction extends UnknownAction {
    status: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
}

export const isAsyncAction = (action: UnknownAction | DeprecatedAsyncAction): action is DeprecatedAsyncAction => {
    return typeof action.status === 'string'
        && ['FETCH_INIT', 'FETCH_SUCCESS', 'FETCH_FAILURE'].includes(action.status);
}

export interface DeprecatedKeywordsAction extends DeprecatedAsyncAction {
    list: Keyword[]
}

export interface DeprecatedPageAction extends DeprecatedAsyncAction {
    page: ContentPage;
}

export interface DeprecatedSelectVariantAction extends DeprecatedAsyncAction {
    type: 'SELECT_VARIANT',
    variant: ProductVariant | null;
    msrp: string[];
    customerPrice: string[];
    salesUM: string;
    cartItem: CartProduct | null;
}

export interface DeprecatedSelectColorAction extends DeprecatedAsyncAction {
    type: 'SELECT_COLOR';
    colorCode: string;
    cartItem: CartProduct | null;
}

export interface DeprecatedFetchOrdersAction extends DeprecatedAsyncAction {
    type: 'FETCH_ORDERS';
    orders: SalesOrderHeader[];
    cartNo?: string;
    salesOrderNo?: string;
}

export interface DeprecatedFetchSalesOrderAction extends DeprecatedAsyncAction {
    type: 'FETCH_SALES_ORDER';
    isCart?: boolean;
    salesOrder?: SalesOrder | null;
}

export interface DeprecatedCreateNewCartAction extends UnknownAction {
    type: 'CREATE_NEW_CART';
    cart: SalesOrderHeader | null;
}

export interface DeprecatedDeleteCartAction extends DeprecatedAsyncAction {
    type: 'DELETE_CART';
}

export interface DeprecatedSaveCartAction extends DeprecatedAsyncAction {
    type: 'SAVE_CART';
    payload?: string;
    message?: string;
}

export interface DeprecatedUpdateCartItemAction extends UnknownAction {
    type: 'UPDATE_CART_ITEM';
    LineKey: string;
    prop: Partial<SalesOrderDetailLine>;
}


export interface DeprecatedAppendOrderCommentAction extends UnknownAction {
    type: 'APPEND_ORDER_COMMENT';
    commentText: string;
}

export function isDeprecatedAppendOrderCommentAction(action: UnknownAction | DeprecatedAppendOrderCommentAction): action is DeprecatedAppendOrderCommentAction {
    return action.type === "APPEND_ORDER_COMMENT";
}


export interface DeprecatedSetAlertAction extends UnknownAction {
    type: 'SET_ALERT',
    props: {
        severity?: AlertColor;
        title: string;
        message: string;
        context: string;
    }
}

export function isDeprecatedSetAlertAction(action: UnknownAction | DeprecatedSetAlertAction): action is DeprecatedSetAlertAction {
    return action.type === 'SET_ALERT';
}
