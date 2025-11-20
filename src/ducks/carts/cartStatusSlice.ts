import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import type {CartStatus} from "@/types/cart/cart-utils";
import {
    addToCart,
    duplicateSalesOrder,
    loadCart,
    loadCarts,
    processCart,
    saveCart,
    saveCartItem,
    sendCartEmail
} from "@/ducks/carts/actions.js";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice.js";

const statusAdapter = createEntityAdapter<CartStatus, number>({
    selectId: (arg) => arg.key,
    sortComparer: (a, b) => a.key - b.key,
})

const adapterSelectors = statusAdapter.getSelectors();

export interface ExtraStatusState {
    global: 'idle' | 'loading' | 'rejected';
}

const initialState: ExtraStatusState = {
    global: 'idle',
}

const cartStatusSlice = createSlice({
    name: 'cartsStatus',
    initialState: statusAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId ?? 0, status: 'saving'})
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                statusAdapter.removeOne(state, 0);
                if (action.payload) {
                    statusAdapter.setOne(state, {key: action.payload.header.id, status: 'idle'})
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId ?? 0, status: 'idle'})
            })
            .addCase(loadCart.pending, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'loading'})
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                if (!action.payload) {
                    statusAdapter.removeOne(state, action.meta.arg.cartId);
                    return;
                }
                statusAdapter.setOne(state, {key: action.payload.header.id, status: 'idle'})
            })
            .addCase(loadCart.rejected, (state, action) => {
                if (action.error && action.error.message?.toLowerCase() === 'not found') {
                    statusAdapter.removeOne(state, action.meta.arg.cartId);
                    return
                }
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'idle'})
            })
            .addCase(loadCarts.pending, (state) => {
                state.global = 'loading';
            })
            .addCase(loadCarts.fulfilled, (state, action) => {
                state.global = 'idle';
                statusAdapter.setAll(state, action.payload.map(cart => ({key: cart.header.id, status: 'idle'})))
            })
            .addCase(loadCarts.rejected, (state) => {
                state.global = 'rejected';
            })
            .addCase(saveCart.pending, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'saving'});
            })
            .addCase(saveCart.fulfilled, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'idle'});
            })
            .addCase(saveCart.rejected, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'idle'});
            })
            .addCase(saveCartItem.pending, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'saving'});
            })
            .addCase(saveCartItem.fulfilled, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'idle'});
            })
            .addCase(saveCartItem.rejected, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'idle'});
            })
            .addCase(processCart.pending, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.id, status: 'saving'});
            })
            .addCase(processCart.fulfilled, (state, action) => {
                if (action.payload) {
                    statusAdapter.removeOne(state, action.meta.arg.id);
                    return;
                }
                statusAdapter.setOne(state, {key: action.meta.arg.id, status: 'idle'});
            })
            .addCase(duplicateSalesOrder.pending, (state) => {
                statusAdapter.setOne(state, {key: 0, status: 'saving'});
            })
            .addCase(duplicateSalesOrder.fulfilled, (state, action) => {
                statusAdapter.removeOne(state, 0);
                if (action.payload) {
                    statusAdapter.addOne(state, {key: action.payload.header.id, status: 'idle'});
                }
            })
            .addCase(duplicateSalesOrder.rejected, (state) => {
                statusAdapter.removeOne(state, 0);
            })
            .addCase(dismissContextAlert, (state, action) => {
                switch (action.payload) {
                    case loadCarts.typePrefix:
                        state.global = 'idle';
                }
            })
            .addCase(sendCartEmail.pending, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'sending'});
            })
            .addCase(sendCartEmail.fulfilled, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'idle'});
            })
            .addCase(sendCartEmail.rejected, (state, action) => {
                statusAdapter.setOne(state, {key: action.meta.arg.cartId, status: 'idle'});
            })

    },
    selectors: {
        selectCartsStatus: (state) => state.global,
        selectCartStatusById: (state, cartId: number) => adapterSelectors.selectById(state, cartId)?.status ?? 'idle'
    }
});

export const {selectCartStatusById, selectCartsStatus} = cartStatusSlice.selectors;

// export const selectCartStatusById = createSelector(
//     [(state:RootState) => state, (state:RootState, id) => id],
//     (state, id) => {
//         return adapterSelectors.selectById(state., id);
//     }
// )

export default cartStatusSlice;
