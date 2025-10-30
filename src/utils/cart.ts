import type {CartProgress} from "@/types/cart/cart-utils";
import type {SalesOrderDetailLine} from "b2b-types";
import type {ChangeDetailLine, NewCommentLine} from "@/types/cart";

export const changedDetailLine = (line: SalesOrderDetailLine): ChangeDetailLine => {
    const {LineKey, ItemCode, QuantityOrdered, CommentText} = line;
    return {LineKey, ItemCode, QuantityOrdered, CommentText};
}

export const newCommentLine = (line: SalesOrderDetailLine): NewCommentLine => {
    const {LineKey, CommentText} = line;
    return {LineKey, CommentText};
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
