import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {CartDetailStatus, CartStatusValue} from "@/types/cart/cart-utils";
import {
    addToCart,
    duplicateSalesOrder,
    loadCart,
    loadCarts,
    processCart,
    saveCart,
    saveCartItem
} from "@/ducks/carts/actions";
import {B2BCartDetail} from "@/types/cart/cart-detail";

const statusAdapter = createEntityAdapter<CartDetailStatus, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
})

const adapterSelectors = statusAdapter.getSelectors();

function mapItemStatus(detail: B2BCartDetail[], status: CartStatusValue): CartDetailStatus[] {
    return detail.map(row => ({id: row.id, cartId: row.cartHeaderId, status: status}));
}

const cartStatusSlice = createSlice({
    name: 'cartsDetailStatus',
    initialState: statusAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state, action) => {
                statusAdapter.setOne(state, {id: 0, cartId: action.meta.arg.cartId ?? 0, status: 'saving'})
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                statusAdapter.removeOne(state, 0);
                if (action.payload) {
                    const oldItems = adapterSelectors.selectAll(state).filter(s => s.cartId === action.payload?.header.id).map(s => s.id);
                    statusAdapter.removeMany(state, oldItems);
                    statusAdapter.setMany(state, mapItemStatus(action.payload.detail, 'idle'));
                }
            })
            .addCase(addToCart.rejected, (state) => {
                statusAdapter.removeOne(state, 0)
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                if (action.payload) {
                    const oldItems = adapterSelectors.selectAll(state).filter(s => s.cartId === action.payload?.header.id).map(s => s.id);
                    statusAdapter.removeMany(state, oldItems);
                    statusAdapter.setMany(state, mapItemStatus(action.payload.detail, 'idle'));
                }
            })
            .addCase(loadCarts.fulfilled, (state, action) => {
                statusAdapter.removeAll(state);
                const newItems: CartDetailStatus[] = [];
                action.payload.forEach(cart => {
                    newItems.push(...mapItemStatus(cart.detail, 'idle'))
                })
                statusAdapter.setMany(state, newItems);
            })
            .addCase(saveCart.fulfilled, (state, action) => {
                if (action.payload) {
                    const oldItems = adapterSelectors.selectAll(state).filter(s => s.cartId === action.payload?.header.id).map(s => s.id);
                    statusAdapter.removeMany(state, oldItems);
                    statusAdapter.setMany(state, mapItemStatus(action.payload.detail, 'idle'))
                }
            })
            .addCase(saveCartItem.pending, (state, action) => {
                statusAdapter.setOne(state, {
                    id: action.meta.arg.cartItemId,
                    cartId: action.meta.arg.cartId,
                    status: 'saving'
                });
            })
            .addCase(saveCartItem.fulfilled, (state, action) => {
                statusAdapter.setOne(state, {
                    id: action.meta.arg.cartItemId,
                    cartId: action.meta.arg.cartId,
                    status: 'idle'
                });
            })
            .addCase(saveCartItem.rejected, (state, action) => {
                statusAdapter.setOne(state, {
                    id: action.meta.arg.cartItemId,
                    cartId: action.meta.arg.cartId,
                    status: 'idle'
                });
            })
            .addCase(processCart.fulfilled, (state, action) => {
                const oldItems = adapterSelectors.selectAll(state).filter(s => s.cartId === action.meta.arg.id).map(s => s.id);
                statusAdapter.removeMany(state, oldItems);
            })
            .addCase(duplicateSalesOrder.fulfilled, (state, action) => {
                statusAdapter.removeOne(state, 0);
                if (action.payload) {
                    statusAdapter.addMany(state, mapItemStatus(action.payload.detail, 'idle'));
                }
            })
    },
    selectors: {
        selectCartItemStatusById: (state, id: number) => adapterSelectors.selectById(state, id)?.status ?? 'idle'
    }
});

export const {selectCartItemStatusById} = cartStatusSlice.selectors;

export default cartStatusSlice;
