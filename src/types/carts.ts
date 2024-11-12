import {SalesOrderHeader, SalesOrderStatus, SalesOrderType, UserProfile} from "b2b-types";

export type CartType = SalesOrderType | '_';

export type B2BUserInfo = Pick<UserProfile, 'id' | 'email' | 'name' | 'accountType' | 'company'>;

export interface B2BCart {
    header: B2BCartHeader;
    detail: B2BCartDetail[];
    detailLoaded?: boolean;
    status?: 'idle' | 'loading' | 'saving' | 'deleting' | 'rejected';
}


export interface B2BCartHeader extends Partial<Omit<SalesOrderHeader, 'SalesOrderNo' | 'OrderType' | 'OrderStatus'
    | 'ARDivisionNo' | 'CustomerNo' | 'ShipToCode' | 'SalespersonDivisionNo' | 'SalespersonNo' | 'CustomerPONo'
    | 'ShipExpireDate' | 'ShipVia' | 'UDF_PROMO_DEAL' | 'Comment'>> {
    id: number;
    salesOrderNo: string;
    orderType: CartType;
    orderStatus: SalesOrderStatus;
    arDivisionNo: string;
    customerNo: string;
    shipToCode: string | null;
    customerName: string;
    shipToName: string | null;
    customerKey: string;
    salespersonDivisionNo: string | null;
    salespersonNo: string | null;
    salespersonKey: string;
    salespersonName: string | null;
    customerPONo: string | null;
    shipExpireDate: string | null;
    shipVia: string | null;
    promoCode: string | null;
    comment: string | null;
    subTotalAmt: string;
    dateCreated: string;
    createdByUser: B2BUserInfo | null;
    dateUpdated: string;
    updatedByUser: B2BUserInfo | null;
    dateImported: string | null;
    paymentType?: string;
}

export interface B2BCartDetail extends Omit<B2BCartLine, 'priceLevel' | 'productId' | 'productItemId' | 'quantityOrdered' | 'unitOfMeasure'> {
    pricing: B2BCartPricing;
    cartProduct: B2BCartProduct;
    itemCodeDesc: string | null;
    commentText: string | null;
    unitOfMeasure: string | null;
    quantityOrdered: string | number;
    dateUpdated: string;
}

export interface B2BCartLine {
    id: number;
    cartHeaderId: number;
    productId?: number | null;
    productItemId?: number | null;
    salesOrderNo: string | null;
    lineKey: string | null;
    itemCode: string;
    itemType: string;
    priceLevel: string | null;
    commentText: string | null;
    unitOfMeasure: string;
    unitOfMeasureConvFactor: string|number|null;
    quantityOrdered: number;
    unitPrice: string | number;
    extensionAmt: string | number;
    itemStatus: string | null;
    dateCreated: string;
    dateUpdated: string;
    dateImported: string | null;
}

export interface B2BCartPricing {
    priceCode: string | null;
    priceLevel: string | null;
    pricingMethod: string | null;
    breakQuantity: number | null;
    discountMarkup: number | null;
}

export interface B2BCartProduct {
    productId: number | null;
    productItemId: number | null;
    image: string | null;
    colorCode: string | null;
    swatchCode: string | null;
    available: string | number | null;
}

export interface CartActionProps {
    cartId: number;
    customerKey: string | null;
}

export interface AddToCartBody extends Pick<B2BCartDetail, 'itemCode' | 'unitOfMeasure' | 'quantityOrdered' | 'commentText'> {
    itemType?: string;
    productId?: number | null;
    productItemId?: number | null;
    priceLevel?: string | null;
}

export type UpdateCartItemBody = Pick<B2BCartDetail, 'quantityOrdered' | 'commentText'>;

export type UpdateCartHeaderBody = Partial<Pick<B2BCartHeader, 'shipToCode' | 'promoCode' | 'customerPONo' | 'comment'>>;

export interface UpdateCartProps extends CartActionProps {
    body: UpdateCartHeaderBody;
}

export interface AddToCartProps extends Omit<CartActionProps, 'cartId'> {
    cartId?: number;
    body: AddToCartBody
}

export interface UpdateCartItemProps extends CartActionProps {
    cartItemId: number | string;
    body: UpdateCartItemBody;
}

export interface DeleteCartItemProps extends CartActionProps {
    cartItemId: number | string;
}

export interface B2BCartList {
    [key: number]: B2BCart;
}
