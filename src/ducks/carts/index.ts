import {B2BCartHeader} from "@typeDefs/carts";
import {createReducer} from "@reduxjs/toolkit";
import {CustomerKey, SortProps} from "b2b-types";
import {cartsSorter, defaultCartsSort} from "./utils";
import {loadCarts, setCartsSearch, setCartsSort} from "./actions";
import {dismissContextAlert} from "../alerts/actions";
import {loadCustomer} from "@ducks/customer/actions";
import {customerSlug} from "@utils/customer";


export interface CartsState {
    customerKey: CustomerKey | null;
    list: B2BCartHeader[];
    status: 'idle' | 'loading' | 'rejected';
    search: string;
    sort: SortProps<B2BCartHeader>
}

const initialCartsState: CartsState = {
    customerKey: null,
    list: [],
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
            if (customerSlug(state.customerKey) !== customerSlug(action.meta.arg)) {
                state.customerKey = action.meta.arg;
                state.list = [];
            }
        })
        .addCase(loadCarts.fulfilled, (state, action) => {
            state.status = 'idle';
            state.list = action.payload.sort(cartsSorter(defaultCartsSort));
        })
        .addCase(loadCarts.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(dismissContextAlert, (state, action) => {
            if (action.payload === loadCarts.typePrefix) {
                state.status = 'idle';
            }
        })
        .addCase(loadCustomer.pending, (state, action) => {
            if (customerSlug(state.customerKey) !== customerSlug(action.meta.arg)) {
                state.customerKey = action.meta.arg;
                state.list = [];
            }
        })
});

export default cartsReducer;
