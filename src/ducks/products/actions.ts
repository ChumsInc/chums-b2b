import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import type {RootState} from "@/app/configureStore";
import {
    selectProductCartItem,
    selectProductColorCode,
    selectProductCustomerKey,
    selectProductLoading,
    selectSelectedProduct
} from "./selectors";
import type {CartProduct, Product, ProductVariant} from "chums-types/b2b";
import {fetchProduct} from "@/api/product";
import {selectCustomerAccount} from "../customer/currentCustomerSlice";
import {defaultCartItem, getMSRP, getPrices, getSalesUM} from "@/utils/products";
import {selectLoggedIn} from "../user/userProfileSlice";
import {isSellAsColors, isSellAsMix, updateCartProductPricing} from "./utils";
import {selectCustomerPricing} from "@/ducks/customer/customerPricingSlice";
import {
    loadProductCartProductHelper,
    loadProductCustomerPriceHelper,
    loadProductMSRPHelper,
    loadProductSalesUMHelper,
    loadProductVariantHelper,
    setColorCodeColorsHelper,
    setColorCodeMixHelper
} from "@/ducks/products/action-helpers.ts";

export interface LoadProductResponse {
    product: Product | null;
    variant: ProductVariant | null;
    msrp: string[],
    customerPrice: string[],
    salesUM: string | null;
    cartItem: CartProduct | null;
}

export const loadProduct = createAsyncThunk<LoadProductResponse | null, string, { state: RootState }>(
    'products/current/load',
    async (arg, {getState}) => {
        const product = await fetchProduct(arg);
        const state = getState();
        const loggedIn = selectLoggedIn(state);
        const pricing = selectCustomerPricing(state);
        const variant = loadProductVariantHelper(product)
        const msrp = loadProductMSRPHelper(variant, product);
        const customerPrice = loadProductCustomerPriceHelper(loggedIn, variant, product, pricing, msrp);
        const salesUM = loadProductSalesUMHelper(variant, product);
        const cartItem = loadProductCartProductHelper(variant, product);
        if (cartItem && customerPrice.length) {
            cartItem.price = customerPrice[0];
        }

        return {
            product,
            variant,
            msrp,
            customerPrice,
            salesUM,
            cartItem,
        };
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return !selectProductLoading(state);
        }
    }
)


export const setColorCode = createAsyncThunk<CartProduct | null, string, { state: RootState }>(
    'products/setColorCode',
    (arg, {getState}) => {
        const state = getState();
        const existingCartItem = selectProductCartItem(state);
        const selectedProduct = selectSelectedProduct(state);
        if (isSellAsColors(selectedProduct)) {
            return setColorCodeColorsHelper({
                arg,
                selectedProduct,
                existingCartItem,
                state
            })
        } else if (!!existingCartItem && isSellAsMix(selectedProduct)) {
            return setColorCodeMixHelper({arg, selectedProduct, existingCartItem, state})
        }
        return null;
    });


export interface SetVariantResponse {
    variant: ProductVariant | null;
    msrp: string[],
    customerPrice: string[],
    salesUM: string | null;
    cartItem: CartProduct | null;
    colorCode?: string;
}

export interface ProductVariantWithOptions extends ProductVariant {
    preferredItem?: string;
}

export const setCurrentVariant = createAsyncThunk<SetVariantResponse, ProductVariantWithOptions, { state: RootState }>(
    'products/setVariant',
    (arg, {getState}) => {
        const state = getState();
        const loggedIn = selectLoggedIn(state);
        const customerKey = selectProductCustomerKey(state);
        const priceCodes = selectCustomerPricing(state);
        const customerAccount = selectCustomerAccount(state);
        const msrp = getMSRP(arg.product);
        const customerPrice = loggedIn ? getPrices(arg.product, priceCodes) : [...msrp];
        const salesUM = getSalesUM(arg.product);
        const colorCode = selectProductColorCode(state);
        let cartItem = defaultCartItem(arg.product ?? null, {itemCode: arg.preferredItem, colorCode});
        if (customerKey) {
            cartItem = updateCartProductPricing(cartItem, priceCodes);
            if (cartItem) {
                cartItem.priceLevel = customerAccount?.PriceLevel ?? '';
            }
        }
        return {
            variant: arg,
            msrp,
            customerPrice,
            salesUM,
            cartItem
        }
    });


export const setCartItemQuantity = createAction<number>('product/cartItem/setQuantity');
