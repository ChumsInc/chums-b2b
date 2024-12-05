import {ShipToAddress} from "b2b-types";
import {B2BCartDetail} from "./cart-detail.d.ts";
import {B2BCartHeader} from "./cart-header.d.ts";

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
    | 'sync'
    | 'test-freight'
    | 'update-item'
    | 'update-line'
    | 'update';


export interface CartActionProps extends Partial<Pick<B2BCartHeader, 'shipToCode'|'salesOrderNo'>> {
    cartId: number;
    customerKey: string;
    setActiveCart?: boolean;
}

export interface CartItemActionProps extends CartActionProps {
    cartItemId: number;
}

export interface CartActionBase {
    action: CartAction;
    cartId: number;
    promoCode?: string;
    comment?: string;
    versionNo?: string | null;
    referrer?: string;
    timestamp?: string;
}

export interface CartDetailBody {
    cartDetailId: number;
    itemCode: string;
    quantityOrdered: number;
    commentText?: string;
}

export interface CartAppendBody extends CartActionBase, CartDetailBody {
    action: 'append';
}

//@TODO: Verify this is valid!
export interface CartAppendCommentBody extends CartActionBase, Omit<CartDetailBody, 'QuantityOrdered'> {
    action: 'line-comment';
}

export interface CartDeleteItemBody extends CartActionBase, Pick<CartDetailBody, 'cartDetailId'> {
    action: 'delete-line';
}

export interface CartDeleteBody extends CartActionBase, Partial<Pick<B2BCartHeader, 'salesOrderNo'>> {
    action: 'delete';
}


export interface PromoteCartBody extends CartActionBase {
    action: 'promote',
    cartName: string;
    shipExpireDate: string;
    shipVia: string;
    paymentType: string;
    shipToCode: string;
    comment: string;
    promoCode: string;
}

export interface DeleteCartBody extends CartActionBase {
    action: 'delete'
}


export interface NewCartBody extends CartActionBase, CartDetailBody {
    action: 'new',
    cartName: string;
    promo_code: string;
}

export interface UpdateCartBody extends CartActionBase, ShipToAddress {
    action: 'update';
    cartName: string;
    shipToCode: string;
    confirmTo: string | null;
    changedLines: CartDetailBody[];
    newLines: Omit<CartDetailBody, 'cartDetailId'>[];
}

export interface ApplyPromoCodeBody extends CartActionBase {
    action: 'apply-discount',
    promoCode: string;
}

export interface DuplicateSalesOrderBody extends CartActionBase {
    action: 'duplicate',
    cartName: string;
    salesOrderNo: string;
    promoCode?: string;
}

export interface SyncSalesOrderBody extends Omit<CartActionBase, 'cartId'> {
    action: 'sync',
    salesOrderNo: string;
}


export type CartActionBody =
    CartAppendBody
    | CartAppendCommentBody
    | CartDeleteItemBody
    | PromoteCartBody
    | DeleteCartBody
    | UpdateCartItemBody
    | NewCartBody
    | UpdateCartBody
    | ApplyPromoCodeBody
    | DuplicateSalesOrderBody
    | SyncSalesOrderBody;

export interface AddToCartBody extends Pick<B2BCartDetail, 'itemCode' | 'unitOfMeasure' | 'quantityOrdered' | 'commentText'> {
    productId?: number | null;
    productItemId?: number | null;
    priceLevel?: string | null;
    itemType?: string;
    customerPONo?: string;
    shipToCode?: string|null;
}

export interface AddToNewCartBody extends AddToCartBody {
    customerPONo: string;
    shipToCode?: string|null;
}

export interface AddToCartProps extends Omit<CartItemActionProps, 'cartId'|'cartItemId'> {
    cartId: number|null;
    cartName?: string;
    item: AddToCartBody;
}
export type AddToNewCartProps = AddToCartProps & Partial<Pick<B2BCartHeader, 'shipToCode'>>;

export interface UpdateCartProps extends CartActionProps {
    body: UpdateCartHeaderBody;
}
export type UpdateCartItemBody = Pick<B2BCartDetail, 'quantityOrdered'|'commentText'|'itemType'>;

export type UpdateCartHeaderBody = Partial<Pick<B2BCartHeader, 'shipToCode' | 'promoCode' | 'customerPONo' | 'comment'>>;

export interface UpdateCartItemProps extends CartItemActionProps {
    item: UpdateCartItemBody;
}

export interface UpdateCartItemsProps extends CartActionProps {
    header?: UpdateCartHeaderBody;
    items: Pick<B2BCartDetail, 'id'|'itemType'|'quantityOrdered'|'commentText'>[];
}

export interface DeleteCartItemProps extends CartActionProps {
    cartItemId: number | string;
}

export type LoadCartItemProps = Required<Pick<CartItemActionProps, 'userId'|'cartId'|'cartItemId'>>

export type LoadCartsProps = Partial<CartActionProps> & Required<Pick<CartActionProps, 'userId'>>;
export type LoadCartProps = Required<Pick<CartActionProps, 'userId'|'cartId'>>;
export type LoadCartDetailProps = Pick<CartActionProps, 'cartId' | 'userId'>;