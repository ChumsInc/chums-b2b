import {SalesOrderDetailLine} from "b2b-types";

export interface Appendable {
    newLine?: boolean;
}

export type ChangeDetailLine = Pick<SalesOrderDetailLine, 'LineKey' | 'ItemCode' | 'QuantityOrdered' | 'CommentText'>

export type NewCommentLine = Pick<SalesOrderDetailLine, 'LineKey' | 'CommentText'>

export type CartAction =
    'append'
    | 'append-comment'
    | 'apply-discount'
    | 'delete'
    | 'delete-line'
    | 'duplicate'
    | 'line-comment'
    | 'new'
    | 'promote'
    | 'test-freight'
    | 'update-item'
    | 'update-line'
    | 'update';

export interface CartQuoteBase {
    action: CartAction;
    SalesOrderNo: string;
    promo_code?: string;
    Comment?: string;
    versionNo?: string | null;
    referrer?: string;
}


export interface PromoteCartBody extends CartQuoteBase {
    action: 'promote',
    CartName: string;
    ShipExpireDate: string;
    ShipVia: string;
    PaymentType: string;
    ShipToCode: string;
    Comment: string;
    promo_code: string;
}

export interface UpdateCartItemBody extends CartQuoteBase {
    action: 'update-item' | 'append';
    LineKey?: string;
    ItemCode: string;
    QuantityOrdered: number;
    Comment: string;
}

export interface ApplyPromoCodeBody extends CartQuoteBase {
    action: 'apply-discount',
    promo_code: string;
    SalesOrderNo: string;
}


export type CartProgress_Cart = 0;
export type CartProgress_Delivery = 1;
export type CartProgress_Payment = 2;
export type CartProgress_Confirm = 3;

export type CartProgress = CartProgress_Cart | CartProgress_Delivery | CartProgress_Payment | CartProgress_Confirm;

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
