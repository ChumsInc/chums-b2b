import {Editable} from "b2b-types";

export interface B2BCartLine {
    id: number;
    cartHeaderId: number;
    productId?: number | null;
    productItemId?: number | null;
    salesOrderNo: string | null;
    lineKey: string | null;
    lineSeqNo: string | null;
    itemCode: string;
    productType: string|null;
    itemType: string;
    priceLevel: string | null;
    commentText: string | null;
    unitOfMeasure: string;
    unitOfMeasureConvFactor: string | number | null;
    quantityOrdered: number;
    unitPrice: string | number;
    lineDiscountPercent: number|string;
    discount: string; // Y|N
    extensionAmt: string | number;
    lineStatus: string | null;
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
    suggestedRetailPrice: number | string | null;
}

export interface B2BCartProduct {
    productId: number | null;
    productItemId: number | null;
    categoryKeyword: string | null;
    productKeyword: string | null;
    image: string | null;
    colorCode: string | null;
    swatchCode: string | null;
    available: string | number | null;
    inactiveItem: boolean;
    upc: string|null;
    requiresCustomization?: boolean;
}

export interface B2BCartSeason {
    code: string|null;
    active: boolean;
    available: boolean;
}

export interface SalesOrderDetail {
    lineKey: string | null;
    productType: string | null;
    itemType: string | null;
    salesKitLineKey: string | null;
    explodedKitItem: string | null;
}

export interface B2BCartDetail extends Omit<B2BCartLine, 'priceLevel' | 'productId' | 'productItemId' | 'quantityOrdered'
    | 'unitOfMeasure'>, Editable {
    cartProduct: B2BCartProduct;
    season: B2BCartSeason;
    itemCodeDesc: string;
    pricing: B2BCartPricing;
    commentText: string;
    unitOfMeasure: string | null;
    unitOfMeasureConvFactor: number|string;
    quantityOrdered: string | number;
    quantityAvailable: string|number|null;
    soDetail: SalesOrderDetail;
    dateUpdated: string;
    status?: 'idle'|'saving'|'deleting'
}

export interface B2BCartDetailStatusList {
    [key:number]: 'idle'|'saving'|'deleting';
}
