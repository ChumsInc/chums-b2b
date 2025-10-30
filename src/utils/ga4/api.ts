import type {GtagEventArgs, GtagAddPaymentInfoArgs,
    GtagAddShippingInfoArgs,
    GtagAddToCartArgs,
    GtagBeginCheckoutArgs, GtagConfigArgs, GtagEventName,
    GtagExceptionArgs,
    GtagLoginArgs,
    GtagPageViewArgs,
    GtagPurchaseArgs,
    GtagRemoveFromCartArgs,
    GtagSearchArgs,
    GtagSelectContentArgs, GtagSelectItemArgs, GtagViewCartArgs, GtagViewItemArgs, GtagViewItemListArgs
} from "@/utils/ga4/types";

export function sendGtagEvent(eventName: 'add_payment_info', options: GtagAddPaymentInfoArgs): void;
export function sendGtagEvent(eventName: 'add_shipping_info', options: GtagAddShippingInfoArgs): void;
export function sendGtagEvent(eventName: 'add_to_cart', options: GtagAddToCartArgs): void;
export function sendGtagEvent(eventName: 'begin_checkout', options: GtagBeginCheckoutArgs): void;
export function sendGtagEvent(eventName: 'exception', options: GtagExceptionArgs): void;
export function sendGtagEvent(eventName: 'login', options?: GtagLoginArgs): void;
export function sendGtagEvent(eventName: 'page_view', options?: GtagPageViewArgs): void;
export function sendGtagEvent(eventName: 'purchase', options: GtagPurchaseArgs): void;
export function sendGtagEvent(eventName: 'remove_from_cart', options: GtagRemoveFromCartArgs): void;
export function sendGtagEvent(eventName: 'search', options: GtagSearchArgs): void;
export function sendGtagEvent(eventName: 'select_content', options: GtagSelectContentArgs): void;
export function sendGtagEvent(eventName: 'select_item', options: GtagSelectItemArgs): void;
export function sendGtagEvent(eventName: 'sign_up', options?: GtagLoginArgs): void;
export function sendGtagEvent(eventName: 'view_cart', options?: GtagViewCartArgs): void;
export function sendGtagEvent(eventName: 'view_item', options?: GtagViewItemArgs): void;
export function sendGtagEvent(eventName: 'view_item_list', options?: GtagViewItemListArgs): void;
export function sendGtagEvent(eventName: GtagEventName, options?: GtagEventArgs) {
    if (typeof globalThis.window !== 'undefined' && typeof globalThis.window.gtag !== 'undefined') {
        if (!options) {
            options = {};
        }
        globalThis.window.gtag('event', eventName, options);
    }
}

export function configGtag(options?: GtagConfigArgs) {
    if (typeof globalThis.window === 'undefined') {
        return;
    }
    const gtag = window.gtag;
    const gtagID = window.Chums?.gtagID;
    if (gtag && gtagID) {
        gtag('config', gtagID, options ?? {});
    }
}
