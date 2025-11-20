import {createEntityAdapter, createSlice, type  PayloadAction} from "@reduxjs/toolkit";
import type {CartMessage} from "@/types/cart/cart-utils";
import {addToCart, saveCart, saveCartItem} from "@/ducks/carts/actions.js";

const messagesAdapter = createEntityAdapter<CartMessage, string>({
    selectId: (arg) => arg.key,
    sortComparer: (a, b) => a.key.localeCompare(b.key),
})

const adapterSelectors = messagesAdapter.getSelectors();

const cartMessagesSlice = createSlice({
    name: 'cartMessages',
    initialState: messagesAdapter.getInitialState(),
    reducers: {
        clearCartMessage: (state, action: PayloadAction<string>) => {
            messagesAdapter.removeOne(state, action.payload);
        },
        clearCartMessages: (state) => {
            messagesAdapter.removeAll(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                const item = action.meta.arg.item;
                messagesAdapter.addOne(state, {
                    message: `Added to cart: ${item.itemCode}, ${item.quantityOrdered} ${item.unitOfMeasure}`.trim(),
                    key: action.meta.requestId
                })
            })
            .addCase(addToCart.rejected, (state, action) => {
                const item = action.meta.arg.item;
                messagesAdapter.addOne(state, {
                    message: `[${item.itemCode}] Add to cart failed: ${action.error.message}`.trim(),
                    key: action.meta.requestId
                })
            })
            .addCase(saveCart.fulfilled, (state, action) => {
                messagesAdapter.addOne(state, {
                    message: `Cart ${action.meta.arg.cartId} saved`,
                    key: action.meta.requestId
                })
            })
            .addCase(saveCartItem.fulfilled, (state, action) => {
                messagesAdapter.addOne(state, {
                    message: `Cart ${action.meta.arg.cartId} updated`,
                    key: action.meta.requestId
                });
            })

    },
    selectors: {
        selectCartMessages: (state) => adapterSelectors.selectAll(state),
    }
});

export const {selectCartMessages} = cartMessagesSlice.selectors;
export const {clearCartMessages, clearCartMessage} = cartMessagesSlice.actions;
export default cartMessagesSlice;
