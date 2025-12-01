import type {B2BCartDetail, B2BCartHeader} from "chums-types/b2b";

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


export interface CartActionProps extends Partial<Pick<B2BCartHeader, 'shipToCode' | 'salesOrderNo'>> {
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


export interface PromoteCartBody extends CartActionBase {
    action: 'promote',
    cartName: string;
    shipExpireDate: string;
    shipVia: string;
    paymentType: string;
    shipToCode: string;
    comment: string;
    promoCode: string;
    FOB: string;
}

export interface ApplyPromoCodeBody extends CartActionBase {
    action: 'apply-discount',
    promoCode: string;
}

export interface AddToCartBody extends Pick<B2BCartDetail, 'itemCode' | 'unitOfMeasure' | 'quantityOrdered' | 'commentText'> {
    productId?: number | null;
    productItemId?: number | null;
    priceLevel?: string | null;
    itemType?: string;
    customerPONo?: string;
    shipToCode?: string | null;
}

export interface AddToCartProps extends Omit<CartItemActionProps, 'cartId' | 'cartItemId'> {
    cartId: number | null;
    cartName?: string;
    item: AddToCartBody;
}

export interface UpdateCartProps extends CartActionProps {
    body: UpdateCartHeaderBody;
}

export type UpdateCartItemBody = Pick<B2BCartDetail, 'quantityOrdered' | 'commentText' | 'itemType'>;

export type UpdateCartHeaderBody = Partial<Pick<B2BCartHeader, 'shipToCode' | 'promoCode' | 'customerPONo' | 'comment'>>;

export interface UpdateCartItemProps extends CartItemActionProps {
    item: UpdateCartItemBody;
}

export interface UpdateCartItemsProps extends CartActionProps {
    header?: UpdateCartHeaderBody;
    items: Pick<B2BCartDetail, 'id' | 'itemType' | 'quantityOrdered' | 'commentText'>[];
}

export interface DeleteCartItemProps extends CartActionProps {
    cartItemId: number | string;
}

export interface DuplicateCartProps extends Pick<CartActionProps, 'customerKey' | 'shipToCode'> {
    cartName: string;
    salesOrderNo: string;
}
