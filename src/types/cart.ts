import type {SalesOrderDetailLine} from "chums-types/b2b";

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


export interface ApplyPromoCodeBody extends CartQuoteBase {
    action: 'apply-discount',
    promo_code: string;
    SalesOrderNo: string;
}
