import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {createReducer} from "@reduxjs/toolkit";
import {SortProps} from "b2b-types";
import {cartDetailSorter, cartsSorter, defaultCartDetailSort, defaultCartsSort} from "./utils";
import {
    addToCart,
    clearCartMessages,
    duplicateSalesOrder,
    loadCart,
    loadCarts,
    processCart,
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
import {B2BCartList, CartMessage, CartProgress, CartStatusList} from "@typeDefs/cart/cart-utils";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {nextShipDate} from "@utils/orders";
import localStore from "@utils/LocalStore";
import {STORE_CURRENT_CART, STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@constants/stores";
import {cartProgress_Cart} from "@utils/cart";


export interface CartsState {
    customerKey: string | null;
    indexes: number[];
    list: B2BCartList;
    cartStatus: CartStatusList;
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

const initialCartsState = (): CartsState => {
    const shipDate = nextShipDate();
    const shippingAccount = localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
    return {
        customerKey: null,
        indexes: [],
        list: {},
        status: 'idle',
        cartStatus: {},
        search: '',
        sort: {...defaultCartsSort},
        messages: [],
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
    builder

        .addCase(addToCart.pending, (state, action) => {
            const cartId = action.meta.arg.cartId;
            state.cartStatus[cartId ?? 0] = 'saving';
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            if (action.payload) {
                const cartId = action.payload.header.id;
                if (!state.indexes.includes(cartId)) {
                    state.indexes = [...state.indexes, cartId];
                }
                if (!action.meta.arg.cartId) {
                    delete state.cartStatus[0];
                }
                state.cartStatus[cartId] = 'idle';
                state.list[cartId] = {
                    ...action.payload,
                    detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                };
                if (action.meta.arg.setActiveCart) {
                    state.activeCart.cartId = cartId;
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
                if (cartId) {
                    state.cartStatus[cartId] = 'saving';
                }
            }
        })
        .addCase(addToCart.rejected, (state, action) => {
            const cartId = action.meta.arg.cartId;
            state.cartStatus[cartId ?? 0] = 'idle';
        })
        .addCase(clearCartMessages, (state) => {
            state.messages = [];
        })
        .addCase(dismissContextAlert, (state, action) => {
            switch (action.payload) {
                case loadCarts.typePrefix:
                case loadCart.typePrefix:
                    state.status = 'idle';
                    return;
            }
        })
        .addCase(loadCart.pending, (state, action) => {
            state.cartStatus[action.meta.arg.cartId] = 'loading';
            if (action.meta.arg.cartId !== state.activeCart.cartId && action.meta.arg.setActiveCart) {
                state.activeCart.cartId = action.meta.arg.cartId;
            }
        })
        .addCase(loadCart.fulfilled, (state, action) => {
            if (!action.payload && state.list[action.meta.arg.cartId]) {
                delete state.list[action.meta.arg.cartId];
                delete state.cartStatus[action.meta.arg.cartId];
            } else if (action.payload) {
                const cartId = action.payload.header.id;
                state.list[cartId] = {
                    ...action.payload,
                    detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                };
                state.cartStatus[cartId] = 'idle';
            }
        })
        .addCase(loadCart.rejected, (state, action) => {
            if (action.error && action.error.message?.toLowerCase() === 'not found') {
                state.cartStatus[action.meta.arg.cartId] = 'not-found';
            } else {
                state.cartStatus[action.meta.arg.cartId] = 'idle';
            }
            if (action.meta.arg.cartId === state.activeCart.cartId) {
                state.activeCart.cartId = null;
            }
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
            state.cartStatus = {};
            action.payload.forEach(cart => {
                state.list[cart.header.id] = {
                    ...cart,
                    detail: cart.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                };
                state.cartStatus[cart.header.id] = 'idle';
            })
            if (!state.activeCart.cartId && state.indexes.length) {
                state.activeCart.cartId = state.indexes[0];
            }
        })
        .addCase(loadCarts.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(loadCustomer.pending, (state, action) => {
            if (state.customerKey !== customerSlug(action.meta.arg)) {
                state.customerKey = customerSlug(action.meta.arg);
                state.list = {};
                state.indexes = [];
            }
        })
        .addCase(saveCart.pending, (state, action) => {
            state.cartStatus[action.meta.arg.cartId] = 'saving';
        })
        .addCase(saveCart.fulfilled, (state, action) => {
            if (action.payload) {
                const cartId = action.payload.header.id;
                state.cartStatus[cartId] = 'idle';
                if (state.list[cartId]) {
                    state.list[cartId] = {
                        ...action.payload,
                        detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                    };
                }
                state.messages = [
                    ...state.messages,
                    {message: 'Cart saved', key: action.meta.requestId}
                ];
            } else {
                const cartId = action.meta.arg.cartId;
                state.cartStatus[cartId] = 'idle';
            }
        })
        .addCase(saveCart.rejected, (state, action) => {
            const cartId = action.meta.arg.cartId;
            state.cartStatus[cartId] = 'idle';
        })
        .addCase(saveCartItem.pending, (state, action) => {
            const cartId = action.meta.arg.cartId;
            state.cartStatus[cartId] = 'saving';
            const cartItemId = action.meta.arg.cartItemId;
            if (state.list[cartId]) {
                if (!state.list[cartId].lineStatus) {
                    state.list[cartId].lineStatus = {}
                }
                state.list[cartId].lineStatus[cartItemId] = 'saving';
            }
        })
        .addCase(saveCartItem.fulfilled, (state, action) => {
            if (!action.payload) {
                delete state.list[action.meta.arg.cartId];
                state.cartStatus[action.meta.arg.cartId] = 'idle';
                state.indexes = state.indexes.filter(idx => idx !== action.meta.arg.cartId);
            } else {
                state.cartStatus[action.payload.header.id] = 'idle';
                state.list[action.payload.header.id] = {
                    ...action.payload,
                    detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort)),
                }
                state.messages = [
                    ...state.messages,
                    {message: 'Cart updated', key: action.meta.requestId}
                ];
            }
        })
        .addCase(saveCartItem.rejected, (state, action) => {
            state.cartStatus[action.meta.arg.cartId] = 'idle';
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
        .addCase(setCartsSearch, (state, action) => {
            state.search = action.payload;
        })
        .addCase(setCartsSort, (state, action) => {
            state.sort = action.payload;
        })
        .addCase(setActiveCartId, (state, action) => {
            state.activeCart.cartId = action.payload;
        })
        .addCase(setCartCheckoutProgress, (state, action) => {
            state.activeCart.progress = action.payload ?? 0;
        })
        .addCase(setCartDetailSort, (state, action) => {
            state.activeCart.sort = action.payload;
        })
        .addCase(setCartShippingAccount, (state, action) => {
            state.activeCart.shippingAccount.enabled = action.payload?.enabled ?? false;
            state.activeCart.shippingAccount.value = action.payload?.value ?? '';
        })
        .addCase(setCartShipDate, (state, action) => {
            state.activeCart.shipDate = action.payload;
        })
        .addCase(processCart.pending, (state, action) => {
            const cartId = action.meta.arg.id;
            state.cartStatus[cartId] = 'saving';
        })
        .addCase(processCart.fulfilled, (state, action) => {
            const cartId = action.meta.arg.id;
            if (state.list[cartId] && action.payload) {
                delete state.list[cartId];
                delete state.cartStatus[cartId];
                state.indexes = state.indexes.filter(id => id !== cartId);
                if (state.activeCart.cartId === cartId) {
                    state.activeCart.cartId = null;
                    state.activeCart.progress = cartProgress_Cart;
                }
            }
        })
        .addCase(processCart.rejected, (state, action) => {
            const cartId = action.meta.arg.id;
            state.cartStatus[cartId] = 'idle';
        })
        .addCase(duplicateSalesOrder.pending, (state) => {
            state.cartStatus[0] = 'saving';
        })
        .addCase(duplicateSalesOrder.fulfilled, (state, action) => {
            state.cartStatus[0] = 'idle';
            if (action.payload) {
                const cartId = action.payload.header.id;
                state.cartStatus[cartId] = 'idle';
                state.indexes.push(cartId);
                state.list[cartId] = {
                    ...action.payload,
                    detail: action.payload.detail.sort(cartDetailSorter(defaultCartDetailSort))
                }
                if (!state.activeCart.cartId) {
                    state.activeCart.cartId = cartId;
                    state.activeCart.progress = cartProgress_Cart;
                }
            }
        })
        .addCase(duplicateSalesOrder.rejected, (state) => {
            state.cartStatus[0] = 'idle';
        })
});

export default cartsReducer;
