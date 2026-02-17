import type {CartProgress} from "chums-types/b2b";

export interface CartProgressList {
    cart: CartProgress;
    delivery: CartProgress;
    payment: CartProgress;
    confirm: CartProgress;
}

export interface CartMessage {
    message: string;
    key: string;
}

type CartStatusValue = 'idle' | 'loading' | 'saving' | 'sending' | 'deleting' | 'not-found';

export interface CartStatus {
    key: number;
    status: CartStatusValue;
}

export interface CartDetailStatus {
    id: number;
    cartId: number;
    status: CartStatusValue;
}
