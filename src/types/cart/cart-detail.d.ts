import type {
    B2BCartLine,
    B2BCartPricing,
    B2BCartProduct,
    B2BCartSeason,
    Editable,
    SalesOrderDetail
} from "chums-types/b2b";

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
