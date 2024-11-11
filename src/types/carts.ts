import {
    PricingMethodType,
    SalesOrder,
    SalesOrderHeader,
    SalesOrderStatus,
    SalesOrderType,
    ShipToAddress,
    UserProfile
} from "b2b-types";

export type CartType = SalesOrderType | '_';

export type B2BUserInfo = Pick<UserProfile, 'id' | 'email' | 'name' | 'accountType' | 'company'>;

export interface B2BCart {
    header: B2BCartHeader;
    detail: B2BCartDetail[];
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
