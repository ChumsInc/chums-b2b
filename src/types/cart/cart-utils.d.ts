export type CartProgress_Cart = 0;
export type CartProgress_Delivery = 1;
export type CartProgress_Payment = 2;
export type CartProgress_Confirm = 3;

export type CartProgress = CartProgress_Cart | CartProgress_Delivery | CartProgress_Payment | CartProgress_Confirm;

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
