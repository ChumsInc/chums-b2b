import {CaseReducer, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {SortProps} from "b2b-types";
import {CustomerShippingAccount} from "@typeDefs/customer";
import localStore from "@utils/LocalStore";
import {STORE_CURRENT_CART, STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@constants/stores";
import {nextShipDate} from "@utils/orders";
import {
    addToCart,
    duplicateSalesOrder,
    loadCart,
    loadCarts,
    processCart,
    setActiveCartId,
    setCartShippingAccount
} from "@ducks/carts/actions";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {loadCustomer} from "@ducks/customer/actions";
import {customerSlug} from "@utils/customer";
import {Dayjs} from "dayjs";

const detailAdapter = createEntityAdapter<B2BCartDetail, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id === b.id ? 1 : a.id,
});

const adapterSelectors = detailAdapter.getSelectors();

export interface ActiveCartExtraState {
    customerKey: string | null;
    status: 'idle' | 'loading' | 'saving' | 'deleting';
    cartId: number | null;
    header: B2BCartHeader | null;
    promoCode: string | null;
    sort: SortProps<B2BCartDetail>;
    shipDate: string;
    shippingAccount: CustomerShippingAccount | null;
    cartMessage: string;
}

const initialState = (): ActiveCartExtraState => {
    const shipDate = nextShipDate();
    const shippingAccount = localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
    return {
        customerKey: null,
        status: 'idle',
        cartId: localStore.getItem<number | null>(STORE_CURRENT_CART, null),
        header: null,
        promoCode: null,
        sort: {field: 'lineSeqNo', ascending: true},
        shipDate: shipDate,
        shippingAccount: {
            enabled: shippingAccount?.enabled ?? false,
            value: shippingAccount?.value ?? '',
        },
        cartMessage: '',

    }
}

const clearActiveCart: CaseReducer<ActiveCartExtraState> = (state) => {
    state.cartId = null;
    state.header = null;
    state.promoCode = null;
    state.sort = {field: 'lineSeqNo', ascending: true};
    state.shipDate = nextShipDate();
    state.shippingAccount = localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
    state.cartMessage = '';
}

const activeCartSlice = createSlice({
    name: 'activeCart',
    initialState: (detailAdapter.getInitialState(initialState())),
    reducers: {
        setCartShipDate: (state, action: PayloadAction<Date | string | number | Dayjs>) => {
            state.shipDate = nextShipDate(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.meta.arg.setActiveCart && action.payload) {
                    state.cartId = action.payload.header.id;
                }
                if (!state.cartId || action.payload?.header.id === state.cartId) {
                    if (action.payload) {
                        state.header = action.payload.header;
                        detailAdapter.setAll(state, action.payload.detail);
                    }
                }
            })
            .addCase(loadCart.pending, (state, action) => {
                if (action.meta.arg.setActiveCart) {
                    state.cartId = action.meta.arg.cartId;
                }
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                if (action.payload && action.payload.header.id === state.cartId) {
                    state.header = action.payload.header;
                    detailAdapter.setAll(state, action.payload.detail);
                }
            })
            .addCase(loadCart.rejected, (state, action) => {
                if (action.meta.arg.cartId === state.cartId) {
                    clearActiveCart(state, action);
                    detailAdapter.removeAll(state);
                }
            })
            .addCase(loadCarts.pending, (state, action) => {
                if (state.customerKey !== action.meta.arg) {
                    clearActiveCart(state, action);
                    detailAdapter.removeAll(state);
                    state.customerKey = action.meta.arg;
                }
            })
            .addCase(loadCarts.fulfilled, (state, action) => {
                if (!state.cartId && action.payload.length) {
                    state.cartId = action.payload[0].header.id;
                    state.header = action.payload[0].header;
                    detailAdapter.setAll(state, action.payload[0].detail);
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                if (state.customerKey !== customerSlug(action.meta.arg)) {
                    clearActiveCart(state, action);
                    detailAdapter.removeAll(state);
                    state.customerKey = customerSlug(action.meta.arg);
                }
            })
            .addCase(setActiveCartId, (state, action) => {
                state.cartId = action.payload;
            })
            .addCase(setCartShippingAccount, (state, action) => {
                state.shippingAccount = action.payload;
            })
            .addCase(processCart.fulfilled, (state, action) => {
                if (state.cartId === action.meta.arg.id) {
                    clearActiveCart(state, action);
                }
            })
            .addCase(duplicateSalesOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.cartId = action.payload.header.id;
                    state.header = action.payload.header;
                    detailAdapter.setAll(state, action.payload.detail);
                }
            })

    },
    selectors: {
        selectActiveCartId: (state) => state.cartId ?? 0,
        selectCartPromoCode: (state) => state.promoCode,
        selectCartShippingAccount: (state) => state.shippingAccount,
        selectActiveCart: (state) => state.header ? ({
            header: state.header,
            detail: adapterSelectors.selectAll(state)
        }) : null,
        selectActiveCartHeader: (state) => state.header,
        selectActiveCartTotal: (state) => state.header?.subTotalAmt ?? null,
    },
})

export const {
    selectActiveCartId,
    selectCartShippingAccount,
    selectCartPromoCode,
    selectActiveCart,
    selectActiveCartHeader,
    selectActiveCartTotal,
} = activeCartSlice.selectors;
export const {setCartShipDate} = activeCartSlice.actions;

export default activeCartSlice;
