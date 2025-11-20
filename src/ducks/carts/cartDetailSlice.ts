import {createEntityAdapter, createSelector, createSlice,type  PayloadAction} from "@reduxjs/toolkit";
import type {B2BCartDetail} from "@/types/cart/cart-detail";
import type {SortProps} from "chums-types/b2b";
import {addToCart, duplicateSalesOrder, loadCart, loadCarts, saveCart, saveCartItem} from "@/ducks/carts/actions.js";
import {loadCustomer} from "@/ducks/customer/actions.js";
import {customerSlug} from "@/utils/customer.js";
import {calcCartQty, cartDetailSorter} from "@/ducks/carts/utils.js";

const detailAdapter = createEntityAdapter<B2BCartDetail, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id === b.id ? 1 : a.id,
});

const adapterSelectors = detailAdapter.getSelectors();

export interface CartDetailExtraState {
    customerKey: string | null;
    sort: SortProps<B2BCartDetail>;
}

const extraState: CartDetailExtraState = {
    customerKey: null,
    sort: {field: 'lineSeqNo', ascending: true},
}

const cartDetailSlice = createSlice({
    name: 'cartsDetail',
    initialState: detailAdapter.getInitialState(extraState),
    reducers: {
        setCartDetailSort: (state, action: PayloadAction<SortProps<B2BCartDetail>>) => {
            state.sort = action.payload;
        },
        setCartItem: (state, action: PayloadAction<Partial<B2BCartDetail> & Pick<B2BCartDetail, 'id'>>) => {
            const {id, ...changes} = action.payload;
            detailAdapter.updateOne(state, {id, changes: {...changes, changed: true}})
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload) {
                    const list = adapterSelectors.selectAll(state)
                        .filter(row => row.cartHeaderId === action.payload!.header.id)
                        .map(row => row.id);
                    detailAdapter.removeMany(state, list);
                    detailAdapter.addMany(state, action.payload.detail);
                }
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                const list = adapterSelectors.selectAll(state)
                    .filter(row => row.cartHeaderId === action.payload!.header.id)
                    .map(row => row.id);
                detailAdapter.removeMany(state, list);
                if (action.payload) {
                    detailAdapter.addMany(state, action.payload.detail);
                    return;
                }
            })
            .addCase(loadCart.rejected, (state, action) => {
                const list = adapterSelectors.selectAll(state)
                    .filter(row => row.cartHeaderId === action.meta.arg.cartId)
                    .map(row => row.id);
                detailAdapter.removeMany(state, list);
            })
            .addCase(loadCarts.pending, (state, action) => {
                if (state.customerKey !== action.meta.arg) {
                    detailAdapter.removeAll(state);
                    state.customerKey = action.meta.arg;
                }
            })
            .addCase(loadCarts.fulfilled, (state, action) => {
                const detail: B2BCartDetail[] = [];
                action.payload
                    .forEach((cart) => {
                        detail.push(...cart.detail)
                    })
                detailAdapter.setAll(state, detail);
            })
            .addCase(loadCustomer.pending, (state, action) => {
                if (state.customerKey !== customerSlug(action.meta.arg)) {
                    detailAdapter.removeAll(state);
                    state.customerKey = customerSlug(action.meta.arg);
                }
            })
            .addCase(duplicateSalesOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    detailAdapter.addMany(state, action.payload.detail);
                }
            })
            .addCase(saveCart.fulfilled, (state, action) => {
                if (action.payload) {
                    const existing = adapterSelectors.selectAll(state)
                        .filter(row => row.cartHeaderId === action.payload!.header.id)
                        .map(row => row.id);
                    detailAdapter.removeMany(state, existing);
                    detailAdapter.addMany(state, action.payload.detail);
                }
            })
            .addCase(saveCartItem.fulfilled, (state, action) => {
                if (action.payload) {
                    const existing = adapterSelectors.selectAll(state)
                        .filter(row => row.cartHeaderId === action.payload!.header.id)
                        .map(row => row.id);
                    detailAdapter.removeMany(state, existing);
                    detailAdapter.addMany(state, action.payload.detail);
                }
            })
    },
    selectors: {
        selectAll: (state) => adapterSelectors.selectAll(state),
        selectCartItemById: (state, id: number) => adapterSelectors.selectById(state, id),
        selectCartDetailSort: (state) => state.sort,
        selectCartItemStatus: (state, id: number) => adapterSelectors.selectById(state, id).lineStatus ?? 'idle',
    }
});

export const {
    selectCartDetailSort,
    selectAll,
    selectCartItemById,
    selectCartItemStatus,
} = cartDetailSlice.selectors;

export const selectByCartId = createSelector(
    [selectAll, (_, cartId) => cartId],
    (rows, cartId) => {
        return rows.filter(row => row.cartHeaderId === cartId);
    }
)

export const selectCartQtyByCartId = createSelector(
    [selectByCartId],
    (detail) => {
        return calcCartQty(detail);
    }
);

export const selectCartHasChanges = createSelector(
    [selectByCartId],
    (detail) => {
        return detail.reduce((pv, cv) => (cv.changed ?? false) || pv, false)
    }
)

export const selectCartDetailById = createSelector(
    [selectByCartId,  selectCartDetailSort],
    (rows, sort) => {
        return [...rows].sort(cartDetailSorter(sort));
    }
)

export const selectCartHasCustomization = createSelector(
    [selectByCartId],
    (detail) => {
        return detail.reduce((pv, cv) => (cv.cartProduct?.requiresCustomization ?? false) || pv, false)
    }
)

export const {setCartDetailSort, setCartItem} = cartDetailSlice.actions;

export default cartDetailSlice;
