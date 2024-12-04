import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {createReducer} from "@reduxjs/toolkit";
import {SortProps} from "b2b-types";
import {cartDetailSorter, cartsSorter, defaultCartDetailSort, defaultCartsSort} from "./utils";
import {
    addToCart,
    clearCartMessages,
    loadCart,
    loadCarts,
    saveCart,
    saveCartItem,
    setActiveCartId,
    setCartCheckoutProgress,
    setCartDetailSort,
    setCartItem,
    setCartShipDate,
    setCartShippingAccount,
    setCartsSearch,
    setCartsSort
} from "./actions";
import {dismissContextAlert} from "../alerts/actions";
import {loadCustomer} from "@ducks/customer/actions";
import {customerSlug} from "@utils/customer";
import {B2BCartList, CartMessage, CartProgress} from "@typeDefs/cart/cart-utils";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {nextShipDate} from "@utils/orders";
import localStore from "@utils/LocalStore";
import {STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@constants/stores";
import {cartProgress_Cart} from "@utils/cart";
import {CART_PROGRESS_STATES} from "@constants/orders";


export interface CartsState {
    customerKey: string | null;
    indexes: number[];
    list: B2BCartList;
    status: 'idle' | 'loading' | 'rejected';
    search: string;
    sort: SortProps<B2BCartHeader>;
    messages: CartMessage[];
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

const initialCartsState = ():CartsState => {
    const shipDate = nextShipDate();
    const shippingAccount = localStore.getItem<CustomerShippingAccount|null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
    return {
        customerKey: null,
        indexes: [],
        list: {},
        status: 'idle',
        search: '',
        sort: {...defaultCartsSort},
        messages: [],
        activeCart: {
            cartId: null,
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
    builder
        .addCase(setCartsSearch, (state, action) => {
            state.search = action.payload;
        })
        .addCase(setCartsSort, (state, action) => {
            state.sort = action.payload;
        })
        .addCase(loadCarts.pending, (state, action) => {
            state.status = 'loading';
            if (state.customerKey !== action.meta.arg) {
                state.customerKey = action.meta.arg;
                state.indexes = [];
                state.list = {};
            }
        })
        .addCase(loadCarts.fulfilled, (state, action) => {
            state.status = 'idle';
            const indexes = action.payload.map(cart => cart.header).sort(cartsSorter(defaultCartsSort)).map(cart => cart.id);
            state.indexes.forEach(id => {
                if (!indexes.includes(id) && state.list[id]) {
                    delete state.list[id];
                }
            })
            state.indexes = indexes;
            action.payload.forEach(cart => {
                state.list[cart.header.id] = {
                    ...cart,
                    detail: cart.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                    status: 'idle',

                };
            })
            if (!state.activeCart.cartId && state.indexes.length) {
                state.activeCart.cartId = state.indexes[0];
            }
        })
        .addCase(loadCarts.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(loadCart.pending, (state, action) => {
            if (state.list[action.meta.arg.cartId]) {
                state.list[action.meta.arg.cartId].status = 'loading';
            }
            if (action.meta.arg.cartId !== state.activeCart.cartId && action.meta.arg.setActiveCart) {
                state.activeCart.cartId = action.meta.arg.cartId;
            }
        })
        .addCase(loadCart.fulfilled, (state, action) => {
            if (!action.payload && state.list[action.meta.arg.cartId]) {
                delete state.list[action.meta.arg.cartId];
            } else if (action.payload) {
                const cartId = action.payload.header.id;
                state.list[cartId] = {
                    ...action.payload,
                    detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                    status: 'idle',
                };
            }
        })
        .addCase(loadCart.rejected, (state, action) => {
            if (state.list[action.meta.arg.cartId]) {
                state.list[action.meta.arg.cartId].status = 'idle';
            }
        })
        .addCase(dismissContextAlert, (state, action) => {
            switch (action.payload) {
                case loadCarts.typePrefix:
                case loadCart.typePrefix:
                    state.status = 'idle';
                    return;
            }
        })
        .addCase(loadCustomer.pending, (state, action) => {
            if (state.customerKey !== customerSlug(action.meta.arg)) {
                state.customerKey = customerSlug(action.meta.arg);
                state.list = {};
                state.indexes = [];
            }
        })
        .addCase(setCartItem, (state, action) => {
            if (state.list[action.payload.cartHeaderId]) {
                state.list[action.payload.cartHeaderId].detail = [
                    ...state.list[action.payload.cartHeaderId].detail.filter(line => line.id !== action.payload.id),
                    ...state.list[action.payload.cartHeaderId].detail.filter(line => line.id === action.payload.id)
                        .map(line => ({...line, ...action.payload, changed: true})),
                ].sort(cartDetailSorter(defaultCartDetailSort));
            }
        })
        .addCase(saveCartItem.pending, (state, action) => {
            const cartId = action.meta.arg.cartId;
            const cartItemId = action.meta.arg.cartItemId;
            if (state.list[cartId]) {
                state.list[cartId].status = 'saving';
                if (!state.list[cartId].lineStatus) {
                    state.list[cartId].lineStatus = {}
                }
                state.list[cartId].lineStatus[cartItemId] = 'saving';
            }
        })
        .addCase(saveCartItem.fulfilled, (state, action) => {
            if (!action.payload) {
                delete state.list[action.meta.arg.cartId];
                state.indexes = state.indexes.filter(idx => idx !== action.meta.arg.cartId);
            } else {
                state.list[action.payload.header.id] = {
                    ...action.payload,
                    detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                    status: 'idle',
                }
                state.messages = [
                    ...state.messages,
                    {message: 'Cart updated', key: action.meta.requestId}
                ];
            }
        })
        .addCase(saveCartItem.rejected, (state, action) => {
            if (state.list[action.meta.arg.cartId]) {
                state.list[action.meta.arg.cartId].status = 'idle';
            }
        })
        .addCase(saveCart.pending, (state, action) => {
            const cartId = action.meta.arg.cartId;
            if (state.list[cartId]) {
                state.list[cartId].status = 'saving';
            }
        })
        .addCase(saveCart.fulfilled, (state, action) => {
            if (action.payload) {
                const cartId = action.payload.header.id;
                if (state.list[cartId]) {
                    state.list[cartId] = {
                        ...action.payload,
                        detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                        status: 'idle',
                    };
                }
                state.messages = [
                    ...state.messages,
                    {message: 'Cart saved', key: action.meta.requestId}
                ];
            } else {
                const cartId = action.meta.arg.cartId;
                if (state.list[cartId]) {
                    state.list[cartId].status = 'idle';
                }
            }
        })
        .addCase(saveCart.rejected, (state, action) => {
            const cartId = action.meta.arg.cartId;
            if (state.list[cartId]) {
                state.list[cartId].status = 'idle';
            }
        })
        .addCase(addToCart.pending, (state, action) => {
            const cartId = action.meta.arg.cartId;
            if (cartId && state.list[cartId]) {
                state.list[cartId].status = 'saving';
            }
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            if (action.payload) {
                const cartId = action.payload.header.id;
                if (state.list[cartId]) {
                    state.list[cartId] = {
                        ...action.payload,
                        detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                        status: 'idle',
                    };
                }
                const item = action.meta.arg.item;
                state.messages = [
                    ...state.messages,
                    {
                        message: `Added to cart: ${item.itemCode}, ${item.quantityOrdered} ${item.unitOfMeasure}`.trim(),
                        key: action.meta.requestId
                    }
                ];
            } else {
                const cartId = action.meta.arg.cartId;
                if (cartId && state.list[cartId]) {
                    state.list[cartId].status = 'idle';
                }
            }
        })
        .addCase(clearCartMessages, (state) => {
            state.messages = [];
        })
        .addCase(setActiveCartId, (state, action) => {
            state.activeCart.cartId = action.payload;
        })
        .addCase(setCartCheckoutProgress, (state, action) => {
            state.activeCart.progress = action.payload ?? CART_PROGRESS_STATES.cart;
        })
        .addCase(setCartShippingAccount, (state, action) => {
            state.activeCart.shippingAccount.enabled = action.payload?.enabled ?? false;
            state.activeCart.shippingAccount.value = action.payload?.value ?? '';
        })
        .addCase(setCartShipDate, (state, action) => {
            state.activeCart.shipDate = action.payload;
        })
        .addCase(setCartDetailSort, (state, action) => {
            state.activeCart.sort = action.payload;
        })

});

export default cartsReducer;
