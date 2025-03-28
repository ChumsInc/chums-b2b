import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "@/app/configureStore";
import {isCartProduct, isProduct, isSellAsVariants} from "./utils";

export const selectCurrentProduct = (state: RootState) => state.products.product;
export const selectProductLoading = (state: RootState) => state.products.loading;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectProductColorCode = (state: RootState) => state.products.colorCode;
export const selectProductMSRP = (state: RootState) => state.products.msrp;
export const selectProductSalesUM = (state: RootState) => state.products.salesUM;
export const selectProductCustomerPrice = (state: RootState) => state.products.customerPrice;
export const selectProductVariantId = (state: RootState) => state.products.variantId;
export const selectProductCartItem = (state: RootState) => state.products.cartItem;
export const selectCustomerPricing = (state:RootState) => state.products.pricing;
export const selectProductCustomerKey = (state:RootState) => state.products.customerKey;
export const selectProductImage = (state:RootState) => state.products.image;

export const selectCurrentVariantProduct = createSelector(
    [selectCurrentProduct],
    (product) => {
        if (isSellAsVariants(product)) {
            return product;
        }
        return null;
    }
)
export const selectProductAltImages = createSelector(
    [selectCurrentProduct],
    (product) => {
        return [...(product?.images ?? [])].sort((a, b) => a.id - b.id)
    }
)


export const selectProductSeasonActive = createSelector(
    [selectProductCartItem],
    (cartItem):boolean => cartItem?.season?.active ?? cartItem?.seasonAvailable ?? false);

export const selectProductSeasonCode = createSelector(
    [selectSelectedProduct, selectProductCartItem],
    (product, cartItem):string|null => {
        return (isProduct(product) ? product.season_code : null)
            ?? (isCartProduct(cartItem) ? cartItem.seasonCode : null)
            ?? null;
    });
export const selectProductSeasonAvailable = createSelector(
    [selectSelectedProduct, selectProductCartItem],
    (product, cartItem):boolean|null => {
        return (isProduct(product) ? product?.season_available : null)
            ?? (isCartProduct(cartItem) ? cartItem.seasonAvailable : null)
            ?? null;
    }
)
export const selectProductSeasonDescription = createSelector(
    [selectSelectedProduct, selectProductCartItem],
    (product, cartItem):string|null => {
        return (isProduct(product) ? product?.season_description : null)
            ?? (isCartProduct(cartItem) ? cartItem.seasonDescription : null)
            ?? null;
    }
)
export const selectProductSeasonTeaser = createSelector(
    [selectSelectedProduct, selectProductCartItem],
    (product, cartItem):string|null => {
        return (isProduct(product) ? product.season_teaser : null)
            ?? (isCartProduct(cartItem) ? cartItem.seasonTeaser : null)
            ?? null;
    }
)
