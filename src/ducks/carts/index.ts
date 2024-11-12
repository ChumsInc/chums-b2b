import {B2BCartHeader, B2BCartList} from "@typeDefs/carts";
import {createReducer} from "@reduxjs/toolkit";
import {SortProps} from "b2b-types";
import {cartsSorter, defaultCartsSort} from "./utils";
import {loadCart, loadCarts, setCartsSearch, setCartsSort} from "./actions";
import {dismissContextAlert} from "../alerts/actions";
import {loadCustomer} from "@ducks/customer/actions";
import {customerSlug} from "@utils/customer";


export interface CartsState {
    customerKey: string | null;
    indexes: number[];
    list: B2BCartList;
    status: 'idle' | 'loading' | 'rejected';
    search: string;
    sort: SortProps<B2BCartHeader>
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
            state.indexes = action.payload.sort(cartsSorter(defaultCartsSort)).map(cart => cart.id);
            state.list = {};
            action.payload.forEach(header => {
                state.list[header.id] = {header, detail: []};
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
                state.list[action.payload.header.id] = {
                    ...action.payload,
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
});

export default cartsReducer;
