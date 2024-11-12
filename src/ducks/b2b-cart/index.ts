import {B2BCartDetail, B2BCartHeader} from "@typeDefs/carts";
import {Editable, SortProps} from "b2b-types";
import {CartProgress, cartProgress_Cart} from "@typeDefs/cart";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {nextShipDate} from "@utils/orders";
import localStore from "@utils/LocalStore";
import {STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@constants/stores";
import {createReducer} from "@reduxjs/toolkit";
import {setCartProgress, setShipDate} from "@ducks/cart/actions";
import {CART_PROGRESS_STATES} from "@constants/orders";
import {setCustomerAccount} from "@ducks/customer/actions";
import {setLoggedIn} from "@ducks/user/actions";
import {loadCarts} from "@ducks/carts/actions";
import {loadCart} from "@ducks/b2b-cart/actions";
import {cartDetailSorter, defaultCartDetailSort} from "@ducks/b2b-cart/utils";
import Decimal from "decimal.js";
import {dismissContextAlert} from "@ducks/alerts/actions";

export interface B2BCartState {
    customerKey: string | null;
    cartId: number | null;
    cartName: string;
    cartQuantity: number | null;
    cartTotal: number | string;
    promoCode: string | null;
    header: B2BCartHeader | null;
    detail: (B2BCartDetail & Editable)[];
    sort: SortProps<B2BCartDetail>;
    status: 'idle' | 'loading' | 'saving' | 'rejected';
    progress: CartProgress;
    shipDate: string;
    shippingAccount: CustomerShippingAccount;
    cartMessage: string;
}

export const initialB2BCartState = (): B2BCartState => ({
    customerKey: null,
    cartId: null,
    cartName: '',
    cartQuantity: null,
    cartTotal: 0,
    promoCode: null,
    header: null,
    detail: [],
    sort: {field: 'id', ascending: true},
    status: 'idle',
    progress: cartProgress_Cart,
    shipDate: nextShipDate(),
    shippingAccount: {
        enabled: localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null)?.enabled ?? false,
        value: localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null)?.value ?? '',
    },
    cartMessage: '',
})


const b2bCartReducer = createReducer(initialB2BCartState, builder => {
    builder
        .addCase(setCartProgress, (state, action) => {
            state.progress = action.payload ?? CART_PROGRESS_STATES.cart;
        })
        .addCase(setShipDate, (state, action) => {
            localStore.setItem(STORE_CUSTOMER_SHIPPING_ACCOUNT, action.payload);
            state.shipDate = action.payload ?? nextShipDate();
        })
        .addCase(setCustomerAccount.pending, (state) => {
            state.cartId = null;
            state.cartName = '';
            state.cartTotal = 0;
            state.cartQuantity = 0;
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                state.cartId = null;
                state.cartName = '';
                state.cartTotal = 0;
                state.cartQuantity = null;
                state.header = null;
                state.detail = [];
                state.progress = CART_PROGRESS_STATES.cart;
            }
        })
        .addCase(loadCarts.pending, (state, action) => {
            if (state.customerKey !== action.meta.arg) {
                state.customerKey = action.meta.arg;
                state.cartId = null;
                state.cartName = '';
                state.cartTotal = 0;
                state.cartQuantity = null;
                state.header = null;
                state.detail = [];
                state.progress = CART_PROGRESS_STATES.cart;
            }
        })
        .addCase(loadCarts.fulfilled, (state, action) => {
            const [cart] = action.payload.filter(cart => !state.cartId || cart.id === state.cartId);
            state.progress = CART_PROGRESS_STATES.cart;
            if (!cart) {
                state.cartId = null;
                state.cartName = '';
                state.cartTotal = 0;
                state.cartQuantity = null;
                state.header = null;
                state.detail = [];
            } else {
                if (state.cartId !== cart.id) {
                    state.cartQuantity = null;
                    state.detail = [];
                }
                state.cartId = cart.id;
                state.cartName = cart.customerPONo ?? '';
                state.header = cart;
                state.cartTotal = cart.subTotalAmt;
            }
        })
        .addCase(loadCart.pending, (state, action) => {
            state.status = 'loading';
            if (state.cartId !== +action.meta.arg.cartId) {
                state.cartId = null;
                state.cartName = '';
                state.cartTotal = 0;
                state.cartQuantity = null;
                state.header = null;
                state.detail = [];
            }
        })
        .addCase(loadCart.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                state.cartId = action.payload.header.id;
                state.cartName = action.payload.header.customerPONo ?? '';
                state.header = action.payload.header;
                state.cartTotal = action.payload.header.subTotalAmt;
                state.detail = action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort))
                state.cartQuantity = state.detail
                    .filter(row => row.itemType !== '4')
                    .reduce((pv, cv) => new Decimal(pv).add(cv.quantityOrdered).toNumber(), 0);
            }
        })
        .addCase(loadCart.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(dismissContextAlert, (state, action) => {
            if (action.payload === loadCart.typePrefix) {
                state.status = 'idle';
            }
        })


});

export default b2bCartReducer;
