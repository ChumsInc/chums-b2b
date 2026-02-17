/* eslint-disable camelcase */
import type {B2BCartHeader, CartProduct} from "chums-types/b2b";
import type {B2BCartDetail} from "@/types/cart/cart-detail";
import Decimal from "decimal.js";
import {sendGtagEvent} from "@/utils/ga4/api";
import type {GtagItem} from "@/utils/ga4/types";
import {canStoreAnalytics} from "@/ducks/cookie-consent/utils";

function cartItems(detail: B2BCartDetail[]): GtagItem[] {
    return detail
        .filter(item => !(item.lineStatus === 'U' && item.quantityOrdered === 0))
        .map(item => ({
            item_id: item.itemCode,
            item_name: item.itemCodeDesc ?? item.itemCode,
            quantity: +item.quantityOrdered,
            price: new Decimal(item.extensionAmt).toNumber()
        }))
}

function cartValue(header: B2BCartHeader): number {
    return new Decimal(header.subTotalAmt).sub(header.DiscountAmt ?? 0).toNumber();
}

export function ga4ViewCart(header: B2BCartHeader | null, detail: B2BCartDetail[]) {
    if (!canStoreAnalytics()) {
        return;
    }
    if (header && detail.length > 0) {
        sendGtagEvent('view_cart', {
            currency: 'USD',
            value: cartValue(header),
            items: cartItems(detail)
        })
    }
}

export function ga4AddPaymentInfo(header: B2BCartHeader, detail: B2BCartDetail[]) {
    if (!canStoreAnalytics()) {
        return;
    }
    sendGtagEvent('add_payment_info', {
        currency: "USD",
        value: cartValue(header),
        payment_type: header.PaymentType,
        items: cartItems(detail)
    })
}

export function ga4BeginCheckout(header: B2BCartHeader, detail: B2BCartDetail[]) {
    if (!canStoreAnalytics()) {
        return;
    }
    sendGtagEvent('begin_checkout', {
        currency: "USD",
        value: cartValue(header),
        items: cartItems(detail)
    });
}

export function ga4AddShippingInfo(header: B2BCartHeader, detail: B2BCartDetail[]) {
    if (!canStoreAnalytics()) {
        return;
    }
    sendGtagEvent('add_shipping_info', {
        currency: "USD",
        value: cartValue(header),
        shipping_tier: header.shipVia,
        items: cartItems(detail)
    })
}

export function ga4Purchase(header: B2BCartHeader, detail: B2BCartDetail[]) {
    if (!canStoreAnalytics()) {
        return;
    }
    sendGtagEvent('purchase', {
        currency: "USD",
        value: cartValue(header),
        transaction_id: header.salesOrderNo ?? header.id.toString(),
        items: cartItems(detail)
    })
}

export function ga4AddToCart(cartItem: Pick<CartProduct, 'itemCode' | 'name' | 'price'>, quantity: number) {
    if (!canStoreAnalytics()) {
        return;
    }
    const price = cartItem.price ? new Decimal(cartItem.price).toNumber() : 0;
    const value = cartItem.price ? new Decimal(cartItem.price).times(quantity).toNumber() : 0;
    sendGtagEvent('add_to_cart', {
        currency: 'USD',
        value: value,
        items: [{item_id: cartItem.itemCode, item_name: cartItem.name, price: price, quantity}]
    })
}
