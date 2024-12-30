
export interface GtagEventArgs {
    [key:string]: string|number|null|GtagItem[]|boolean|undefined;
}

export interface GtagItem {
    item_id: string;
    item_name?: string;
    price?: number;
    quantity?: number;
}

export interface GtagAddPaymentInfoArgs extends GtagEventArgs {
    currency: string;
    value: number;
    coupon?: string;
    payment_type?: string | null;
    items: GtagItem[]
}

export interface GtagAddShippingInfoArgs extends GtagEventArgs {
    currency: string;
    value: number;
    coupon?: string;
    shipping_tier?: string | null;
    items: GtagItem[]
}

export interface GtagAddToCartArgs extends GtagEventArgs {
    currency: string;
    value: number;
    items: GtagItem[];
}

export interface GtagBeginCheckoutArgs extends GtagEventArgs {
    currency: string;
    value: number;
    coupon?: string;
    items: GtagItem[];
}

export interface GtagLoginArgs extends GtagEventArgs {
    method?: 'credentials' | 'google';
}

export interface GtagExceptionArgs extends GtagEventArgs {
    description?: string;
    fatal?: boolean;
}

export interface GtagPageViewArgs extends GtagEventArgs {
    page_location?: string;
    client_id?: string;
    page_title?: string;
}

export interface GtagPurchaseArgs extends GtagEventArgs {
    currency: string;
    value: number;
    transaction_id: string;
    coupon?: string;
    shipping?: number;
    tax?: number;
    items: GtagItem[];
}
export interface GtagRemoveFromCartArgs extends GtagEventArgs {
    currency?: string;
    value?: number;
    items: GtagItem[];
}

export interface GtagSearchArgs extends GtagEventArgs {
    search_term: string;
}

export interface GtagSelectContentArgs extends GtagEventArgs {
    content_type?: 'variant' | 'color' | 'customer';
    content_id?: string;
}

export interface GtagSelectItemArgs extends GtagEventArgs {
    item_list_id?: string;
    item_list_name?: string;
    items: GtagItem[]
}

export interface GtagViewCartArgs extends GtagEventArgs {
    currency: string;
    value: number;
    items: GtagItem[]
}

export interface GtagViewItemArgs extends GtagEventArgs {
    items: GtagItem[];
}
export interface GtagViewItemListArgs extends GtagEventArgs {
    item_list_id: string;
    item_list_name: string;
    items: GtagItem[];
}

export interface GtagConfigArgs extends GtagEventArgs {
    user_id: string;
}

export type GtagFn = (event: 'event' | 'config', eventName: string, options?: GtagEventArgs) => void;

export type GtagEventName = 'add_payment_info' | 'add_shipping_info' | 'add_to_cart' | 'begin_checkout' |
    'exception' | 'login' | 'page_view' | 'purchase' | 'remove_from_cart' | 'search' | 'select_content'
    | 'select_item' | 'sign_up' | 'view_cart' | 'view_item' | 'view_item_list';
