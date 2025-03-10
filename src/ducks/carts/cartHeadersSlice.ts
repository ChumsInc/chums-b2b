import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortProps} from "b2b-types";
import {
    addToCart,
    duplicateSalesOrder,
    loadCart,
    loadCarts,
    processCart,
    saveCart,
    saveCartItem
} from "@ducks/carts/actions";
import {loadCustomer} from "@ducks/customer/actions";
import {customerSlug} from "@utils/customer";
import {cartsSorter} from "@ducks/carts/utils";

export const cartsAdapter = createEntityAdapter<B2BCartHeader, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const adapterSelectors = cartsAdapter.getSelectors();

export interface ExtraCartHeaderState {
    customerKey: string | null;
    status: 'idle' | 'loading' | 'rejected';
    search: string;
    sort: SortProps<B2BCartHeader>;
}

const extraState: ExtraCartHeaderState = {
    customerKey: null,
    status: 'idle',
    search: '',
    sort: {field: 'id', ascending: true}
}

const cartHeadersSlice = createSlice({
    name: 'cartHeaders',
    initialState: cartsAdapter.getInitialState(extraState),
    reducers: {
        setCartSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setCartsSort: (state, action: PayloadAction<SortProps<B2BCartHeader>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload) {
                    cartsAdapter.setOne(state, action.payload.header);
                }
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                if (!action.payload) {
                    cartsAdapter.removeOne(state, action.meta.arg.cartId);
                    return;
                }
                cartsAdapter.setOne(state, action.payload.header);
            })
            .addCase(loadCarts.pending, (state, action) => {
                if (state.customerKey !== action.meta.arg) {
                    state.customerKey = action.meta.arg;
                    cartsAdapter.removeAll(state);
                }
            })
            .addCase(loadCarts.fulfilled, (state, action) => {
                cartsAdapter.setAll(state, action.payload.map(cart => cart.header))
            })
            .addCase(loadCustomer.pending, (state, action) => {
                if (state.customerKey !== customerSlug(action.meta.arg)) {
                    state.customerKey = customerSlug(action.meta.arg);
                    cartsAdapter.removeAll(state);
                }
            })
            .addCase(saveCart.fulfilled, (state, action) => {
                if (action.payload) {
                    cartsAdapter.setOne(state, action.payload.header);
                }
            })
            .addCase(saveCartItem.fulfilled, (state, action) => {
                if (action.payload) {
                    cartsAdapter.setOne(state, action.payload.header);
                }
            })
            .addCase(processCart.fulfilled, (state, action) => {
                if (action.payload) {
                    cartsAdapter.removeOne(state, action.meta.arg.id);
                }
            })
            .addCase(duplicateSalesOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    cartsAdapter.setOne(state, action.payload.header);
                }
            })
    },
    selectors: {
        selectAll: (state) => adapterSelectors.selectAll(state),
        selectCartHeaderById: (state, cartId: number) => adapterSelectors.selectById(state, cartId) ?? null,
        selectCartHeaders: (state) => adapterSelectors.selectAll(state),
        selectCartsSearch: (state) => state.search,
        selectCartsSort: (state) => state.sort,
        selectCartsLength: (state) => adapterSelectors.selectTotal(state),
    }
});

export const {setCartSearch, setCartsSort} = cartHeadersSlice.actions;
export const {
    selectCartsSearch,
    selectCartsSort,
    selectCartHeaderById,
    selectCartHeaders,
    selectCartsLength
} = cartHeadersSlice.selectors;

export const selectCartTotalById = createSelector(
    [selectCartHeaderById],
    (cart) => {
        return cart?.subTotalAmt ?? null
    }
)

export const selectFilteredCarts = createSelector(
    [selectCartHeaders, selectCartsSearch, selectCartsSort],
    (list, search, sort) => {
        return list
            .filter(cart => !search.trim()
                || cart.id.toString().includes(search.trim())
                || (cart.salesOrderNo ?? '').toLowerCase().includes(search.trim().toLowerCase())
                || (cart.customerPONo ?? '').toLowerCase().includes(search.trim().toLowerCase())
            )
            .sort(cartsSorter(sort));
    }
)


export default cartHeadersSlice
