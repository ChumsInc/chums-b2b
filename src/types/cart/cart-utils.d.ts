import {B2BCart} from "@typeDefs/cart/cart";

export type CartProgress_Cart = 0;
export type CartProgress_Delivery = 1;
export type CartProgress_Payment = 2;
export type CartProgress_Confirm = 3;

export type CartProgress = CartProgress_Cart | CartProgress_Delivery | CartProgress_Payment | CartProgress_Confirm;

export interface B2BCartList {
    [key: number]: B2BCart;
}

export interface CartMessage {
    message: string;
    key: string;
}

export interface CartStatusList {
    [key: number]: 'idle'|'loading'|'saving'|'deleting'|'not-found';
}

export interface CartStatus {
    key: number;
    status: 'idle'|'loading'|'saving'|'deleting'|'not-found';
}
