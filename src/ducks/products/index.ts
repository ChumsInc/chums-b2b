import {getMSRP, getPrices} from "@/utils/products";
import {customerPriceRecordSorter, customerSlug,} from "@/utils/customer";
import {createReducer} from "@reduxjs/toolkit";
import {getImageItemCode, isCartProduct, updateCartProductPricing} from "./utils";
import {loadCustomer} from "../customer/actions";
import {CartProduct, CustomerPriceRecord, Product} from "b2b-types";
import {loadProduct, setCartItemQuantity, setColorCode, setCurrentVariant} from "./actions";
import {setLoggedIn} from "../user/actions";
import {parsePossiblyMissingFilename} from "@/src/common/image";
import {ProductImage} from "@/types/product";
import {PreloadedState} from "@/types/preload";


export interface ProductsState {
    keyword: string | null;
    product: Product | null;
    selectedProduct: Product | null;
    selectedItemCode: string | null;
    image: ProductImage;
    colorCode: string;
    variantId: number | null;
    loading: boolean;
    msrp: (string | number)[],
    customerPrice: (string | number)[],
    salesUM: string | null;
    cartItem: CartProduct | null;
    pricing: CustomerPriceRecord[];
    customerKey: string | null;
}

export const initialProductsState = (preload: PreloadedState = {}): ProductsState => ({
    keyword: null,
    product: preload.products?.product ?? null,
    selectedProduct: null,
    selectedItemCode: null,
    image: {
        filename: null,
        itemCode: null,
    },
    colorCode: '',
    variantId: null,
    loading: false,
    msrp: [],
    customerPrice: [],
    salesUM: null,
    cartItem: null,
    pricing: [],
    customerKey: null,
});

const productsReducer = createReducer(initialProductsState, (builder) => {
    builder
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                state.customerKey = null;
                state.pricing = [];
                state.customerPrice = [];
            }
        })
        .addCase(loadCustomer.pending, (state) => {
            state.pricing = [];
        })
        .addCase(loadCustomer.fulfilled, (state, action) => {
            state.customerKey = customerSlug(action.payload?.customer ?? null);
            state.pricing = [...(action.payload?.pricing ?? [])].sort(customerPriceRecordSorter);
            state.msrp = getMSRP(state.selectedProduct);
            state.customerPrice = state.customerKey ? getPrices(state.selectedProduct, state.pricing) : state.msrp;
            if (isCartProduct(state.cartItem)) {
                state.cartItem.priceLevel = action.payload?.customer.PriceLevel ?? '';
                state.cartItem = updateCartProductPricing(state.cartItem, state.pricing);
            }
        })
        .addCase(loadProduct.pending, (state, action) => {
            state.loading = true;
            if (action.meta.arg !== state.keyword) {
                state.keyword = action.meta.arg;
                state.product = null;
                state.image.filename = null;
                state.image.itemCode = null;
            }
        })
        .addCase(loadProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload?.product ?? null;
            state.selectedProduct = action.payload?.variant?.product ?? action.payload?.product ?? null;
            state.variantId = action.payload?.variant?.id ?? null;
            state.msrp = action.payload?.msrp ?? [];
            state.salesUM = action.payload?.salesUM ?? null;
            state.customerPrice = action.payload?.customerPrice ?? [];
            state.cartItem = action.payload?.cartItem ?? null;
            state.colorCode = action.payload?.cartItem?.colorCode
                ?? action.payload?.variant?.product?.defaultColor
                ?? action.payload?.product?.defaultColor
                ?? '';
            state.image.filename = parsePossiblyMissingFilename(state.cartItem?.image ?? state.selectedProduct?.image ?? null, state.colorCode);
            state.image.itemCode = getImageItemCode(state);
        })
        .addCase(loadProduct.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setColorCode.fulfilled, (state, action) => {
            state.colorCode = action.meta.arg;
            state.cartItem = action.payload;
            state.image.filename = parsePossiblyMissingFilename(state.cartItem?.image ?? state.selectedProduct?.image ?? null, state.colorCode);
            state.image.itemCode = getImageItemCode(state);
        })
        .addCase(setCartItemQuantity, (state, action) => {
            if (state.cartItem) {
                state.cartItem.quantity = action.payload;
            }
        })
        .addCase(setCurrentVariant.fulfilled, (state, action) => {
            state.selectedProduct = action.payload.variant?.product ?? null;
            state.colorCode = action.payload?.cartItem?.colorCode
                ?? action.payload?.variant?.product?.defaultColor
                ?? '';
            state.variantId = action.payload.variant?.id ?? null;
            state.msrp = action.payload.msrp;
            state.salesUM = action.payload.salesUM;
            state.customerPrice = action.payload.customerPrice;
            state.cartItem = action.payload.cartItem;
            state.image.filename = action.payload.cartItem?.image ?? null;
            state.image.itemCode = getImageItemCode(state);
        })
})

export default productsReducer;
