import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {createReducer} from "@reduxjs/toolkit";
import {SortProps} from "b2b-types";
import {cartDetailSorter, cartsSorter, defaultCartDetailSort, defaultCartsSort} from "./utils";
import {loadCart, loadCarts, saveCart, saveCartItem, setCartItem, setCartsSearch, setCartsSort} from "./actions";
import {dismissContextAlert} from "../alerts/actions";
import {loadCustomer} from "@ducks/customer/actions";
import {customerSlug} from "@utils/customer";
import {B2BCartList} from "@typeDefs/cart/cart-utils";


export interface CartsState {
    customerKey: string | null;
    indexes: number[];
    list: B2BCartList;
    status: 'idle' | 'loading' | 'rejected';
    search: string;
    sort: SortProps<B2BCartHeader>;

}

const initialCartsState: CartsState = {
    customerKey: null,
    indexes: [],
    list: {},
    status: 'idle',
    search: '',
    sort: {...defaultCartsSort},
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
            const indexes = action.payload.sort(cartsSorter(defaultCartsSort)).map(cart => cart.id);
            state.indexes.forEach(id => {
                if (!indexes.includes(id) && state.list[id]) {
                    delete state.list[id];
                }
            })
            state.indexes = indexes;
            action.payload.forEach(header => {
                state.list[header.id] = {
                    header,
                    detail: state.list[header.id]?.detail ?? [],
                    status: 'idle',

                };
            })
        })
        .addCase(loadCarts.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(loadCart.pending, (state, action) => {
            if (state.list[action.meta.arg.cartId]) {
                state.list[action.meta.arg.cartId].status = 'loading';
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
                    detailLoaded: true,
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
                    detailLoaded: true,
                    status: 'idle',
                }
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
                        detailLoaded: true,
                        status: 'idle',
                    };
                }
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
        });
});

export default cartsReducer;
