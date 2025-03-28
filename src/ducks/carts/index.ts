import {B2BCartHeader} from "@/types/cart/cart-header";
import {createReducer} from "@reduxjs/toolkit";
import {SortProps} from "b2b-types";
import {defaultCartsSort} from "./utils";
import {B2BCartList, CartProgress} from "@/types/cart/cart-utils";
import {B2BCartDetail} from "@/types/cart/cart-detail";
import {CustomerShippingAccount} from "@/types/customer";
import {nextShipDate} from "@/utils/orders";
import localStore from "@/utils/LocalStore";
import {STORE_CURRENT_CART, STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@/constants/stores";
import {cartProgress_Cart} from "@/utils/cart";


export interface CartsState {
    customerKey: string | null;
    indexes: number[];
    list: B2BCartList;
    status: 'idle' | 'loading' | 'rejected';
    search: string;
    sort: SortProps<B2BCartHeader>;
    activeCart: {
        cartId: number | null;
        promoCode: string | null;
        sort: SortProps<B2BCartDetail>;
        progress: CartProgress;
        shipDate: string;
        shippingAccount: CustomerShippingAccount;
        cartMessage: string;
    }
}

const initialCartsState = (): CartsState => {
    const shipDate = nextShipDate();
    const shippingAccount = localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
    return {
        customerKey: null,
        indexes: [],
        list: {},
        status: 'idle',
        search: '',
        sort: {...defaultCartsSort},
        activeCart: {
            cartId: localStore.getItem<number | null>(STORE_CURRENT_CART, null),
            promoCode: null,
            sort: {field: 'lineSeqNo', ascending: true},
            progress: cartProgress_Cart,
            shipDate: shipDate,
            shippingAccount: {
                enabled: shippingAccount?.enabled ?? false,
                value: shippingAccount?.value ?? '',
            },
            cartMessage: '',
        }
    }
}

export const cartsReducer = createReducer(initialCartsState, builder => {

});

export default cartsReducer;
