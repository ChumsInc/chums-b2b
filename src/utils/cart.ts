import {CartProgress} from "../types/cart/cart-utils";
import {UnknownAction} from "@reduxjs/toolkit";
import {
    DeprecatedCreateNewCartAction,
    DeprecatedDeleteCartAction,
    DeprecatedFetchOrdersAction,
    DeprecatedSaveCartAction
} from "../types/actions";


export function isDeprecatedFetchOrdersAction(action: UnknownAction | DeprecatedFetchOrdersAction): action is DeprecatedFetchOrdersAction {
    return action.type === 'FETCH_ORDERS';
}

export function isDeprecatedCreateNewCartAction(action: UnknownAction | DeprecatedCreateNewCartAction): action is DeprecatedCreateNewCartAction {
    return action.type === 'CREATE_NEW_CART';
}

export function isDeprecatedDeleteCartAction(action: UnknownAction | DeprecatedDeleteCartAction): action is DeprecatedDeleteCartAction {
    return action.type === "DELETE_CART";
}

export function isDeprecatedSaveCartAction(action: UnknownAction | DeprecatedSaveCartAction): action is DeprecatedSaveCartAction {
    return action.type === 'SAVE_CART';
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
