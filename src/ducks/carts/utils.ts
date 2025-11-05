import type {BasicCustomer, CartProduct, SortProps} from "chums-types/b2b";
import type {B2BCartHeader} from "@/types/cart/cart-header";
import Decimal from "decimal.js";
import type {B2BCartDetail} from "@/types/cart/cart-detail";
import localStore from "@/utils/LocalStore";
import type {CustomerShippingAccount} from "@/types/customer";
import {STORE_CURRENT_CART, STORE_CUSTOMER, STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@/constants/stores";
import {customerSlug} from "@/utils/customer";
import type {ActiveCartExtraState} from "@/ducks/carts/activeCartSlice";

export const defaultCartsSort: SortProps<B2BCartHeader> = {
    field: 'id',
    ascending: true,
}

export const cartsSorter = ({field, ascending}: SortProps<B2BCartHeader>) => (a: B2BCartHeader, b: B2BCartHeader) => {
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'salesOrderNo':
        case 'customerPONo':
        case 'dateCreated':
        case 'shipToName':
            case 'ShipToName':
            return (
                (a[field] ?? '').toLowerCase() === (b[field] ?? '').toLowerCase()
                    ? (a.id - b.id)
                    : (
                        (a[field] ?? '').toLowerCase() > (b[field] ?? '').toLowerCase()
                            ? 1
                            : -1
                    )
            ) * sortMod;
        case 'ShipToCity':
            return (
                shipToLocation(a).toLowerCase().localeCompare(shipToLocation(b).toLowerCase()) === 0
                ? (a.id - b.id)
                : shipToLocation(a).toLowerCase().localeCompare(shipToLocation(b).toLowerCase())
            ) * sortMod;
        case 'subTotalAmt':
            return (
                new Decimal(a[field]).eq(b[field])
                    ? a.id - b.id
                    : (
                        new Decimal(a[field]).gt(b[field])
                            ? 1
                            : -1
                    )
            ) * sortMod
        case 'id':
        default:
            return (a.id - b.id) * sortMod;
    }
}

export const parseCartId = (str?: number | string | null): number => {
    if (!str) {
        return NaN;
    }
    return +str;
}

export const defaultCartDetailSort: SortProps<B2BCartDetail> = {
    field: 'id',
    ascending: true,
}

export const cartDetailSorter = ({
                                     field,
                                     ascending
                                 }: SortProps<B2BCartDetail>) => (a: B2BCartDetail, b: B2BCartDetail) => {
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'itemCode':
            return (
                a[field].toLowerCase() === b[field].toLowerCase()
                    ? (a.id - b.id)
                    : (a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1)
            ) * sortMod;
        case 'lineKey':
        case 'lineSeqNo':
            return (
                +(a[field] ?? 0) === +(b[field] ?? 0)
                    ? (a.id - b.id)
                    : +(a[field] ?? 0) - +(b[field] ?? 0)
            ) * sortMod;
        case 'id':
        default:
            return (a.id - b.id) * sortMod;
    }
}

export const cartDetailToCartProduct = (row: B2BCartDetail): CartProduct | null => {
    if (row.itemType === '4') {
        return null;
    }
    return {
        itemCode: row.itemCode,
        quantity: +(row.quantityOrdered ?? 1),
        comment: row.commentText ?? '',
        productId: row.cartProduct.productId ?? 0,
        image: row.cartProduct.image ?? '',
        name: row.itemCodeDesc,
    }
}

export function calcCartQty(detail:B2BCartDetail[]) {
    return detail
        .filter(line => line.itemType === '1')
        .map(line => new Decimal(line.quantityOrdered).times(line.unitOfMeasureConvFactor))
        .reduce((pv, cv) => cv.add(pv), new Decimal(0))
        .toNumber();
}


export function shipToLocation(cart:B2BCartHeader) {
    return `${cart.ShipToCity ?? ''}, ${cart.ShipToState ?? ''} ${cart.ShipToZipCode ?? ''}`.trim();
}


export const initializeActiveCartState = (): ActiveCartExtraState => {
    const shippingAccount = localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
    return {
        customerKey: customerSlug(localStore.getItem<BasicCustomer | null>(STORE_CUSTOMER, null)),
        cartId: localStore.getItem<number | null>(STORE_CURRENT_CART, null),
        promoCode: null,
        shippingAccount: {
            enabled: shippingAccount?.enabled ?? false,
            value: shippingAccount?.value ?? '',
        },
        nextShipDate: null,
    }
}
