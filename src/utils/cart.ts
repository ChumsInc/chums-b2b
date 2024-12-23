import {CartProgress} from "../types/cart/cart-utils";
import {UnknownAction} from "@reduxjs/toolkit";
import {
    DeprecatedCreateNewCartAction,
    DeprecatedDeleteCartAction,
    DeprecatedFetchOrdersAction,
    DeprecatedSaveCartAction
} from "../types/actions";
import {SalesOrderDetailLine} from "b2b-types";
import {ChangeDetailLine, NewCommentLine} from "@typeDefs/cart";

export const changedDetailLine = (line:SalesOrderDetailLine):ChangeDetailLine => {
    const {LineKey, ItemCode, QuantityOrdered, CommentText} = line;
    return {LineKey, ItemCode, QuantityOrdered, CommentText};
}

export const newCommentLine = (line:SalesOrderDetailLine):NewCommentLine => {
    const {LineKey, CommentText} = line;
    return {LineKey, CommentText};
}

export function isDeprecatedFetchOrdersAction(action: UnknownAction | DeprecatedFetchOrdersAction): action is DeprecatedFetchOrdersAction {
    return action.type === 'FETCH_ORDERS';
}

export function isDeprecatedCreateNewCartAction(action: UnknownAction | DeprecatedCreateNewCartAction): action is DeprecatedCreateNewCartAction {
    return action.type === 'CREATE_NEW_CART';
}

export function isDeprecatedDeleteCartAction(action: UnknownAction | DeprecatedDeleteCartAction): action is DeprecatedDeleteCartAction {
    return action.type === "DELETE_CART";
}


export const cartProgress_Cart: CartProgress = 0;
export const cartProgress_Delivery: CartProgress = 1;
export const cartProgress_Payment: CartProgress = 2;
export const cartProgress_Confirm: CartProgress = 3;

export function nextCartProgress(cartProgress: CartProgress): CartProgress {
    if (cartProgress < cartProgress_Confirm) {
        return cartProgress + 1 as CartProgress
    }
    return cartProgress;
}

export interface Selectable {
    selected?: boolean;
}
